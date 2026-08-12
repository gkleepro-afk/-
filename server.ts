import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

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

// API Endpoint: Generate Study Plan
app.post("/api/generate-plan", async (req, res) => {
  try {
    const { subject, gradeLevel, targetGoal, language = "zh", timeMinutesPerDay = 30 } = req.body;

    if (!subject || !gradeLevel) {
      return res.status(400).json({ error: "Missing required fields: subject and gradeLevel" });
    }

    const ai = getGeminiClient();

    const prompt = `你是一位顶尖的认知心理学与精准教学专家。请为学习者定制一份针对性极强、符合艾宾浩斯遗忘曲线与循序渐进原则的智能复习与学习计划。
【学习科目/内容】：${subject}
【学段/年级/水平】：${gradeLevel}
【复习目标/重点】：${targetGoal || "快速掌握核心知识点，建立完整知识网络并进行高频强化"}
【每日学习时长】：${timeMinutesPerDay}分钟
【目标语言】：${language}

请生成一套结构化的复习计划，必须严格符合 JSON 格式：
1. 包含 5-7 天的每日学习任务安排（ dailyTasks ）。
2. 包含 3-5 张核心知识卡片/词汇卡（ flashcards ），必须包含中文或目标语言的详细解析与例句。
3. 包含 2-3 道互动巩固测试题（ quizQuestions ），带有详细解析。
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
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

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
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

    // Try gemini-3.1-pro-preview or gemini-3.6-flash
    const modelName = "gemini-3.1-pro-preview";

    const response = await ai.models.generateContent({
      model: modelName,
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
    const { chapterTitle, subject, gradeLevel = "高中", publisher = "人教版" } = req.body;

    if (!chapterTitle) {
      return res.status(400).json({ error: "Chapter title is required" });
    }

    const ai = getGeminiClient();

    const prompt = `请为初高中学生编写一份高质量、启发式的《新课预习指南》（预习案）。
【预习章节/课题】：${chapterTitle}
【学科与年级】：${subject} (${gradeLevel})
【教材版本】：${publisher}

请输出严格的 JSON 格式：
1. 预习主题与导言（title, overview）。
2. 预习学习目标（learningObjectives）。
3. 课前衔接旧知温故（prerequisites）。
4. 核心概念与公式精讲（coreDefinitions: [{name, explanation, keyFormula}]）。
5. 预习任务自测小题（selfCheckQuiz: [{question, options, correctIndex, explanation}]）。
6. 课堂带疑提问建议（questionsToAskTeacher）。
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
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

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
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

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
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
