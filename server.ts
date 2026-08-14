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
const DEFAULT_GEMINI_MODELS = ["gemini-3.7-flash", "gemini-flash-latest"];

async function callGeminiWithRetry(ai: GoogleGenAI, options: GeminiCallOptions) {
  const models = options.models || DEFAULT_GEMINI_MODELS;
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

// Multi-lingual Tutor Persona Guideline generator based on Language_Mode
function getLanguageModeInstruction(languageMode: string = "Chinese"): string {
  const norm = String(languageMode).toLowerCase().trim();
  if (norm === "english" || norm === "en") {
    return `【多语言导师规范 - Language_Mode = English】:
- 纯净度要求：严格禁止输出任何中文汉字，禁止重复系统约束字眼（如 boundary），必须使用纯正地道的教学英语。
- 语言风格：像 TED Talk 演讲者或常春藤名校教授，语气专业、富于共情与鼓舞（professional & encouraging）。避免未解释的复杂黑话。如需重置思维流可自然运用 "Let's dive into the core concept"。
- 逻辑与排版：使用 Markdown 标题（# ## ###）层级，每个知识点控制在 3-5 句精炼短句，使用加粗 (**Text**) 突出关键词，使用列表 (- item) 梳理逻辑。
- No-Loop 规则：严禁机械重复系统指令。`;
  } else if (norm === "bilingual" || norm === "bi" || norm === "bilingual (双语)") {
    return `【多语言导师规范 - Language_Mode = Bilingual】:
- 核心模式：采用“英文为主，中文解释术语”的沉浸式双语模式。
- 关键术语与公式：保持主体叙述逻辑严密，核心概念、定理公式、考点难点标注精准的中文释义与英文对照。
- 语言风格：国际化名师启发式授课风格，排版使用 Markdown 标题、短句（3-5句）与加粗关键词。`;
  } else {
    return `【多语言导师规范 - Language_Mode = Chinese】:
- 纯净度要求：保持高质量中文输出，严禁无意义的中英夹杂（除 AI, DNA, RNA, pH, ATP 等国际公认通用缩写）。
- 文化语境：使用中国学生高度熟悉的生活与科技案例（如中国高铁平稳加速、西游记等）。
- 语言风格：像一位亲切、严谨、循循善诱的名师教授，表达符合中文优美语法与严密推导。
- 逻辑与排版：使用 Markdown 标题（# ## ###），知识点控制在 3-5 句短句，加粗 (**Text**) 关键词，列表 (- item) 梳理。`;
  }
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
      languageMode = "Chinese",
      timeMinutesPerDay = 30
    } = req.body;

    if (!subject || !gradeLevel) {
      return res.status(400).json({ error: "Missing required fields: subject and gradeLevel" });
    }

    const ai = getGeminiClient();
    const effectiveLangMode = languageMode || (language === "en" ? "English" : language === "bilingual" ? "Bilingual" : "Chinese");
    const langRule = getLanguageModeInstruction(effectiveLangMode);

    const prompt = `你是一位顶尖的认知心理学与精准教学专家导师。请为学习者定制一份针对性极强、精准符合其所在地区、学段及具体学期考纲要求的智能复习与学习计划。

${langRule}

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
    const { term, context = "", language = "zh", languageMode = "Chinese" } = req.body;
    if (!term) return res.status(400).json({ error: "Term is required" });

    const ai = getGeminiClient();
    const effectiveLangMode = languageMode || (language === "en" ? "English" : language === "bilingual" ? "Bilingual" : "Chinese");
    const langRule = getLanguageModeInstruction(effectiveLangMode);

    const prompt = `你是一位精通初高中学术教学的资深名师导师。请深度剖析并精讲概念/术语或句型：「${term}」。背景上下文：${context}。

${langRule}

请严格按照导师规范生成深度讲解与剖析内容，符合 JSON 格式。`;

    const response = await callGeminiWithRetry(ai, {
      contents: prompt,
      config: {
        systemInstruction: "你是一个擅长透彻讲解复杂概念的超级教师导师，严格遵循 Language_Mode 规范。",
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
    const { imageBase64, mimeType = "image/jpeg", userNotes = "", languageMode = "Chinese" } = req.body;

    if (!imageBase64) {
      return res.status(400).json({ error: "Missing imageBase64 data" });
    }

    const ai = getGeminiClient();
    const langRule = getLanguageModeInstruction(languageMode);

    // Clean base64 string if it contains data URL prefix
    const cleanBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, "");

    const promptText = `你是一位初高中（中考/高考）全科金牌特级教师导师。请仔细识别并解读书生上传的题目图片。
学生补充说明：${userNotes || "无"}

${langRule}

请分析图片中的题目并以严格的 JSON 格式输出：
1. 完整识别题干内容与公式（ocrText）。
2. 判断所属学科与适用年级/阶段（subject, grade, topic）。
3. 提供详尽的分步推导解答（stepByStepSolution），包含解题思路和步骤。
4. 列出核心解题公式与考点（keyPoints）。
5. 给出易错警示与避坑指南（commonMistakes）。
6. 提供一道举一反三的同类变式练习题（similarQuestion）。
`;

    const response = await callGeminiWithRetry(ai, {
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
        systemInstruction: "你是一个精通初高中全科解答的 AI 金牌特级名师导师，严格遵循 Language_Mode 语感规范。",
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

    const prompt = `请为学生编写一份高质量、启发式的《新课预习指南》（预习案）。同时提供精准的地道英文翻译（*En 字段），以便支持中英双语与全英文预习模式。
【考纲与教材精准度要求】：
1. 必须 100% 契合【${gradeLevel} · ${semester}】（教材体系：${countryRegion} · ${publisher}）的课程标准。
2. 严禁超纲或跨学期错配，知识点讲解必须符合该学期教学进度。

【预习章节/课题】：${chapterTitle}
【学科与年级】：${subject} (${gradeLevel} · ${semester})
【教材版本与地区】：${countryRegion} · ${publisher}

请输出严格的 JSON 格式：
1. 预习主题与导言（title, titleEn, overview, overviewEn）。
2. 预习学习目标（learningObjectives, learningObjectivesEn）。
3. 课前衔接旧知温故（prerequisites, prerequisitesEn）。
4. 核心概念与公式精讲（coreDefinitions: [{name, nameEn, explanation, explanationEn, keyFormula}]）。
5. 预习任务自测小题（selfCheckQuiz: [{question, questionEn, options, optionsEn, correctIndex, explanation, explanationEn}]）。
6. 课堂带疑提问建议（questionsToAskTeacher, questionsToAskTeacherEn）。
`;

    const response = await callGeminiWithRetry(ai, {
      contents: prompt,
      config: {
        systemInstruction: "你是一位擅长设计高效预习案的名师，注重启发式教学与概念直观透视，中英文对照精准地道。",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            titleEn: { type: Type.STRING },
            overview: { type: Type.STRING },
            overviewEn: { type: Type.STRING },
            estimatedTimeMinutes: { type: Type.INTEGER },
            learningObjectives: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            learningObjectivesEn: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            prerequisites: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            prerequisitesEn: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            coreDefinitions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  nameEn: { type: Type.STRING },
                  explanation: { type: Type.STRING },
                  explanationEn: { type: Type.STRING },
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
                  questionEn: { type: Type.STRING },
                  options: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                  },
                  optionsEn: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                  },
                  correctIndex: { type: Type.INTEGER },
                  explanation: { type: Type.STRING },
                  explanationEn: { type: Type.STRING },
                },
                required: ["question", "options", "correctIndex", "explanation"],
              },
            },
            questionsToAskTeacher: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            questionsToAskTeacherEn: {
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

    const prompt = `你是一个极其专业且具备共情能力的 AI 模拟讲堂导师。请为【${gradeLevel} · ${semester}】（地区/教材体系：${countryRegion} · ${educationSystem}）的学生精心编写一份逻辑严密、排版精美、互动性极强的模拟课堂讲课教案与课后练习《${subject} - ${topic}》。
同时为所有讲课环节、学习目标、核心结论、Checkpoint 互动检测题和课后练习提供纯正地道的英文表述（*En 字段），以便支持学生一键切换全中文 [Chinese]、全英文 [English] 或中英双语 [Bilingual] 模式。

【核心授课与多语言规范 (必须严格遵守)】：
1. 语言模式与风格：
   - 当 Language_Mode = Chinese（对应无 En 字段）：
     * 纯净度：严禁无意义的中英夹杂（公认专业缩写除外）。
     * 文化语境：使用中国学生高度熟悉的生活或科技案例（如“中国高铁”、“西游记”等）。
     * 语言风格：像一位亲切、严谨、启发式教学的中国名校特级教师。
   - 当 Language_Mode = English（对应所有 *En 后缀字段）：
     * 纯净度：严禁出现任何汉字。
     * 语言风格：像一位 TED Talk 演讲者或常春藤名校教授，语气专业、鼓励（encouraging）。避免晦涩黑话，可自然使用 "Let's dive into the core concept"。
     * 严禁机械重复系统指令字眼，禁止重复 'boundary'。
   - 当 Language_Mode = Bilingual：
     * 采用“英文为主，中文解释术语”的沉浸式模式。

2. 内容排版 (防止杂乱)：
   - 使用 Markdown 标题（# ## ###）区分层级。
   - 严禁长篇大论。每个知识点必须控制在 3-5 句短句内。
   - 使用加粗 (**Text**) 突出核心关键词与公式。
   - 使用列表 (- item) 梳理逻辑。

3. 授课节奏与互动 (强制 Checkpoint)：
   - 大纲分成 2~3 个精炼小节（lectureSections），每次只讲解一个核心知识点。
   - 每个小节讲解完后，必须强制包含一个 [checkpoint] 互动检测题（包含 question, options 4个选项, correctIndex, explanation），让学生在听完本小节后立即回答，检验掌握情况！

【考纲与知识范围绝对约束】：
1. 讲课内容与练习题必须 100% 严格符合【${gradeLevel} · ${semester}】的教学大纲。
2. 绝对不能出现跨年级或跨学期的超纲内容。

请输出 JSON 格式，结构必须包含：
- teacherName & teacherNameEn (名师姓名与头衔)
- lectureTitle & lectureTitleEn (课堂主题名称)
- objective & objectiveEn (本堂课总体学习目标)
- lectureSections: 数组，包含 2~3 个讲课小节，每个小节包含:
  * sectionTitle & sectionTitleEn (小节标题)
  * objective & objectiveEn (本小节目标: **Objective**: What you will learn)
  * content & contentEn (讲解内容，严格遵循 Markdown 排版、3-5句短句、加粗关键词、列表梳理)
  * keyTakeaway & keyTakeawayEn (核心结论/记忆口诀)
  * checkpoint: 互动小试检测题对象，包含:
    - question & questionEn (互动思考题)
    - options & optionsEn (4个选项 A/B/C/D 数组)
    - correctIndex (0-3)
    - explanation & explanationEn (即时解析)
    - type ('choice' | 'open')
- simplifiedExplanation & simplifiedExplanationEn (通俗生动的比喻解析)
- checkQuestionPrompt & checkQuestionPromptEn (导师关切提问语)
- homeworkQuiz: 2~3 道课后巩固自测题，每题包含:
  * question & questionEn
  * options & optionsEn (4个选项数组)
  * correctIndex (0-3)
  * explanation & explanationEn
  * questionType ('choice' | 'fill')
  * difficulty ('easy' | 'medium' | 'hard')`;

    let data: any = {};
    try {
      const response = await callGeminiWithRetry(ai, {
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              teacherName: { type: Type.STRING },
              teacherNameEn: { type: Type.STRING },
              lectureTitle: { type: Type.STRING },
              lectureTitleEn: { type: Type.STRING },
              objective: { type: Type.STRING },
              objectiveEn: { type: Type.STRING },
              lectureSections: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    sectionTitle: { type: Type.STRING },
                    sectionTitleEn: { type: Type.STRING },
                    objective: { type: Type.STRING },
                    objectiveEn: { type: Type.STRING },
                    content: { type: Type.STRING },
                    contentEn: { type: Type.STRING },
                    keyTakeaway: { type: Type.STRING },
                    keyTakeawayEn: { type: Type.STRING },
                    checkpoint: {
                      type: Type.OBJECT,
                      properties: {
                        question: { type: Type.STRING },
                        questionEn: { type: Type.STRING },
                        options: {
                          type: Type.ARRAY,
                          items: { type: Type.STRING },
                        },
                        optionsEn: {
                          type: Type.ARRAY,
                          items: { type: Type.STRING },
                        },
                        correctIndex: { type: Type.INTEGER },
                        explanation: { type: Type.STRING },
                        explanationEn: { type: Type.STRING },
                        type: { type: Type.STRING },
                      },
                      required: ["question", "options", "correctIndex", "explanation"],
                    },
                  },
                  required: ["sectionTitle", "content", "keyTakeaway", "checkpoint"],
                },
              },
              simplifiedExplanation: { type: Type.STRING },
              simplifiedExplanationEn: { type: Type.STRING },
              checkQuestionPrompt: { type: Type.STRING },
              checkQuestionPromptEn: { type: Type.STRING },
              homeworkQuiz: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    question: { type: Type.STRING },
                    questionEn: { type: Type.STRING },
                    options: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING },
                    },
                    optionsEn: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING },
                    },
                    correctIndex: { type: Type.INTEGER },
                    explanation: { type: Type.STRING },
                    explanationEn: { type: Type.STRING },
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
        teacherNameEn: "Prof. Zhang, Master Educator",
        lectureTitle: `${subject}核心精讲：《${topic}》`,
        lectureTitleEn: `Masterclass: 《${topic}》`,
        objective: `系统掌握《${topic}》的核心物理/数学规律与解题建模方法。`,
        objectiveEn: `Master fundamental principles and systematic problem-solving frameworks for 《${topic}》.`,
        lectureSections: [
          {
            sectionTitle: `第一节：${topic} 核心概念与本质推导`,
            sectionTitleEn: `Section 1: Fundamental Concepts & Core Deduction`,
            objective: `理清《${topic}》的基本定义与物理图像，掌握核心公式的推导过程。`,
            objectiveEn: `Understand the foundational definitions and deduce the core equations step by step.`,
            content: `### 核心概念引入\n同学们好！今天我们精讲【${gradeLevel} · ${semester}】的重点课题《${topic}》。\n\n- **核心定义**：建立准确的物理/数学模型，明确研究对象与系统状态。\n- **关键公式**：牢记基础方程的适用范围，注意矢量方向与单位规范。\n- **解题切入点**：画出清晰的草图，标出已知量与待求量。`,
            contentEn: `### Core Concept Breakdown\nWelcome students! Today we explore the essential principles of **《${topic}》**.\n\n- **Fundamental Definition**: Define the target physical system and isolate key variables.\n- **Governing Equations**: Establish precise relations between known parameters and targets.\n- **Problem Setup**: Sketch the setup clearly to track directional vector components.`,
            keyTakeaway: `受力与状态分析是解题第一步，公式应用必须核对前提条件！`,
            keyTakeawayEn: `System modeling is the primary step; verify all constraints before applying formulas!`,
            checkpoint: {
              question: `在研究《${topic}》相关的综合问题时，解题的第一步应该是什么？`,
              questionEn: `What is the crucial first step when solving problems in 《${topic}》?`,
              options: [
                `A. 直接套用公式盲目计算数字`,
                `B. 明确研究对象，分析状态并建立模型`,
                `C. 忽略题目给定的初始条件`,
                `D. 随意假定所有未知量的方向`
              ],
              optionsEn: [
                `A. Immediately plug in numbers without diagramming`,
                `B. Define the target object, analyze states, and build a model`,
                `C. Ignore given initial conditions`,
                `D. Arbitrarily assign directional signs`
              ],
              correctIndex: 1,
              explanation: `解题的关键第一步必须是明确研究对象并进行严谨的状态与受力分析。`,
              explanationEn: `Defining the system model and analyzing state transitions is the mandatory foundation.`,
              type: 'choice'
            }
          },
          {
            sectionTitle: `第二节：典型例题拆解与分步解题指南`,
            sectionTitleEn: `Section 2: Worked Examples & Systematic Problem Solving`,
            objective: `掌握标准三步解题法，攻克高频考点与易错陷阱。`,
            objectiveEn: `Master the standard 3-step solution framework and conquer common exam traps.`,
            content: `### 标准三步解题规范\n在解答《${topic}》的综合大题时，遵循以下高效解题步骤：\n\n- **第一步（审题建系）**：明确已知量、未知量，顺应主要运动/变化方向建立坐标系。\n- **第二步（列出方程）**：根据守恒定律或动力学方程逐一列出关系式。\n- **第三步（代入验算）**：联立求解，并代入极限状态或量纲进行自检。`,
            contentEn: `### 3-Step Problem-Solving Framework\nFollow this structured method to tackle complex problems:\n\n- **Step 1 (Coordinate Setup)**: Identify constraints and align axes with primary acceleration.\n- **Step 2 (Governing Equations)**: Formulate algebraic equations matching conservation laws.\n- **Step 3 (Dimensional Verification)**: Solve the system and verify units under extreme values.`,
            keyTakeaway: `画图审题明过程，列式求解注意标单位！`,
            keyTakeawayEn: `Visualize the process, formulate clean equations, and verify dimensional units!`,
            checkpoint: {
              question: `在列出方程后，为了确保计算结果的严谨性，最后一步应该做什么？`,
              questionEn: `After deriving algebraic solutions, what is the best practice for verification?`,
              options: [
                `A. 检查量纲、单位以及极限条件是否合理`,
                `B. 直接交卷，不再检查`,
                `C. 将单位随意更改`,
                `D. 抹去中间解题推导步骤`
              ],
              optionsEn: [
                `A. Verify dimensions, units, and examine extreme limits`,
                `B. Submit immediately without cross-checking`,
                `C. Alter units arbitrarily`,
                `D. Erase step-by-step mathematical reasoning`
              ],
              correctIndex: 0,
              explanation: `通过量纲分析和极限情况检验，可以快速排查计算和推导中的疏漏。`,
              explanationEn: `Checking dimensional consistency and boundary behavior catches algebraic errors efficiently.`,
              type: 'choice'
            }
          }
        ],
        simplifiedExplanation: `如果觉得概念抽象，可以想象成中国高铁平稳加速：把复杂的全程拆分成平稳起步、匀速巡航与平滑减速三个阶段，分段分析就能迎刃而解！`,
        simplifiedExplanationEn: `If the concept feels abstract, picture a modern high-speed train: break the continuous trip into discrete phases, and examine each segment systematically!`,
        checkQuestionPrompt: `同学们，上面关于《${topic}》的例题拆解与核心推导，你听懂了吗？`,
        checkQuestionPromptEn: `Students, did you clearly understand the derivations and problem-solving steps above?`,
        homeworkQuiz: [
          {
            question: `关于【${gradeLevel} ${subject}】中《${topic}》的考查要点，下列说法正确的是？`,
            questionEn: `Regarding the core principles of 《${topic}》, which of the following statements is correct?`,
            options: [
              `A. 解题时应首先确定研究对象与物理/数学过程`,
              `B. 可以不看前提条件直接套用任何导出公式`,
              `C. 任何矢量在列式时都不需要确定正方向`,
              `D. 答案计算完毕后无需检查量纲和单位`
            ],
            optionsEn: [
              `A. One must first define the target system and governing process`,
              `B. Derived formulas can be applied regardless of conditions`,
              `C. Vector equations do not require defining reference directions`,
              `D. Dimension and unit checks can be skipped after calculation`
            ],
            correctIndex: 0,
            explanation: `正确答案选 A。无论解答任何综合题，第一步都必须明确研究对象与具体过程，建立正确的解题逻辑。`,
            explanationEn: `Option A is correct. Defining the system and understanding the underlying physical process is the mandatory first step.`,
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
      languageMode = "Chinese",
    } = req.body;

    if (!studentQuestion.trim()) {
      return res.status(400).json({ error: "Question cannot be empty" });
    }

    const ai = getGeminiClient();
    const langRule = getLanguageModeInstruction(languageMode);

    const prompt = `你是一位教学经验丰富、循循善诱的多语言名师导师。学生正在学习【${gradeLevel} · ${semester}】课程《${lessonTopic}》，并在课堂上提出了以下疑问：
“${studentQuestion}”

${langRule}

请以名师口吻为该同学进行针对性解答，要求：
1. 严格遵循上述【多语言导师规范】的纯净度、文化语境与语言风格。
2. 语言亲切鼓励，肯定学生的深度思考与求知欲。
3. 切中疑问要害，使用透彻、生动的剖析或生活案例，字数 150-300 字。
4. 最后再用一句符合对应语言模式的自然问候语，询问学生是否理解。`;

    let teacherAnswer = "";
    try {
      const response = await callGeminiWithRetry(ai, {
        contents: prompt,
      });
      teacherAnswer = response.text || (languageMode === "English" ? "That is a brilliant question! Let us examine it systematically..." : "这是个非常好的问题！让我们重新拆解来看...");
    } catch (err: any) {
      console.warn("Ask teacher error, using fallback answer:", err);
      if (languageMode === "English") {
        teacherAnswer = `That is an excellent inquiry! In studying 《${lessonTopic}》, the key is understanding the fundamental governing equations and boundary conditions. Try substituting known parameters back into the derivation to verify. Does this clarify your question?`;
      } else if (languageMode === "Bilingual") {
        teacherAnswer = `这是一个很关键的疑点（Key Concept）！在【${gradeLevel}】学习《${lessonTopic}》时，核心是要弄清楚基本概念（Fundamental Definition）与适用条件（Boundary Conditions）。你可以尝试将已知量带入公式中重新梳理逻辑。这个解答你听懂了吗？`;
      } else {
        teacherAnswer = `这是一个很关键的疑点！在【${gradeLevel}】学习《${lessonTopic}》时，就像我们在高铁平稳加速中感受惯性一样，关键是要弄清楚基本概念与导出条件。你可以尝试将已知条件带入推导公式中再看一遍，有任何细节问题随时问老师！你听懂了吗？`;
      }
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
