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
