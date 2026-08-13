import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";
import { ExamPaperItem } from "./src/types";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "5mb" }));

// Initialize Gemini Client
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("GEMINI_API_KEY is missing. AI features will fallback to dummy structures if unavailable.");
  }
  return new GoogleGenAI({
    apiKey: apiKey || "dummy-key",
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
};

interface GeminiCallOptions {
  models?: string[];
  contents: any;
  config?: any;
  maxRetriesPerModel?: number;
}

// Resilient Gemini call wrapper with automatic retry and model fallbacks for 503/429/high demand errors
async function callGeminiWithRetry(ai: GoogleGenAI, options: GeminiCallOptions) {
  const models = options.models || ["gemini-2.5-flash", "gemini-3.6-flash", "gemini-2.5-pro"];
  const maxRetries = options.maxRetriesPerModel ?? 2;

  let lastError: any = null;

  for (const model of models) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const response = await ai.models.generateContent({
          model,
          contents: options.contents,
          config: options.config,
        });
        return response;
      } catch (err: any) {
        lastError = err;
        const errMsg = String(err?.message || err);
        console.warn(`[Gemini API] Model '${model}' attempt ${attempt} failed:`, errMsg);

        const isTransient =
          errMsg.includes("503") ||
          errMsg.includes("429") ||
          errMsg.includes("500") ||
          errMsg.includes("UNAVAILABLE") ||
          errMsg.includes("high demand") ||
          errMsg.includes("RESOURCE_EXHAUSTED") ||
          errMsg.includes("OVERLOADED");

        if (isTransient && attempt < maxRetries) {
          await new Promise((resolve) => setTimeout(resolve, attempt * 1000));
          continue;
        }
        break; // proceed to next model in fallback list
      }
    }
  }

  throw lastError || new Error("Gemini API request failed across all models and retries");
}

// API Endpoint: Generate Study Plan
app.post("/api/generate-plan", async (req, res) => {
  try {
    const {
      subject,
      gradeLevel,
      semester = "上学期",
      countryRegion = "中国大陆",
      educationSystem = "人教版",
      targetGoal,
      language = "zh",
      timeMinutesPerDay = 30
    } = req.body;

    if (!subject || !gradeLevel) {
      return res.status(400).json({ error: "Missing required fields: subject and gradeLevel" });
    }

    const ai = getGeminiClient();

    const prompt = `你是一位顶尖的认知心理学与精准教学专家。请为学习者定制一份针对性极强、精准符合其所在地区、学段及具体学期考纲要求的智能复习与学习计划。

【重要考纲与精准度约束】：
1. 必须 100% 匹配目标【年级：${gradeLevel}】与【学期：${semester}】。
2. 必须匹配【地区/教材体系：${countryRegion} · ${educationSystem}】的教学进度与必考要点。
3. 严禁出现跨学期超纲（如高一上学期绝对不可出现高一下或高二高三的知识）或严重低于该年级水平的题目。

【学习科目/内容】：${subject}
【复习目标/重点】：${targetGoal || "快速掌握当前学期核心知识点，建立完整知识网络并进行高频强化"}
【每日学习时长】：${timeMinutesPerDay}分钟
【目标语言】：${language}

请生成一套结构化的复习计划，必须严格符合 JSON 格式：
1. 包含 5-7 天的每日学习任务安排（ dailyTasks ）。
2. 包含 3-5 张核心知识卡片/词汇卡（ flashcards ），必须包含中文或目标语言的详细解析与例句。
3. 包含 2-3 道互动巩固测试题（ quizQuestions ），带有详细解析。
`;

    const response = await callGeminiWithRetry(ai, {
      models: ["gemini-2.5-flash", "gemini-3.6-flash", "gemini-2.5-pro"],
      contents: prompt,
      config: {
        systemInstruction: "你是一个专业的AI智能导师。请生成高质量、结构严密、符合学生实际水平的复习与学习计划。",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING, description: "计划标题，例如：高中物理：动量守恒精讲冲刺" },
            overview: { type: Type.STRING, description: "整体教学计划与复习建议概览" },
            estimatedDays: { type: Type.INTEGER, description: "预计复习总天数" },
            keyTopics: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "核心知识主题列表",
            },
            dailyTasks: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  dayOffset: { type: Type.INTEGER, description: "天数偏移（0表示今天，1表示明天）" },
                  title: { type: Type.STRING, description: "任务简短标题" },
                  description: { type: Type.STRING, description: "任务详细说明与操作指南" },
                  subject: { type: Type.STRING, description: "科目名称" },
                  category: {
                    type: Type.STRING,
                    description: "类别：language, science, math, coding, humanities, general",
                  },
                  durationMinutes: { type: Type.INTEGER, description: "预计所需分钟" },
                  taskType: {
                    type: Type.STRING,
                    description: "任务类型：concept, flashcard, practice, quiz, review",
                  },
                  difficulty: { type: Type.STRING, description: "难度：easy, medium, hard" },
                  keyPoints: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: "核心要点或公式清单",
                  },
                },
                required: ["dayOffset", "title", "description", "subject", "durationMinutes", "taskType", "difficulty", "keyPoints"],
              },
            },
            flashcards: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  front: { type: Type.STRING, description: "正面问题/术语/单词" },
                  phonetic: { type: Type.STRING, description: "音标/读音标注（如有）" },
                  back: { type: Type.STRING, description: "反面解释/翻译/定义" },
                  examples: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: "应用例句或例题",
                  },
                  language: { type: Type.STRING, description: "语言代码：en, zh, ja, es, fr, de, ko" },
                  tags: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: "知识标签",
                  },
                },
                required: ["front", "back", "language"],
              },
            },
            quizQuestions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  question: { type: Type.STRING, description: "题目内容" },
                  options: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: "4个选项列表",
                  },
                  correctIndex: { type: Type.INTEGER, description: "正确选项索引 (0-3)" },
                  explanation: { type: Type.STRING, description: "题目解析" },
                },
                required: ["question", "options", "correctIndex", "explanation"],
              },
            },
          },
          required: ["title", "overview", "estimatedDays", "keyTopics", "dailyTasks", "flashcards", "quizQuestions"],
        },
      },
    });

    const jsonText = response.text || "{}";
    const data = JSON.parse(jsonText);

    res.json({
      success: true,
      plan: {
        id: `plan-ai-${Date.now()}`,
        subject,
        gradeLevel,
        targetGoal: targetGoal || "全面精通与巩固",
        language,
        createdAt: new Date().toISOString(),
        ...data,
      },
    });
  } catch (error: any) {
    console.error("Error generating plan:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Failed to generate study plan",
    });
  }
});

// API Endpoint: Explain Concept / Deep Dive
app.post("/api/explain-concept", async (req, res) => {
  try {
    const { term, context = "", language = "zh" } = req.body;
    if (!term) return res.status(400).json({ error: "Term is required" });

    const ai = getGeminiClient();

    const prompt = `请深度剖析并精讲概念/术语或句型：「${term}」。背景上下文：${context}。请用最通俗易懂且极具说服力的方式讲解。`;

    const response = await callGeminiWithRetry(ai, {
      models: ["gemini-2.5-flash", "gemini-3.6-flash", "gemini-2.5-pro"],
      contents: prompt,
      config: {
        systemInstruction: "你是一个擅长透彻讲解复杂概念的超级教师。",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            term: { type: Type.STRING },
            category: { type: Type.STRING, description: "概念归属领域" },
            coreDefinition: { type: Type.STRING, description: "一句话核心定义" },
            detailedExplanation: { type: Type.STRING, description: "深入浅出的详细讲解" },
            keyTakeaways: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "核心记忆卡点或要点",
            },
            examples: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "经典实际应用例句或物理/数学模型",
            },
            commonPitfalls: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "学生常犯错误或易混淆点",
            },
          },
          required: ["term", "category", "coreDefinition", "detailedExplanation", "keyTakeaways", "examples"],
        },
      },
    });

    const data = JSON.parse(response.text || "{}");
    res.json({ success: true, explanation: data });
  } catch (error: any) {
    console.error("Error explaining concept:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// API Endpoint: Analyze Image Question (Photo Snap & Solve)
app.post("/api/analyze-image-question", async (req, res) => {
  try {
    const { imageBase64, mimeType = "image/jpeg", userNotes = "" } = req.body;

    if (!imageBase64) {
      return res.status(400).json({ error: "Missing imageBase64 data" });
    }

    const ai = getGeminiClient();

    // Clean base64 string if it contains data URL prefix
    const cleanBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, "");

    const promptText = `你是一位初高中（中考/高考）全科金牌特级教师。请仔细识别并解读书生上传的题目图片。
学生补充说明：${userNotes || "无"}

请分析图片中的题目并以严格的 JSON 格式输出：
1. 完整识别题干内容与公式（ocrText）。
2. 判断所属学科与适用年级/阶段（subject, grade, topic）。
3. 提供详尽的分步推导解答（stepByStepSolution），包含解题思路和步骤。
4. 列出核心解题公式与考点（keyPoints）。
5. 给出易错警示与避坑指南（commonMistakes）。
6. 提供一道举一反三的同类变式练习题（similarQuestion）。
`;

    const response = await callGeminiWithRetry(ai, {
      models: ["gemini-2.5-flash", "gemini-3.1-pro-preview", "gemini-3.6-flash"],
      contents: [
        {
          role: "user",
          parts: [
            { text: promptText },
            {
              inlineData: {
                mimeType,
                data: cleanBase64,
              },
            },
          ],
        },
      ],
      config: {
        systemInstruction: "你是一个精通初高中全科解答的 AI 金牌特级名师。",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            ocrText: { type: Type.STRING, description: "识别出的完整题目文字与符号" },
            subject: { type: Type.STRING, description: "学科，如：高中物理、初中数学、高中化学" },
            grade: { type: Type.STRING, description: "适用年级或考试类型（中考/高考/初二/高一等）" },
            topic: { type: Type.STRING, description: "核心考点，如：动量守恒定理、勾股定理" },
            difficulty: { type: Type.STRING, description: "难度等级：基础, 中等, 压轴" },
            keyPoints: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "用到的公式或定理",
            },
            stepByStepSolution: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "步骤一、步骤二...的分步推导过程",
            },
            commonMistakes: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "学生常犯错误陷阱提醒",
            },
            similarQuestion: {
              type: Type.OBJECT,
              properties: {
                question: { type: Type.STRING, description: "举一反三变式练习题干" },
                options: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: "选项列表（如有）",
                },
                correctAnswer: { type: Type.STRING, description: "正确答案" },
                explanation: { type: Type.STRING, description: "变式题简明解析" },
              },
              required: ["question", "correctAnswer", "explanation"],
            },
          },
          required: ["ocrText", "subject", "topic", "keyPoints", "stepByStepSolution", "commonMistakes"],
        },
      },
    });

    const data = JSON.parse(response.text || "{}");
    res.json({ success: true, analysis: data });
  } catch (error: any) {
    console.error("Error analyzing image question:", error);
    res.status(500).json({ success: false, error: error.message || "Failed to analyze question image" });
  }
});

// API Endpoint: Generate Course Preview (预习新课 Guide)
app.post("/api/generate-course-preview", async (req, res) => {
  try {
    const {
      chapterTitle,
      subject,
      gradeLevel = "高中",
      semester = "上学期",
      countryRegion = "中国大陆",
      publisher = "人教版"
    } = req.body;

    if (!chapterTitle) {
      return res.status(400).json({ error: "Chapter title is required" });
    }

    const ai = getGeminiClient();

    const prompt = `请为学生编写一份高质量、启发式的《新课预习指南》（预习案）。
【考纲与教材精准度要求】：
1. 必须 100% 契合【${gradeLevel} · ${semester}】（教材体系：${countryRegion} · ${publisher}）的课程标准。
2. 严禁超纲或跨学期错配，知识点讲解必须符合该学期教学进度。

【预习章节/课题】：${chapterTitle}
【学科与年级】：${subject} (${gradeLevel} · ${semester})
【教材版本与地区】：${countryRegion} · ${publisher}

请输出严格的 JSON 格式：
1. 预习主题与导言（title, overview）。
2. 预习学习目标（learningObjectives）。
3. 课前衔接旧知温故（prerequisites）。
4. 核心概念与公式精讲（coreDefinitions: [{name, explanation, keyFormula}]）。
5. 预习任务自测小题（selfCheckQuiz: [{question, options, correctIndex, explanation}]）。
6. 课堂带疑提问建议（questionsToAskTeacher）。
`;

    const response = await callGeminiWithRetry(ai, {
      models: ["gemini-2.5-flash", "gemini-3.6-flash", "gemini-2.5-pro"],
      contents: prompt,
      config: {
        systemInstruction: "你是一位擅长设计高效预习案的名师，注重启发式教学与概念直观透视。",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            overview: { type: Type.STRING },
            estimatedTimeMinutes: { type: Type.INTEGER },
            learningObjectives: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            prerequisites: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            coreDefinitions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  explanation: { type: Type.STRING },
                  keyFormula: { type: Type.STRING },
                },
                required: ["name", "explanation"],
              },
            },
            selfCheckQuiz: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  question: { type: Type.STRING },
                  options: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                  },
                  correctIndex: { type: Type.INTEGER },
                  explanation: { type: Type.STRING },
                },
                required: ["question", "options", "correctIndex", "explanation"],
              },
            },
            questionsToAskTeacher: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
          },
          required: ["title", "overview", "learningObjectives", "coreDefinitions", "selfCheckQuiz", "questionsToAskTeacher"],
        },
      },
    });

    const data = JSON.parse(response.text || "{}");
    res.json({ success: true, previewGuide: data });
  } catch (error: any) {
    console.error("Error generating course preview:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// API Endpoint: Generate Custom Question Sets for Question Bank
app.post("/api/generate-questions", async (req, res) => {
  try {
    const { subject, gradeLevel, topic, count = 3, difficulty = "中等" } = req.body;
    const ai = getGeminiClient();

    const prompt = `请为初高中学生（${gradeLevel}）生成 ${count} 道针对【${subject} - ${topic}】的高质量中考/高考类型训练题（难度：${difficulty}）。
请严格输出 JSON 格式，包含详细考点分析与解题步骤。`;

    const response = await callGeminiWithRetry(ai, {
      models: ["gemini-2.5-flash", "gemini-3.6-flash", "gemini-2.5-pro"],
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            questions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  question: { type: Type.STRING },
                  options: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                  },
                  correctIndex: { type: Type.INTEGER },
                  explanation: { type: Type.STRING },
                  questionType: { type: Type.STRING, description: "单选题 / 填空题 / 解答题" },
                  keyPoints: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                  },
                  difficulty: { type: Type.STRING },
                },
                required: ["question", "options", "correctIndex", "explanation"],
              },
            },
          },
          required: ["questions"],
        },
      },
    });

    const data = JSON.parse(response.text || "{}");
    res.json({ success: true, questions: data.questions || [] });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// API Endpoint: Quick Generate Flashcards
app.post("/api/generate-cards", async (req, res) => {
  try {
    const { subject, textContent, count = 4, language = "zh" } = req.body;
    const ai = getGeminiClient();

    const prompt = `根据以下学习材料，提炼并生成 ${count} 张高价值复习知识卡片：
【科目】：${subject}
【材料内容】：${textContent}
【语言】：${language}
`;

    const response = await callGeminiWithRetry(ai, {
      models: ["gemini-2.5-flash", "gemini-3.6-flash", "gemini-2.5-pro"],
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            cards: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  front: { type: Type.STRING, description: "卡片正面（问题/词汇）" },
                  back: { type: Type.STRING, description: "卡片反面（解答/释义）" },
                  phonetic: { type: Type.STRING, description: "音标/拼音/注音" },
                  examples: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                  },
                  tags: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                  },
                },
                required: ["front", "back"],
              },
            },
          },
          required: ["cards"],
        },
      },
    });

    const data = JSON.parse(response.text || "{}");
    res.json({ success: true, cards: data.cards || [] });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// API Endpoint: Generate Custom Exam Paper
app.post("/api/generate-exam-paper", async (req, res) => {
  try {
    const {
      subject = "物理",
      gradeLevel = "高三/高考",
      semester = "上学期",
      countryRegion = "中国大陆",
      educationSystem = "人教版",
      topic = "综合真题全真模拟",
      questionCount = 4
    } = req.body;
    const ai = getGeminiClient();

    const prompt = `请为【${gradeLevel} · ${semester}】（地区/教材体制：${countryRegion} · ${educationSystem}）的学生生成一份精选备考模拟/真题试卷《${subject} - ${topic}》。
【严格考纲与知识范围要求】：
1. 试卷题目必须 100% 契合【${gradeLevel} · ${semester}】的课程标准与教材范围。
2. 严禁超纲（如初一绝对不考初二初三的定理，高一上绝对不考高二高三电路或磁场）。
3. 包含 ${questionCount} 道题目（含单选题、填空题与大题/计算题），并提供分值、标准答案与深度解析。`;

    const response = await callGeminiWithRetry(ai, {
      models: ["gemini-2.5-flash", "gemini-3.6-flash", "gemini-2.5-pro"],
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING, description: "试卷标题，如：2026年高考物理全真模拟精选卷" },
            subject: { type: Type.STRING },
            durationMinutes: { type: Type.INTEGER, description: "考试时长（分钟）" },
            totalScore: { type: Type.INTEGER, description: "总分" },
            passingScore: { type: Type.INTEGER, description: "及格分" },
            description: { type: Type.STRING, description: "试卷说明与考察重点" },
            questions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  question: { type: Type.STRING, description: "题干" },
                  options: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: "选项（如果是选择题）",
                  },
                  correctIndex: { type: Type.INTEGER, description: "选择题正确选项索引" },
                  correctAnswerText: { type: Type.STRING, description: "填空题或大题标准答案" },
                  explanation: { type: Type.STRING, description: "题目完整推导与解析" },
                  questionType: { type: Type.STRING, description: "choice / fill / solution" },
                  difficulty: { type: Type.STRING, description: "easy / medium / hard" },
                  keyPoints: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                  },
                },
                required: ["question", "explanation", "questionType", "keyPoints"],
              },
            },
          },
          required: ["title", "durationMinutes", "totalScore", "passingScore", "description", "questions"],
        },
      },
    });

    const data = JSON.parse(response.text || "{}");
    const paper: ExamPaperItem = {
      id: `paper-gen-${Date.now()}`,
      title: data.title || `${gradeLevel} ${subject} 模拟考卷`,
      subject: subject,
      gradeLevel: gradeLevel,
      countryRegion: countryRegion,
      publisher: 'AI 智能精准组卷',
      durationMinutes: data.durationMinutes || 60,
      totalScore: data.totalScore || 100,
      passingScore: data.passingScore || 60,
      description: data.description || 'AI 根据当前学情与考点定制生成的全真真题模拟卷',
      questions: (data.questions || []).map((q: any, i: number) => ({
        id: `gen-q-${i}-${Date.now()}`,
        subject: subject,
        gradeStage: gradeLevel.includes('初') ? '初中' : '高中',
        gradeLevel: gradeLevel as any,
        topic: topic,
        question: q.question,
        options: q.options,
        correctIndex: q.correctIndex,
        correctAnswerText: q.correctAnswerText,
        explanation: q.explanation,
        questionType: q.questionType === 'choice' ? 'choice' : q.questionType === 'fill' ? 'fill' : 'choice',
        difficulty: q.difficulty || 'medium',
        keyPoints: q.keyPoints || [subject],
      })),
    };

    res.json({ success: true, paper });
  } catch (error: any) {
    console.error("Error generating exam paper:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// API Endpoint: Generate Interactive Classroom Lesson (模拟课堂讲课)
app.post("/api/generate-classroom-lesson", async (req, res) => {
  try {
    const {
      subject = "物理",
      topic = "牛顿第二定律综合应用",
      gradeLevel = "高一",
      semester = "上学期",
      countryRegion = "中国大陆",
      educationSystem = "人教版",
    } = req.body;

    const ai = getGeminiClient();

    const prompt = `你是一位教学经验丰富、幽默生动的特级名师。请为【${gradeLevel} · ${semester}】（地区/教材体系：${countryRegion} · ${educationSystem}）的学生编写一份沉浸式模拟课堂讲课教案与课后练习《${subject} - ${topic}》。

【考纲与知识范围绝对约束】：
1. 讲课内容与练习题必须 100% 严格符合【${gradeLevel} · ${semester}】的教学大纲与考试要求。
2. 绝对不能出现跨年级或跨学期的超纲内容（例如初一决不能考初二高中的知识，高一上学期绝对不涉及高二高三的选修内容）。
3. 讲课形式要像名师现场授课：有吸引人的引入、循序渐进的公式推导与例题拆解，语言风趣且极具说服力。

请输出 JSON 格式，结构如下：
- teacherName (教师姓名/称号，如 "智学名师 · 张老师")
- lectureTitle (课堂主题名称)
- lectureSections: 数组，包含 2~3 个讲课小节，每个小节包含:
  * sectionTitle (小节标题)
  * content (详细讲课内容，拟人化授课语言，拆解细致，300-500字)
  * keyTakeaway (本节核心结论/记忆口诀)
- simplifiedExplanation (通俗比喻与生活化解释，用于学生没听懂时的第二层通俗拆解)
- checkQuestionPrompt (导师询问语，如 "同学们，上面关于合外力与加速度的分解逻辑，你听懂了吗？")
- homeworkQuiz: 2~3 道课后巩固测试题，每题包含:
  * question (题目)
  * options (4个选项字符串数组)
  * correctIndex (0-3)
  * explanation (详细解答过程)
  * questionType ('choice' | 'fill')
  * difficulty ('easy' | 'medium' | 'hard')`;

    let data: any = {};
    try {
      const response = await callGeminiWithRetry(ai, {
        models: ["gemini-2.5-flash", "gemini-3.6-flash", "gemini-2.5-pro"],
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              teacherName: { type: Type.STRING },
              lectureTitle: { type: Type.STRING },
              lectureSections: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    sectionTitle: { type: Type.STRING },
                    content: { type: Type.STRING },
                    keyTakeaway: { type: Type.STRING },
                  },
                  required: ["sectionTitle", "content", "keyTakeaway"],
                },
              },
              simplifiedExplanation: { type: Type.STRING },
              checkQuestionPrompt: { type: Type.STRING },
              homeworkQuiz: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    question: { type: Type.STRING },
                    options: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING },
                    },
                    correctIndex: { type: Type.INTEGER },
                    explanation: { type: Type.STRING },
                    questionType: { type: Type.STRING },
                    difficulty: { type: Type.STRING },
                  },
                  required: ["question", "options", "correctIndex", "explanation"],
                },
              },
            },
            required: [
              "teacherName",
              "lectureTitle",
              "lectureSections",
              "simplifiedExplanation",
              "checkQuestionPrompt",
              "homeworkQuiz",
            ],
          },
        },
      });
      data = JSON.parse(response.text || "{}");
    } catch (err: any) {
      console.warn("Classroom generation error, using fallback lesson structure:", err);
      data = {
        teacherName: "智学名师 · 张老师",
        lectureTitle: `${subject}考点精讲：《${topic}》`,
        lectureSections: [
          {
            sectionTitle: `第一节：${topic} 核心概念与逻辑推导`,
            content: `同学们好！今天我们精讲【${gradeLevel} · ${semester}】重点内容《${topic}》。在考纲要求中，透彻理解其基本定义与适用条件是解题的关键。首先，要建立清晰的知识图谱，理清已知量与待求量之间的关系。`,
            keyTakeaway: `公式记忆要准确，注意物理量单位与适用前提条件。`,
          },
          {
            sectionTitle: `第二节：典型例题拆解与分步解题指南`,
            content: `解决《${topic}》相关综合题时，请遵循标准三步法：1. 审清题目已知条件与过程；2. 选用正确的公式建立方程；3. 准确计算并代入检验。特别注意边界条件与临界状态。`,
            keyTakeaway: `画图审题明过程，列式求解注意标单位！`,
          },
        ],
        simplifiedExplanation: `如果觉得概念抽象，可以想象成生活中的实际场景：把复杂的大目标拆分成两个小步骤，分步推进就能迎刃而解！`,
        checkQuestionPrompt: `同学们，上面关于《${topic}》的例题拆解与核心推导，你听懂了吗？`,
        homeworkQuiz: [
          {
            question: `关于【${gradeLevel} ${subject}】中《${topic}》的考查要点，下列说法正确的是？`,
            options: [
              `A. 解题时应首先确定研究对象与物理/数学过程`,
              `B. 可以不看前提条件直接套用任何导出公式`,
              `C. 任何矢量在列式时都不需要确定正方向`,
              `D. 答案计算完毕后无需检查量纲和单位`
            ],
            correctIndex: 0,
            explanation: `正确答案选 A。无论解答任何综合题，第一步都必须明确研究对象与具体过程，建立正确的解题逻辑。`,
            questionType: 'choice',
            difficulty: 'medium'
          }
        ]
      };
    }

    const lesson = {
      id: `lesson-ai-${Date.now()}`,
      subject,
      gradeLevel,
      semester,
      countryRegion,
      educationSystem,
      ...data,
    };

    res.json({ success: true, lesson });
  } catch (error: any) {
    console.error("Error generating classroom lesson:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// API Endpoint: Ask Teacher Interactive Question (课堂提问互动)
app.post("/api/ask-teacher", async (req, res) => {
  try {
    const {
      lessonTopic = "课程主题",
      studentQuestion = "",
      gradeLevel = "高一",
      semester = "上学期",
    } = req.body;

    if (!studentQuestion.trim()) {
      return res.status(400).json({ error: "Question cannot be empty" });
    }

    const ai = getGeminiClient();

    const prompt = `你是一位耐心、专业的名师。学生正在学习【${gradeLevel} · ${semester}】课程《${lessonTopic}》，并在课堂上提出了以下疑问：
“${studentQuestion}”

请以名师口吻为该同学进行针对性解答，要求：
1. 语言亲切鼓励，肯定学生的思考。
2. 切中疑问要害，使用简单易懂的语言或日常生活比喻，字数 150-300 字。
3. 最后再用一句简短的话询问学生是否理解。`;

    let teacherAnswer = "";
    try {
      const response = await callGeminiWithRetry(ai, {
        models: ["gemini-2.5-flash", "gemini-3.6-flash", "gemini-2.5-pro"],
        contents: prompt,
      });
      teacherAnswer = response.text || "这是个非常好的问题！让我们重新拆解来看...";
    } catch (err: any) {
      console.warn("Ask teacher error, using fallback answer:", err);
      teacherAnswer = `这是一个很关键的疑点！在【${gradeLevel}】学习《${lessonTopic}》时，关键是要弄清楚基本概念与导出条件。你可以尝试将已知条件带入推导公式中再看一遍，有任何细节问题随时问老师！你听懂了吗？`;
    }
    res.json({ success: true, teacherAnswer });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// API Endpoint: Generate Dynamic Daily Encouragement Quote
app.post("/api/generate-encouragement", async (req, res) => {
  try {
    const { userName = "同学", gradeLevel = "高三/高考", targetExam = "高考", tone = "passionate", streakDays = 4 } = req.body;
    const ai = getGeminiClient();

    const prompt = `请为【${gradeLevel}】正在备考【${targetExam}】的【${userName}】（当前已连续复习 ${streakDays} 天）创作一段贴心的每日备考鼓励与元气寄语。
鼓励风格为：${tone}（激情霸气 / 温柔陪伴 / 幽默风趣 / 严谨学术）。
请返回 JSON，包含：
1. quote (一句朗朗上口、触动人心的名言金句/备考语)
2. message (一段针对该年级与阶段的温情鼓励或行动建议)
3. badgeTitle (给该同学定制的成就或荣誉头衔，如“百折不挠提分狂人”)`;

    let encouragementData = null;
    try {
      const response = await callGeminiWithRetry(ai, {
        models: ["gemini-2.5-flash", "gemini-3.6-flash", "gemini-2.5-pro"],
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              quote: { type: Type.STRING },
              message: { type: Type.STRING },
              badgeTitle: { type: Type.STRING },
            },
            required: ["quote", "message", "badgeTitle"],
          },
        },
      });
      encouragementData = JSON.parse(response.text || "{}");
    } catch (err: any) {
      console.warn("Encouragement generation error, using fallback quote:", err);
      encouragementData = {
        quote: "星光不问赶路人，时光不负有心人！",
        message: `亲爱的【${userName}】，备考【${targetExam}】的路上，每一分汗水都在为你筑造登顶的阶梯。保持节奏，按部就班，你一定能考取心仪的目标！`,
        badgeTitle: "笃行致远 · 提分能手"
      };
    }

    res.json({ success: true, encouragement: encouragementData });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// API Endpoint: Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[智学星 App] Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
