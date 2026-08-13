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
  },

  // User Profile Modal
  profileModalTitle: {
    zh: '学情偏好与个性化设置',
    en: 'Profile & Learning Preferences',
    bilingual: '学情偏好与个性化设置 / Profile Settings',
  },
  profileModalDesc: {
    zh: '定制您的年级、考纲与鼓励风格，AI 题目推荐与预习案将随之智能适配',
    en: 'Customize your grade level, syllabus, and AI encouragement tone. Content adaptively aligns.',
    bilingual: '定制年级、考纲与偏好，AI 智适应适配 / Adapt grade, syllabus & AI settings.',
  },
  avatarHeader: {
    zh: '个人形象与称呼设置',
    en: 'Profile Avatar & Nickname',
    bilingual: '个人形象与称呼 / Avatar & Nickname',
  },
  chooseAvatarLabel: {
    zh: '选择专属学习头像 / 图标',
    en: 'Choose Learning Avatar / Icon',
    bilingual: '选择学习头像 / Choose Avatar',
  },
  userNameLabel: {
    zh: '您的学习称呼 / 昵称',
    en: 'Your Nickname / Name',
    bilingual: '您的称呼 / Your Name',
  },
  gradeHeader: {
    zh: '年级与考纲绑定',
    en: 'Grade & Exam Syllabus',
    bilingual: '年级与考纲 / Grade & Exam Syllabus',
  },
  gradeSelectLabel: {
    zh: '当前在读年级 / 阶段',
    en: 'Current Grade Level',
    bilingual: '当前年级 / Grade Level',
  },
  semesterSelectLabel: {
    zh: '学期阶段',
    en: 'Semester',
    bilingual: '学期阶段 / Semester',
  },
  countrySelectLabel: {
    zh: '所在国家 / 地区',
    en: 'Country / Region',
    bilingual: '国家地区 / Country Region',
  },
  eduSystemLabel: {
    zh: '教材版本 / 课程体系',
    en: 'Textbook / Curriculum System',
    bilingual: '教材版本 / Curriculum',
  },
  targetExamLabel: {
    zh: '冲刺目标 / 近期重大考试',
    en: 'Target Goal / Upcoming Exam',
    bilingual: '冲刺目标 / Target Goal',
  },
  goalHeader: {
    zh: '每日目标与激励偏好',
    en: 'Daily Target & Motivation Style',
    bilingual: '每日目标与激励偏好 / Motivation Style',
  },
  dailyGoalLabel: {
    zh: '每日学习目标时长',
    en: 'Daily Target Study Time',
    bilingual: '每日目标时长 / Daily Target',
  },
  encouragementToneLabel: {
    zh: 'AI 每日灵感鼓励风格',
    en: 'AI Encouragement Tone',
    bilingual: 'AI 鼓励风格 / AI Motivation Tone',
  },
  customMottoLabel: {
    zh: '座右铭 / 专属誓言',
    en: 'Personal Motto / Quote',
    bilingual: '座右铭誓言 / Personal Motto',
  },
  saveProfileBtn: {
    zh: '保存并应用学情设置',
    en: 'Save Settings',
    bilingual: '保存并应用学情设置 / Save Settings',
  },

  // Encouragement Banner
  refreshQuoteBtn: {
    zh: '换一句灵感',
    en: 'New Inspiration',
    bilingual: '换一句灵感 / New Quote',
  },
  adjustProfileBtn: {
    zh: '调整偏好/年级',
    en: 'Grade & Settings',
    bilingual: '调整年级与偏好 / Grade & Settings',
  },
  checkinDays: {
    zh: '打卡',
    en: 'Streak',
    bilingual: '打卡 / Streak',
  },

  // Classroom View
  classroomTitle: {
    zh: 'AI 模拟课堂名师讲堂',
    en: 'AI Master Classroom & Lectures',
    bilingual: 'AI 模拟课堂名师讲堂 / Master Classroom',
  },
  classroomSubtitle: {
    zh: '模拟名师原声授课：先细致听讲 ➔ 导师主动问询听懂情况 ➔ 课后针对性试题巩固',
    en: 'Simulated Master Teacher TTS lectures: Listen attentively ➔ Teacher checks comprehension ➔ Practice exercises',
    bilingual: '名师原声授课 ➔ 听懂问询 ➔ 课后针对巩固 / Simulated TTS & Practice',
  },
  customClassroomBtn: {
    zh: 'AI 定制年级专属讲堂',
    en: 'AI Custom Grade Lecture',
    bilingual: 'AI 定制年级专属讲堂 / Custom Lecture',
  },
  gradeLockBanner: {
    zh: '考纲与学情精准对齐',
    en: 'Syllabus & Grade Precision Alignment',
    bilingual: '考纲与学情精准对齐 / Syllabus Alignment',
  },
  gradeLockDesc: {
    zh: '已启用全系统年级锁：绝对不推荐跨年级超纲或无关年级的学习内容。',
    en: 'System-wide grade lock active: Strictly preventing off-grade or out-of-syllabus content.',
    bilingual: '已启用全系统年级锁，拒绝超纲推荐 / Grade lock active.',
  },
  adjustGradeBtn: {
    zh: '调整我的学情档案',
    en: 'Adjust Profile & Grade',
    bilingual: '调整学情档案 / Adjust Grade',
  },
  lessonListTitle: {
    zh: '名师讲堂课程列表',
    en: 'Master Lectures List',
    bilingual: '名师讲堂课程列表 / Master Lectures',
  },
  playFullLecture: {
    zh: '播放完整讲堂',
    en: 'Play Full Lecture',
    bilingual: '播放完整讲堂 / Play Full Lecture',
  },
  pauseLecture: {
    zh: '暂停',
    en: 'Pause',
    bilingual: '暂停 / Pause',
  },
  resumeLecture: {
    zh: '继续',
    en: 'Resume',
    bilingual: '继续 / Resume',
  },
  stopLecture: {
    zh: '停止',
    en: 'Stop',
    bilingual: '停止 / Stop',
  },
  teacherInteractiveCheck: {
    zh: '名师听懂情况问询',
    en: 'Teacher Interactive Comprehension Check',
    bilingual: '名师听懂情况问询 / Comprehension Check',
  },
  understoodOption: {
    zh: '已完全听懂并掌握核心',
    en: 'Fully Understood Core Concepts',
    bilingual: '已完全听懂并掌握 / Fully Understood',
  },
  needsSimplificationOption: {
    zh: '听懂了大半，希望更直白讲解',
    en: 'Understood Mostly, Need Simpler Analogy',
    bilingual: '听懂大半，希望更直白 / Need Simpler Explanation',
  },
  askQuestionOption: {
    zh: '向老师提问特定疑惑',
    en: 'Ask Teacher a Specific Question',
    bilingual: '向老师提问特定疑惑 / Ask Teacher',
  },
  askTeacherPlaceholder: {
    zh: '在这里输入您对本讲堂的疑问...',
    en: 'Type your question about this lecture here...',
    bilingual: '输入您对本讲堂的疑问 / Type your question...',
  },
  sendQuestionBtn: {
    zh: '发送给 AI 名师',
    en: 'Ask Master Teacher',
    bilingual: '发送给 AI 名师 / Ask Teacher',
  },
  homeworkSectionTitle: {
    zh: '课后巩固精选习题',
    en: 'Post-Lecture Practice Questions',
    bilingual: '课后巩固精选习题 / Post-Lecture Exercises',
  },
  submitHomeworkBtn: {
    zh: '提交课后巩固答案',
    en: 'Submit Answers & Check Solution',
    bilingual: '提交课后巩固答案 / Submit Answers',
  },
  saveToMistakes: {
    zh: '移入错题本',
    en: 'Save to Mistake Log',
    bilingual: '移入错题本 / Save to Mistakes',
  },
  inMistakes: {
    zh: '已在错题本',
    en: 'In Mistake Log',
    bilingual: '已在错题本 / In Mistakes',
  },

  // Question Bank View
  qbTitle: {
    zh: '初高中全科题库与错题本',
    en: 'Question Bank & Mistake Log',
    bilingual: '初高中全科题库与错题本 / Question Bank & Mistakes',
  },
  qbSubtitle: {
    zh: '支持按学段、年级、学科、题型与难度精准检索，错题智能收录与 AI 变式组题',
    en: 'Filter by stage, grade, subject, type & difficulty. Smart mistake logging & AI variant generation.',
    bilingual: '精准检索、错题智能收录与 AI 变式组题 / Filter, mistake log & AI variants',
  },
  aiGenVariantBtn: {
    zh: 'AI 智能生成变式考题',
    en: 'AI Generate Variant Questions',
    bilingual: 'AI 智能生成变式考题 / AI Variant Generator',
  },
  allQuestionBankTab: {
    zh: '全部题库',
    en: 'All Question Bank',
    bilingual: '全部题库 / All Questions',
  },
  mistakesTab: {
    zh: '错题本',
    en: 'Mistake Log',
    bilingual: '错题本 / Mistake Log',
  },
  searchPlaceholder: {
    zh: '搜索题目、考点知识点或逻辑关键词...',
    en: 'Search questions, key concepts, or logic keywords...',
    bilingual: '搜索题目、考点或关键词 / Search questions & topics...',
  },
  stageFilter: {
    zh: '学段',
    en: 'Stage',
    bilingual: '学段 / Stage',
  },
  gradeFilter: {
    zh: '年级',
    en: 'Grade',
    bilingual: '年级 / Grade',
  },
  semesterFilter: {
    zh: '学期进度',
    en: 'Semester',
    bilingual: '学期进度 / Semester',
  },
  subjectFilter: {
    zh: '学科',
    en: 'Subject',
    bilingual: '学科 / Subject',
  },
  typeFilter: {
    zh: '题型',
    en: 'Type',
    bilingual: '题型 / Question Type',
  },
  difficultyFilter: {
    zh: '难度等级',
    en: 'Difficulty Level',
    bilingual: '难度等级 / Difficulty',
  },
  allOption: {
    zh: '全部',
    en: 'All',
    bilingual: '全部 / All',
  },
  choiceType: {
    zh: '单项选择题',
    en: 'Multiple Choice',
    bilingual: '单项选择题 / Multiple Choice',
  },
  fillType: {
    zh: '填空题',
    en: 'Fill-in-the-blank',
    bilingual: '填空题 / Fill-in-the-blank',
  },
  solutionType: {
    zh: '解答/计算推导题',
    en: 'Free Response / Derivation',
    bilingual: '解答/计算推导题 / Free Response',
  },
  noQuestionsFound: {
    zh: '暂无符合筛选条件的题目',
    en: 'No Matching Questions Found',
    bilingual: '暂无符合筛选条件的题目 / No Questions Found',
  },
  noQuestionsDesc: {
    zh: '请尝试切换或清除筛选条件，或使用上方“AI 智能生成变式考题”。',
    en: 'Try adjusting filters or click "AI Generate Variant Questions" above.',
    bilingual: '请尝试调整筛选条件或使用 AI 智能组题 / Adjust filters or generate questions.',
  },
  viewSolutionBtn: {
    zh: '查看 AI 名师解析与变式',
    en: 'View Solution & Analysis',
    bilingual: '查看 AI 解析与变式 / View Solution',
  },
  hideSolutionBtn: {
    zh: '收起解析',
    en: 'Hide Solution',
    bilingual: '收起解析 / Hide Solution',
  },

  // Photo Solve View
  photoSolveTitle: {
    zh: 'AI 拍题 / 图片精准解题',
    en: 'Photo Snap & AI Problem Solver',
    bilingual: 'AI 拍题/图片精准解题 / Snap & Solve',
  },
  photoSolveSubtitle: {
    zh: '上传或拍摄初高中（中考/高考）数学、物理、化学等题目，AI 名师为您分步极速推导与避坑分析。',
    en: 'Snap or upload Math, Physics, Chemistry questions. AI provides step-by-step solutions & trap alerts.',
    bilingual: '拍摄或上传题目，AI 分步极速推导与避坑分析 / Snap questions for step-by-step solutions',
  },
  openCameraBtn: {
    zh: '调取摄像头',
    en: 'Open Camera',
    bilingual: '调取摄像头 / Open Camera',
  },
  uploadImageBtn: {
    zh: '上传题目图片',
    en: 'Upload Image',
    bilingual: '上传题目图片 / Upload Image',
  },
  dragOrClickToUpload: {
    zh: '拖拽题目图片到此处，或点击上传',
    en: 'Drag & drop question image here, or click to upload',
    bilingual: '拖拽题目图片到此处，或点击上传 / Drag image or click to upload',
  },
  imageFormatHint: {
    zh: '支持 PNG, JPG, WEBP 格式（手写题、试卷照片均可）',
    en: 'Supports PNG, JPG, WEBP formats (handwritten or test papers)',
    bilingual: '支持 PNG, JPG, WEBP 格式 / Supports PNG, JPG, WEBP',
  },
  cameraTitle: {
    zh: '请对准题目文字与公式，保持照片清晰',
    en: 'Align camera with question text & equations clearly',
    bilingual: '请对准题目文字与公式，保持清晰 / Align camera with question text clearly',
  },
  captureBtn: {
    zh: '立即拍照捕获',
    en: 'Capture Photo',
    bilingual: '立即拍照捕获 / Capture Photo',
  },
  cancelBtn: {
    zh: '取消',
    en: 'Cancel',
    bilingual: '取消 / Cancel',
  },
  userNotesLabel: {
    zh: '补充疑问/解题要点 (可选)',
    en: 'Additional Notes / Specific Requirement (Optional)',
    bilingual: '补充疑问/解题要点 (可选) / Additional Notes',
  },
  userNotesPlaceholder: {
    zh: '在此填写您具体不理解的地方，或者特别指定的解题要求...',
    en: 'Describe what you specifically do not understand or special requirements...',
    bilingual: '在此填写不理解的地方或解题要求 / Describe specific requirements...',
  },
  solveQuestionBtn: {
    zh: '🤖 AI 名师极速解题与考点剖析',
    en: '🤖 AI Step-by-Step Solution & Analysis',
    bilingual: '🤖 AI 名师极速解题与考点剖析 / AI Step-by-Step Solution',
  },
  solvingProgress: {
    zh: 'AI 正在识别题目与分步推导中...',
    en: 'AI is recognizing question & deriving step-by-step...',
    bilingual: 'AI 正在识别题目与分步推导中 / AI is analyzing question...',
  },
  quickSampleTitle: {
    zh: '或点击体验典型初高中考题样例',
    en: 'Or click a sample question to test instantly',
    bilingual: '点击体验典型初高中考题样例 / Or try a sample question',
  },
  waitingUploadTitle: {
    zh: '等待上传与 AI 题目深度诊断',
    en: 'Awaiting Upload for AI Deep Diagnostics',
    bilingual: '等待上传与 AI 题目深度诊断 / Awaiting Upload',
  },
  waitingUploadDesc: {
    zh: '智学星 Gemini AI 专门针对初中与高中（中考/高考）课程优化，不仅识别公式与文字，更提供完整的解题思路、误区提醒及变式练习。',
    en: 'Optimized for Middle & High School curricula. Recognizes math formulas and provides full solution steps, trap alerts, and variants.',
    bilingual: '专门针对初高中考纲优化，提供完整解题思路与误区提醒 / Optimized for school curricula with step-by-step analysis.',
  },
  ocrResultHeader: {
    zh: '题目 OCR 识别提取',
    en: 'OCR Question Text',
    bilingual: '题目 OCR 识别提取 / OCR Question Text',
  },
  copyTextBtn: {
    zh: '复制文字',
    en: 'Copy Text',
    bilingual: '复制文字 / Copy Text',
  },
  copiedText: {
    zh: '已复制！',
    en: 'Copied!',
    bilingual: '已复制！ / Copied!',
  },
  stepByStepTitle: {
    zh: 'AI 名师分步解题推导',
    en: 'Step-by-Step AI Solution',
    bilingual: 'AI 名师分步解题推导 / Step-by-Step Solution',
  },
  keyPointsTitle: {
    zh: '核心涉及考点与公式',
    en: 'Core Concepts & Formulae',
    bilingual: '核心涉及考点与公式 / Core Concepts',
  },
  trapsTitle: {
    zh: '易错盲区与陷阱提示',
    en: 'Common Traps & Pitfall Alerts',
    bilingual: '易错盲区与陷阱提示 / Common Traps & Pitfalls',
  },
  variantTitle: {
    zh: 'AI 变式类比习题',
    en: 'AI Variant Practice Question',
    bilingual: 'AI 变式类比习题 / AI Variant Practice',
  },
  waitUploadHint: {
    zh: '等待上传与 AI 题目深度诊断',
    en: 'Awaiting Upload for AI Deep Diagnostics',
    bilingual: '等待上传与 AI 题目深度诊断 / Awaiting Upload',
  },
  savedToMistakeLog: {
    zh: '已加入错题本',
    en: 'Saved to Mistake Book',
    bilingual: '已加入错题本 / Saved to Mistake Book',
  },
  addToMistakeLog: {
    zh: '一键存入错题本',
    en: 'Add to Mistake Book',
    bilingual: '一键存入错题本 / Add to Mistake Book',
  },
  ocrTextHeader: {
    zh: '识别题目文本 (OCR)',
    en: 'Recognized Question Text (OCR)',
    bilingual: '识别题目文本 (OCR) / Recognized Question Text',
  },
  copyOcrBtn: {
    zh: '复制题目',
    en: 'Copy Question',
    bilingual: '复制题目 / Copy Question',
  },
  keyFormulasHeader: {
    zh: '核心解题公式与定理',
    en: 'Key Formulas & Theorems',
    bilingual: '核心解题公式与定理 / Key Formulas',
  },
  stepByStepHeader: {
    zh: '金牌特级名师分步推导',
    en: 'Step-by-Step Expert Solution',
    bilingual: '金牌特级名师分步推导 / Step-by-Step Solution',
  },
  commonMistakesHeader: {
    zh: '易错避坑警示 (高考/中考采分点)',
    en: 'Common Traps & Scoring Pitfalls',
    bilingual: '易错避坑警示 / Common Traps & Pitfalls',
  },
  similarQuestionHeader: {
    zh: '举一反三 · 同类变式强化练习',
    en: 'Variant Reinforcement Question',
    bilingual: '举一反三·同类变式练习 / Variant Practice',
  },

  // Exam Center & AI Classroom Translations
  examCenterTitle: {
    zh: '试卷与真题中心',
    en: 'Exam & Test Center',
    bilingual: '试卷与真题中心 / Exam Center',
  },
  examCenterSubtitle: {
    zh: '考场仿真计时、全真模拟套卷、智能答题卡与 AI 精准组卷阅卷',
    en: 'Simulated timed exams, standard mock papers, interactive answer keys & AI paper generation.',
    bilingual: '考场仿真计时、全真模拟套卷与 AI 组卷 / Timed Exams & AI Papers',
  },
  tabMockPapers: {
    zh: '真题模拟卷',
    en: 'Mock Exam Papers',
    bilingual: '真题模拟卷 / Mock Papers',
  },
  mockPapersTab: {
    zh: '真题模拟卷',
    en: 'Mock Exam Papers',
    bilingual: '真题模拟卷 / Mock Papers',
  },
  tabAiGenerator: {
    zh: 'AI 智能组卷',
    en: 'AI Paper Generator',
    bilingual: 'AI 智能组卷 / AI Generator',
  },
  aiGenPaperTab: {
    zh: 'AI 智能组卷',
    en: 'AI Paper Generator',
    bilingual: 'AI 智能组卷 / AI Generator',
  },
  tabSubmissions: {
    zh: '考试成绩单',
    en: 'Score Reports',
    bilingual: '考试成绩单 / Score Reports',
  },
  scoreReportsTab: {
    zh: '考试成绩单',
    en: 'Score Reports',
    bilingual: '考试成绩单 / Score Reports',
  },
  searchPaperPlaceholder: {
    zh: '搜索试卷标题或核心考点...',
    en: 'Search paper title or key topics...',
    bilingual: '搜索试卷或考点 / Search papers or topics...',
  },
  allSubjectsFilter: {
    zh: '全部全科',
    en: 'All Subjects',
    bilingual: '全部全科 / All Subjects',
  },
  gradeLockPapers: {
    zh: '全屏年级锁：仅呈现特定试卷',
    en: 'Grade Lock: Active Grade Papers Only',
    bilingual: '年级锁：选定年级试卷 / Grade Lock Papers',
  },
  enterExamBtn: {
    zh: '进入考场',
    en: 'Enter Exam',
    bilingual: '进入考场 / Enter Exam',
  },
  noPapersFound: {
    zh: '暂无匹配的模拟试卷',
    en: 'No matching exam papers found',
    bilingual: '暂无匹配试卷 / No Papers Found',
  },
  noPapersFoundSub: {
    zh: '您可以切换“全部年级”或者使用【AI 智能组卷】功能现场生成试卷',
    en: 'Try switching grade filters or use AI Paper Generator to create a custom paper.',
    bilingual: '可使用 AI 智能组卷功能现场生成试卷 / Use AI Generator for Custom Papers',
  },
  goToAiGenBtn: {
    zh: '前往 AI 智能组卷',
    en: 'Go to AI Generator',
    bilingual: '前往 AI 智能组卷 / Go to AI Generator',
  },
  aiGenPaperTitle: {
    zh: 'AI 智能精准组卷系统',
    en: 'AI Custom Exam Paper Generator',
    bilingual: 'AI 智能精准组卷 / AI Paper Generator',
  },
  aiGenPaperSub: {
    zh: '输入想要考核的知识考点与学科，AI 将为您实时生成定制冲刺套卷',
    en: 'Enter target topics and subject to generate a custom practice paper in seconds.',
    bilingual: '输入考点与学科，实时生成套卷 / Generate Custom Papers',
  },
  examSubjectLabel: {
    zh: '考查学科',
    en: 'Subject',
    bilingual: '考查学科 / Subject',
  },
  examGradeLabel: {
    zh: '适用年级 / 考试',
    en: 'Grade Level / Exam',
    bilingual: '适用年级 / Grade Level',
  },
  examSemesterLabel: {
    zh: '学期阶段',
    en: 'Semester',
    bilingual: '学期阶段 / Semester',
  },
  examTopicLabel: {
    zh: '考核专项考点 / 章节标题',
    en: 'Target Topics / Chapter Title',
    bilingual: '考核考点 / Target Topics',
  },
  examTopicPlaceholder: {
    zh: '如：动量守恒与碰撞、二次函数压轴题、雅思学术阅读理解...',
    en: 'e.g., Momentum Conservation, Quadratic Functions, IELTS Reading...',
    bilingual: '如：动量守恒、二次函数 / e.g. Momentum, Calculus',
  },
  examCountLabel: {
    zh: '题目题量 (题)',
    en: 'Question Count',
    bilingual: '题目题量 / Question Count',
  },
  genPaperSubmitBtn: {
    zh: '生成并开启全真考场测试',
    en: 'Generate & Start Exam',
    bilingual: '生成并开启考场测试 / Generate & Start Exam',
  },
  generatingPaper: {
    zh: 'AI 正在为您组卷分析中...',
    en: 'AI is generating your exam paper...',
    bilingual: 'AI 组卷分析中 / Generating Paper...',
  },
  scoreHistoryHeader: {
    zh: '考试成绩与 AI 阅卷记录',
    en: 'Exam Score History & AI Reports',
    bilingual: '考试成绩与 AI 阅卷记录 / Score History',
  },
  scoreEarned: {
    zh: '成绩得分',
    en: 'Report Score',
    bilingual: '成绩得分 / Report Score',
  },
  timeSpent: {
    zh: '用时',
    en: 'Time Spent',
    bilingual: '用时 / Time Spent',
  },
  viewReportBtn: {
    zh: '查看完整诊断报告',
    en: 'View Full AI Report',
    bilingual: '查看诊断报告 / View Report',
  },
  noSubmissionsFound: {
    zh: '暂无已完成的试卷考场记录，快去“真题模拟卷”做一次测试吧！',
    en: 'No exam history yet. Try taking a mock test!',
    bilingual: '暂无考场记录，快去做测试吧！ / No Exam History Yet',
  },
  examCountdown: {
    zh: '倒计时',
    en: 'Time Left',
    bilingual: '倒计时 / Time Left',
  },
  submitExamBtn: {
    zh: '交卷并生成 AI 诊断',
    en: 'Submit & Get AI Report',
    bilingual: '交卷并生成诊断 / Submit & Get Report',
  },
  solutionStepInputPlaceholder: {
    zh: '请输入您的推导步骤与最终答案...',
    en: 'Enter your solution steps and final answer...',
    bilingual: '请输入推导步骤与答案 / Enter solution steps',
  },
  answerCardTitle: {
    zh: '答题卡进度 Navigator',
    en: 'Answer Sheet Navigator',
    bilingual: '答题卡进度 / Answer Sheet',
  },
  answeredCount: {
    zh: '已完成作答',
    en: 'Answered',
    bilingual: '已完成作答 / Answered',
  },
  unansweredCount: {
    zh: '未作答',
    en: 'Unanswered',
    bilingual: '未作答 / Unanswered',
  },
  reportModalTitle: {
    zh: '全真考场诊断报告',
    en: 'Exam Diagnostic Report',
    bilingual: '全真考场诊断报告 / Diagnostic Report',
  },
  confirmAndContinue: {
    zh: '确认并继续复习',
    en: 'Confirm & Continue',
    bilingual: '确认并继续复习 / Confirm & Continue',
  },

  // Classroom specific
  ttsLabel: {
    zh: '名师原声授课 (TTS)',
    en: 'Teacher Audio Lecture (TTS)',
    bilingual: '名师原声授课 / Audio Lecture (TTS)',
  },
  resumeSpeech: {
    zh: '继续',
    en: 'Resume',
    bilingual: '继续 / Resume',
  },
  pauseSpeech: {
    zh: '暂停',
    en: 'Pause',
    bilingual: '暂停 / Pause',
  },
  stopSpeech: {
    zh: '停止',
    en: 'Stop',
    bilingual: '停止 / Stop',
  },
  speakSnippet: {
    zh: '朗读本段',
    en: 'Read Section',
    bilingual: '朗读本段 / Read Section',
  },
  speakingThisSection: {
    zh: '正在讲授此段',
    en: 'Teaching This Section',
    bilingual: '正在讲授此段 / Teaching Section',
  },
  keyTakeawayHeader: {
    zh: '核心结论 / 记忆秘籍：',
    en: 'Key Takeaway / Memory Tip:',
    bilingual: '核心结论 / Key Takeaway:',
  },
  interactiveAskTitle: {
    zh: '名师互动问询',
    en: 'Teacher Interactive Check',
    bilingual: '名师互动问询 / Teacher Check',
  },
  voicePromptBtn: {
    zh: '语音问询',
    en: 'Voice Check',
    bilingual: '语音问询 / Voice Check',
  },
  checkPromptGuidance: {
    zh: '请如实反馈。听懂即可解锁课后练习，若没太懂名师将为你进行更通俗的生动拆解。',
    en: 'Please give feedback. Understood unlocks homework; if not, teacher will explain simply.',
    bilingual: '听懂即可解锁练习，未懂提供通俗拆解 / Understood unlocks exercises',
  },
  optionUnderstood: {
    zh: '💡 完全听懂了，去做课后练习！',
    en: '💡 Fully understood! Start homework exercises.',
    bilingual: '💡 完全听懂了，做练习 / Fully understood!',
  },
  optionNeedsAnalogy: {
    zh: '🤔 没太听懂，请用更通俗方式再讲讲',
    en: '🤔 Didn\'t fully understand, explain simply please.',
    bilingual: '🤔 没太听懂，通俗再讲讲 / Explain simply',
  },
  optionAskQuestion: {
    zh: '❓ 我有具体疑问，想向老师提问',
    en: '❓ I have a specific question for teacher.',
    bilingual: '❓ 向老师提问 / Ask teacher a question',
  },
  analogyBoxHeader: {
    zh: '名师通俗生活化比喻与通俗拆解：',
    en: 'Teacher\'s Everyday Analogy & Simple Breakdown:',
    bilingual: '名师通俗比喻拆解 / Simple Breakdown:',
  },
  readAnalogyBtn: {
    zh: '朗读通俗拆解',
    en: 'Read Analogy',
    bilingual: '朗读通俗拆解 / Read Analogy',
  },
  confirmUnderstoodNext: {
    zh: '再次确认：现在听懂了，去过关测试 ➔',
    en: 'Confirmed: Now I understand, start quiz ➔',
    bilingual: '确认听懂，去过关测试 ➔ / Understood, start quiz ➔',
  },
  askTeacherTitle: {
    zh: '向名师发起在线课堂提问：',
    en: 'Ask Teacher a Question Online:',
    bilingual: '向名师在线提问 / Ask Teacher Online:',
  },
  teacherAnswerHeader: {
    zh: '名师实时拆解与释疑：',
    en: 'Teacher Real-Time Answer:',
    bilingual: '名师实时拆解与释疑 / Teacher Answer:',
  },
  readTeacherAnswer: {
    zh: '朗读名师解答',
    en: 'Read Answer',
    bilingual: '朗读名师解答 / Read Answer',
  },
  askFollowUp: {
    zh: '再次向名师追问',
    en: 'Ask Follow-up',
    bilingual: '再次追问 / Ask Follow-up',
  },
  homeworkSubtitle: {
    zh: '讲堂听讲完毕！请通过以下试题检验学习效果，提交后获得 AI 智能批改。',
    en: 'Lecture complete! Test your understanding below for AI grading.',
    bilingual: '讲堂听讲完毕！请通过以下试题检验效果 / Test your learning below',
  },
  myScore: {
    zh: '本次得分',
    en: 'Score',
    bilingual: '本次得分 / Score',
  },
  strengthsHeader: {
    zh: '考点掌握优势',
    en: 'Strong Knowledge Points',
    bilingual: '考点掌握优势 / Strengths',
  },
  weaknessesHeaderAlt: {
    zh: '需加强巩固考点',
    en: 'Weak Knowledge Points',
    bilingual: '需加强巩固考点 / Weaknesses',
  },
  aiAdviceHeader: {
    zh: 'AI 名师提分建议',
    en: 'AI Study Advice',
    bilingual: 'AI 名师提分建议 / AI Advice',
  },
  retryQuizBtn: {
    zh: '重新答题',
    en: 'Retake Quiz',
    bilingual: '重新答题 / Retake Quiz',
  },
  syncedToMistakes: {
    zh: '已同步存入错题本',
    en: 'Synced to Mistake Book',
    bilingual: '已同步存入错题本 / Synced to Mistakes',
  },
  containsQuestions: {
    zh: '包含',
    en: 'Contains',
    bilingual: '包含 / Contains',
  },
  totalPoints: {
    zh: '满分',
    en: 'Total Points',
    bilingual: '满分 / Total Points',
  },
  startExamBtn: {
    zh: '进入考场',
    en: 'Enter Exam',
    bilingual: '进入考场 / Enter Exam',
  },
  countdown: {
    zh: '倒计时',
    en: 'Time Left',
    bilingual: '倒计时 / Time Left',
  },
  examReportTitle: {
    zh: '全真考场诊断报告',
    en: 'Exam Diagnostic Report',
    bilingual: '全真考场诊断报告 / Diagnostic Report',
  },
  confirmStudyAdvice: {
    zh: '确认并继续复习',
    en: 'Confirm & Continue',
    bilingual: '确认并继续复习 / Confirm & Continue',
  },
  lectureLanguageMode: {
    zh: '讲堂授课语言',
    en: 'Lecture Language',
    bilingual: '讲堂授课语言 / Lecture Language',
  },
  lectureLangZh: {
    zh: '🇨🇳 中文授课',
    en: '🇨🇳 Chinese Lecture',
    bilingual: '🇨🇳 中文授课 / Chinese',
  },
  lectureLangEn: {
    zh: '🇬🇧 英文授课',
    en: '🇬🇧 English Lecture',
    bilingual: '🇬🇧 英文授课 / English',
  },
  lectureLangBi: {
    zh: '🌐 中英双语',
    en: '🌐 Bilingual',
    bilingual: '🌐 中英双语 / Bilingual',
  },
  selectVoicePrompt: {
    zh: '名师发音与音色',
    en: 'Teacher Voice',
    bilingual: '名师音色 / Teacher Voice',
  },
  voiceZhGroup: {
    zh: '中文发音 (Mandarin)',
    en: 'Chinese Voices',
    bilingual: '中文发音 / Chinese Voices',
  },
  voiceEnGroup: {
    zh: '英语发音 (English)',
    en: 'English Voices',
    bilingual: '英语发音 / English Voices',
  },
  voiceSpeed: {
    zh: '语速',
    en: 'Speed',
    bilingual: '语速 / Speed',
  },
  readAloudPreview: {
    zh: '朗读预习指南',
    en: 'Read Aloud Guide',
    bilingual: '朗读预习指南 / Read Aloud',
  },
  stopAudio: {
    zh: '停止朗读',
    en: 'Stop Audio',
    bilingual: '停止朗读 / Stop Audio',
  },
  listenLecture: {
    zh: '名师原声讲课',
    en: 'Audio Lecture',
    bilingual: '名师原声讲课 / Audio Lecture',
  },
  nextSectionAudio: {
    zh: '下一节讲课',
    en: 'Next Section',
    bilingual: '下一节讲课 / Next Section',
  }
};

export const translations = TRANSLATIONS;

