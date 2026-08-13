export type UILanguage = 'zh' | 'en' | 'bilingual';

export const TRANSLATIONS = {
  // Navigation
  appName: {
    zh: '智学星 AI',
    en: 'Logos AI',
    bilingual: '智学星 AI · Logos AI',
  },
  appTagline: {
    zh: '智能学习与提分引擎',
    en: 'Intelligent Learning & Prep Engine',
    bilingual: '智能学习引擎 · AI Study Engine',
  },
  navRoadmap: {
    zh: '每日学习路线',
    en: 'Daily Roadmap',
    bilingual: '每日学习路线 / Daily Roadmap',
  },
  navGenerator: {
    zh: 'AI 制定学习计划',
    en: 'AI Study Plan Generator',
    bilingual: 'AI 制定计划 / AI Generator',
  },
  navFlashcards: {
    zh: '多语言卡片库',
    en: 'Language Deck',
    bilingual: '多语言卡片库 / Language Deck',
  },
  navQuiz: {
    zh: '智能巩固测试',
    en: 'Quiz & Diagnostics',
    bilingual: '智能巩固测试 / Quiz Diagnostics',
  },
  navQuestionBank: {
    zh: '初高中全科题库',
    en: 'Question Bank & Mistake Log',
    bilingual: '初高中全科题库 / Question Bank & Mistakes',
  },
  navPhotoSolve: {
    zh: 'AI 拍题/图片解题',
    en: 'Photo Snap & Solve',
    bilingual: 'AI 拍题图片解题 / Snap & Solve',
  },
  navCoursePreview: {
    zh: '预习新课指南',
    en: 'Course Pre-Learning',
    bilingual: '预习新课指南 / Course Pre-Learning',
  },
  navAnalytics: {
    zh: '记忆力与总览',
    en: 'Recall & Analytics',
    bilingual: '记忆力与总览 / Analytics',
  },
  navPomodoro: {
    zh: '番茄专注计时器',
    en: 'Pomodoro Timer',
    bilingual: '番茄专注计时器 / Pomodoro Timer',
  },
  navExamCenter: {
    zh: '试卷与真题中心',
    en: 'Exam & Test Papers',
    bilingual: '试卷与真题中心 / Exam Papers',
  },
  navUserProfile: {
    zh: '个人设置与学情',
    en: 'Profile & Goal Settings',
    bilingual: '个人设置与学情 / Profile Settings',
  },
  
  // Quick Actions & Headers
  streakDays: {
    zh: '连续复习',
    en: 'Streak',
    bilingual: '连续复习 / Streak',
  },
  completedTasks: {
    zh: '已完成任务',
    en: 'Tasks Done',
    bilingual: '已完成任务 / Tasks Done',
  },
  focusTime: {
    zh: '专注时长',
    en: 'Focus Time',
    bilingual: '专注时长 / Focus Time',
  },
  addTask: {
    zh: '添加任务',
    en: 'Add Task',
    bilingual: '添加任务 / Add Task',
  },
  generatePlanBtn: {
    zh: '生成 AI 计划',
    en: 'Generate AI Plan',
    bilingual: '生成 AI 计划 / Create Plan',
  },

  // Roadmap
  todayRoadmap: {
    zh: '今日 Roadmap',
    en: 'Today\'s Roadmap',
    bilingual: '今日路线 / Today\'s Roadmap',
  },
  remainingTasks: {
    zh: '项待复习',
    en: 'tasks remaining',
    bilingual: '项待复习 / tasks remaining',
  },
  progress: {
    zh: '完成度',
    en: 'Progress',
    bilingual: '完成度 / Progress',
  },
  weeklyTarget: {
    zh: '周目标',
    en: 'Weekly Target',
    bilingual: '周目标 / Weekly Target',
  },
  allSubjects: {
    zh: '全部科目',
    en: 'All Subjects',
    bilingual: '全部科目 / All Subjects',
  },
  scheduledTimeline: {
    zh: '今日复习时间线',
    en: 'Scheduled Timeline',
    bilingual: '今日时间线 / Scheduled Timeline',
  },
  memoryRetention: {
    zh: '记忆保留效率',
    en: 'Memory Retention',
    bilingual: '记忆保留率 / Memory Retention',
  },

  // Plan Generator
  planGeneratorTitle: {
    zh: 'AI 智能规划引擎',
    en: 'AI Schedule Engine',
    bilingual: 'AI 智能规划引擎 / AI Engine',
  },
  planGeneratorDesc: {
    zh: '只要输入您想学习的科目或具体内容，AI 即可为您定制排期。',
    en: 'Enter your subject, level, and goal to generate a personalized study plan.',
    bilingual: '输入科目与年级，AI 将定制专属复习路线 / Enter subject to create plan.',
  },
  subjectInputLabel: {
    zh: '学习内容 / 科目名称',
    en: 'Subject or Topic',
    bilingual: '学习内容与科目 / Subject or Topic',
  },
  subjectPlaceholder: {
    zh: '如：高中物理力学、雅思 7.0 词汇、Python 算法',
    en: 'e.g., Thermodynamics, IELTS Vocab, Calculus',
    bilingual: '如：高中物理、雅思词汇 / e.g. Physics, IELTS Vocab',
  },
  gradeLevelLabel: {
    zh: '学段 / 年级 / 水平',
    en: 'Grade Level / Level',
    bilingual: '学段与水平 / Grade Level',
  },
  dailyTimeLabel: {
    zh: '每日复习时长',
    en: 'Daily Study Time',
    bilingual: '每日复习时长 / Daily Time',
  },
  goalLabel: {
    zh: '具体复习目标与难点',
    en: 'Target Goal & Focus',
    bilingual: '具体复习目标 / Target Goal',
  },
  cardLangLabel: {
    zh: '知识卡片语言',
    en: 'Flashcard Language',
    bilingual: '卡片语言 / Card Language',
  },
  createPlanBtn: {
    zh: '生成精准复习计划',
    en: 'Create AI Schedule',
    bilingual: '生成精准复习计划 / Create AI Schedule',
  },

  // Flashcards
  deckTitle: {
    zh: '多语言卡片库',
    en: 'Language Deck',
    bilingual: '多语言卡片库 / Language Deck',
  },
  cardFront: {
    zh: '卡片正面 (问题/词汇)',
    en: 'Card Front (Term/Question)',
    bilingual: '卡片正面 / Card Front',
  },
  cardBack: {
    zh: '卡片反面 (详细解析 & 答案)',
    en: 'Card Back (Answer & Notes)',
    bilingual: '卡片反面 / Card Back',
  },
  readAloud: {
    zh: '朗读标准发音',
    en: 'Read Aloud',
    bilingual: '朗读发音 / Read Aloud',
  },
  aiGenerateCards: {
    zh: 'AI 材料一键成卡',
    en: 'Auto AI Cards',
    bilingual: 'AI 材料成卡 / Auto AI Cards',
  },
  newCardBtn: {
    zh: '新建知识卡',
    en: 'New Flashcard',
    bilingual: '新建知识卡 / New Flashcard',
  },
  recallRatingAgain: {
    zh: '完全不记得',
    en: 'Again',
    bilingual: '完全不记得 / Again',
  },
  recallRatingHard: {
    zh: '较费力回忆',
    en: 'Hard',
    bilingual: '较费力回忆 / Hard',
  },
  recallRatingGood: {
    zh: '能熟练想出',
    en: 'Good',
    bilingual: '能熟练想出 / Good',
  },
  recallRatingEasy: {
    zh: '完美掌握',
    en: 'Easy',
    bilingual: '完美掌握 / Easy',
  },

  // Quiz
  quizTitle: {
    zh: '智能巩固测试',
    en: 'Quiz & Diagnostics',
    bilingual: '智能巩固测试 / Quiz Diagnostics',
  },
  quizzesTitle: {
    zh: '智能巩固测试',
    en: 'Quiz & Diagnostics',
    bilingual: '智能巩固测试 / Quiz Diagnostics',
  },
  quizzesDesc: {
    zh: '诊断薄弱环节，定向巩固考点',
    en: 'Diagnose weak areas and reinforce key concepts',
    bilingual: '诊断薄弱考点 / Diagnose weak areas',
  },
  scoreAccuracy: {
    zh: '准确率得分',
    en: 'Score Accuracy',
    bilingual: '准确率得分 / Score Accuracy',
  },
  deepExplain: {
    zh: 'AI 深度精讲',
    en: 'AI Deep Dive',
    bilingual: 'AI 深度精讲 / AI Deep Dive',
  },
  nextQuestion: {
    zh: '下一题',
    en: 'Next Question',
    bilingual: '下一题 / Next Question',
  },
  viewResults: {
    zh: '查看结果',
    en: 'View Results',
    bilingual: '查看结果 / View Results',
  },
  restartQuiz: {
    zh: '重新测试',
    en: 'Restart Quiz',
    bilingual: '重新测试 / Restart Quiz',
  },

  // Flashcards
  flashcardsTitle: {
    zh: '多语言卡片库',
    en: 'Language Deck',
    bilingual: '多语言卡片库 / Language Deck',
  },
  flashcardsDesc: {
    zh: '艾宾浩斯记忆法，复习高效不遗忘',
    en: 'Spaced repetition flashcards for smart retention',
    bilingual: '艾宾浩斯卡片复习 / Spaced Repetition',
  },
  aiGenerateCardBtn: {
    zh: 'AI 材料一键成卡',
    en: 'Auto AI Cards',
    bilingual: 'AI 材料成卡 / Auto AI Cards',
  },
  flipToSeeBack: {
    zh: '点击翻转卡片',
    en: 'Click to Flip',
    bilingual: '点击翻转卡片 / Click to Flip',
  },
  recallLevelLabel: {
    zh: '记忆难度评级',
    en: 'Recall Rating',
    bilingual: '记忆难度评级 / Recall Rating',
  },
  recallAgain: {
    zh: '不记得',
    en: 'Again',
    bilingual: '不记得 / Again',
  },
  recallHard: {
    zh: '费力',
    en: 'Hard',
    bilingual: '费力 / Hard',
  },
  recallGood: {
    zh: '熟练',
    en: 'Good',
    bilingual: '熟练 / Good',
  },
  recallEasy: {
    zh: '简单',
    en: 'Easy',
    bilingual: '简单 / Easy',
  },

  // Analytics
  analyticsTitle: {
    zh: '记忆力与学习总览',
    en: 'Recall & Learning Analytics',
    bilingual: '记忆力与总览 / Recall Analytics',
  },
  analyticsDesc: {
    zh: '追踪认知留存率与学科掌握度',
    en: 'Track memory retention and subject performance',
    bilingual: '记忆留存与学科进度 / Memory & Progress',
  },
  subjectMastery: {
    zh: '各学科掌握度',
    en: 'Subject Mastery',
    bilingual: '各学科掌握度 / Subject Mastery',
  },
  cognitiveInsights: {
    zh: '认知科学洞察',
    en: 'Cognitive Insights',
    bilingual: '认知科学洞察 / Cognitive Insights',
  },

  // Language Switcher Label
  languageSwitchLabel: {
    zh: '界面语言',
    en: 'UI Language',
    bilingual: '界面语言 / UI Language',
  }
};
