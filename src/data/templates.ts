import { GeneratedStudyPlan, StudyTask, Flashcard, QuizQuestion, QuestionBankItem, CoursePreviewGuide, UserProfile, ExamPaperItem, ClassroomLesson } from '../types';

export const DEFAULT_USER_PROFILE: UserProfile = {
  userName: '智学学子',
  avatarEmoji: '🎓',
  avatarUrl: '',
  gradeLevel: '高三/高考',
  semester: '上学期',
  countryRegion: '中国大陆',
  educationSystem: '人教版 (新高考新教材)',
  targetLanguage: '英语',
  targetExam: '2026年普通高等学校招生全国统一考试 (高考)',
  dailyGoalMinutes: 45,
  encouragementTone: 'passionate',
  customMotto: '星光不问赶路人，岁月不负有心人！提分每一天，冲刺理想院校！',
};

export const INITIAL_EXAM_PAPERS: ExamPaperItem[] = [
  {
    id: 'paper-1',
    title: '2026高考物理全真模拟精选冲刺卷（一）',
    subject: '物理',
    gradeLevel: '高三/高考',
    countryRegion: '中国大陆',
    publisher: '新高考全国卷',
    durationMinutes: 60,
    totalScore: 100,
    passingScore: 60,
    description: '涵盖牛顿力学、动量守恒、电磁感应与机械能守恒等高考一轮二轮复习核心压轴考点。',
    questions: [
      {
        id: 'p1-q1',
        subject: '物理',
        gradeStage: '高中',
        gradeLevel: '高三/高考',
        topic: '动量守恒与碰撞',
        question: '在光滑水平面上，质量为 m1=2kg 的木块以 v1=3m/s 的速度与静止的质量为 m2=1kg 的木块发生完全非弹性碰撞，碰撞后两木块粘在一起共同运动。求碰撞后的共同速度 v 及系统的机械能损失 ΔE。',
        options: [
          'v = 2m/s，ΔE = 3J',
          'v = 1.5m/s，ΔE = 4J',
          'v = 2m/s，ΔE = 6J',
          'v = 3m/s，ΔE = 0J'
        ],
        correctIndex: 0,
        explanation: '1. 动量守恒：m1*v1 = (m1+m2)*v => 2*3 = (2+1)*v => v = 2m/s。\n2. 碰撞前总动能 Ek1 = 0.5*2*9 = 9J；碰撞后总动能 Ek2 = 0.5*3*4 = 6J。\n3. 机械能损失 ΔE = 9 - 6 = 3J。选 A。',
        questionType: 'choice',
        difficulty: 'medium',
        keyPoints: ['动量守恒定律', '完全非弹性碰撞', '机械能损失']
      },
      {
        id: 'p1-q2',
        subject: '物理',
        gradeStage: '高中',
        gradeLevel: '高三/高考',
        topic: '电磁感应与法拉第定律',
        question: '在磁感应强度 B=0.5T 的匀强磁场中，有一长 L=0.4m 的金属棒切割磁感线运动，速度 v=4m/s，方向垂直于磁场与金属棒。求金属棒产生的感应电动势 E 为多少伏特？',
        options: ['0.8V', '0.4V', '1.0V', '2.0V'],
        correctIndex: 0,
        explanation: '由法拉第电磁感应定律公式 E = B*L*v = 0.5 * 0.4 * 4 = 0.8V。选 A。',
        questionType: 'choice',
        difficulty: 'easy',
        keyPoints: ['切割磁感线', 'E=BLv公式']
      },
      {
        id: 'p1-q3',
        subject: '物理',
        gradeStage: '高中',
        gradeLevel: '高三/高考',
        topic: '平抛运动轨迹方程',
        question: '一小球以 v0=10m/s 的初速度水平抛出，不计空气阻力，g取10m/s^2。求 1s 末小球的速度方向与水平方向夹角 θ 的正切值 tanθ。',
        correctAnswerText: 'tanθ = 1',
        explanation: '1s 末竖直速度 vy = g*t = 10*1 = 10m/s。水平速度 vx = v0 = 10m/s。故 tanθ = vy / vx = 10 / 10 = 1 (即 θ = 45°)。',
        questionType: 'fill',
        difficulty: 'medium',
        keyPoints: ['平抛运动分解', '速度夹角计算']
      }
    ]
  },
  {
    id: 'paper-2',
    title: '2026中考数学全真模拟真题套卷（二次函数与几何综合）',
    subject: '数学',
    gradeLevel: '初三/中考',
    countryRegion: '中国大陆',
    publisher: '人教版/中考全国卷',
    durationMinutes: 90,
    totalScore: 120,
    passingScore: 72,
    description: '针对中考数学二次函数最值、动点问题与圆的几何综合压轴大题，全真仿真考场冲刺。',
    questions: [
      {
        id: 'p2-q1',
        subject: '数学',
        gradeStage: '初中',
        gradeLevel: '初三/中考',
        topic: '二次函数性质',
        question: '已知二次函数 y = a*x^2 + b*x + c (a≠0) 开口向上，对称轴 x = 1，经过 (-1, 0)。判断结论：① b < 0；② 2a + b = 0；③ a - b + c = 0；④ 4a + 2b + c > 0。正确的有几个？',
        options: ['1个', '2个', '3个', '4个'],
        correctIndex: 2,
        explanation: 'a>0, 对称轴 -b/(2a)=1 => b=-2a<0 => ①②正确；过(-1,0) => a-b+c=0 => ③正确；x=2时y<0 => 4a+2b+c<0 => ④错。正确3个，选C。',
        questionType: 'choice',
        difficulty: 'hard',
        keyPoints: ['二次函数图像', '对称轴与系数关系']
      },
      {
        id: 'p2-q2',
        subject: '数学',
        gradeStage: '初中',
        gradeLevel: '初三/中考',
        topic: '勾股定理与切线',
        question: 'Rt△ABC 中，∠C = 90°，AC = 6，BC = 8。以 C 为圆心，R 为半径画圆，当 R 为多少时，⊙C 与斜边 AB 相切？',
        options: ['4.8', '5', '4', '6'],
        correctIndex: 0,
        explanation: '斜边 AB = √(6^2+8^2) = 10。过 C 作 CD⊥AB，面积 S = 0.5*AC*BC = 0.5*AB*CD => CD = 6*8/10 = 4.8。故半径 R = 4.8 时相切。选 A。',
        questionType: 'choice',
        difficulty: 'medium',
        keyPoints: ['切线长定理', '直角三角形面积法']
      }
    ]
  },
  {
    id: 'paper-3',
    title: 'IELTS Academic English Practice Test (Reading & Grammar)',
    subject: '英语',
    gradeLevel: 'Grade 12 / 雅思',
    countryRegion: '国际/英国',
    publisher: 'Cambridge IELTS Standard',
    durationMinutes: 45,
    totalScore: 100,
    passingScore: 60,
    description: 'Academic reading & grammar diagnostic test for students targeting IELTS 6.5 - 7.5+.',
    questions: [
      {
        id: 'p3-q1',
        subject: '英语',
        gradeStage: '高中',
        gradeLevel: '高三/高考',
        topic: 'Academic Vocabulary',
        question: 'Select the most appropriate word to complete the sentence: "The new renewable energy project is expected to _______ carbon emissions by 30% over the next decade."',
        options: ['mitigate', 'exacerbate', 'accumulate', 'deteriorate'],
        correctIndex: 0,
        explanation: '"Mitigate" means to reduce, lessen, or alleviate severity. "Mitigate carbon emissions" is a formal academic collocation.',
        questionType: 'choice',
        difficulty: 'medium',
        keyPoints: ['Collocations', 'IELTS Writing Task 2']
      }
    ]
  }
];


export const INITIAL_PLANS: GeneratedStudyPlan[] = [
  {
    id: 'plan-physics-1',
    title: '高中物理：力学与动量守恒冲刺计划',
    subject: '高中物理',
    gradeLevel: '高中二年级 / 冲刺',
    targetGoal: '掌握牛顿三大定律、动量守恒定理与动能定理的应用',
    language: 'zh',
    createdAt: new Date().toISOString(),
    overview: '本计划针对高中物理核心考点“力学与动量守恒”设计，结合概念梳理、公式演练与模型辨析，助你在7天内建立扎实的解题框架。',
    estimatedDays: 7,
    keyTopics: ['牛顿第二定律', '受力分析与分解', '动量定理与动量守恒', '弹性与非弹性碰撞', '机械能守恒'],
    dailyTasks: [
      {
        dayOffset: 0,
        title: '受力分析与牛顿第二定律深度复习',
        description: '系统梳理重力、弹力、摩擦力的受力分析步骤，练习整体法与隔离法。',
        subject: '高中物理',
        category: 'science',
        durationMinutes: 30,
        taskType: 'concept',
        difficulty: 'medium',
        keyPoints: ['受力分析四步法', '正交分解法', '超重与失重特征']
      },
      {
        dayOffset: 0,
        title: '力学公式知识卡片记忆与默写',
        description: '复习力学核心公式与适用条件（如 $F=ma$, $f=\\mu N$）。',
        subject: '高中物理',
        category: 'science',
        durationMinutes: 20,
        taskType: 'flashcard',
        difficulty: 'easy',
        keyPoints: ['公式矢量性', '静摩擦力最大值求解']
      },
      {
        dayOffset: 1,
        title: '动量与冲量概念剖析',
        description: '理解 $p=mv$ 与 $I=Ft$ 的物理意义，推导动量定理。',
        subject: '高中物理',
        category: 'science',
        durationMinutes: 30,
        taskType: 'concept',
        difficulty: 'medium',
        keyPoints: ['冲量是矢量', '动量定理在碰撞中的运用']
      },
      {
        dayOffset: 2,
        title: '动量守恒定律三大典型模型训练',
        description: '掌握“碰撞模型”、“反冲模型”与“人船模型”的方程建立。',
        subject: '高中物理',
        category: 'science',
        durationMinutes: 45,
        taskType: 'practice',
        difficulty: 'hard',
        keyPoints: ['守恒条件判断', '动能损失分析']
      }
    ],
    flashcards: [
      {
        front: '动量守恒定律的适用条件是什么？',
        back: '系统不受外力，或者所受合外力为零；或者外力远小于内力（如碰撞、爆炸）；或者某一方向上合外力为零。',
        examples: ['两滑块在光滑水平面相撞：合外力为零，动量守恒。'],
        language: 'zh',
        tags: ['物理', '动量', '守恒定律']
      },
      {
        front: '完全弹性碰撞与完全非弹性碰撞的区别？',
        back: '完全弹性碰撞：动量守恒且机械能无损失；完全非弹性碰撞：动量守恒，但机械能损失最大（碰撞后粘在一起共同运动）。',
        examples: ['钢球碰撞接近弹性碰撞', '子弹打入木块属于完全非弹性碰撞'],
        language: 'zh',
        tags: ['物理', '碰撞模型']
      }
    ],
    quizQuestions: [
      {
        question: '一质量为 m 的小球以速度 v 垂直撞击墙壁后以原速率反弹，墙壁对小球的冲量大小为多少？',
        options: ['0', 'mv', '2mv', '0.5mv'],
        correctIndex: 2,
        explanation: '取反弹方向为正方向，初速度为 -v，末速度为 v。冲量 I = Δp = m*v - m*(-v) = 2mv。'
      }
    ]
  },
  {
    id: 'plan-ielts-1',
    title: '雅思 7.0+ 核心学术词汇与表达突破',
    subject: '英语雅思 (IELTS)',
    gradeLevel: '大学 / 进阶 (B2-C1)',
    targetGoal: '攻克 30 个高频学术写作与阅读核心词汇及替换句型',
    language: 'en',
    createdAt: new Date().toISOString(),
    overview: 'Targeted study plan for mastering C1-level academic vocabulary, paraphrasing techniques, and collocations required for IELTS Academic Writing & Reading.',
    estimatedDays: 10,
    keyTopics: ['Academic Verbs & Nouns', 'Collocations for Essay Writing', 'Paraphrasing Techniques', 'Cohesive Devices'],
    dailyTasks: [
      {
        dayOffset: 0,
        title: 'Master 10 High-Frequency Academic Verbs',
        description: 'Learn terms like "substantiate", "exacerbate", "facilitate", "advocate", and "mitigate" with context sentences.',
        subject: '英语雅思',
        category: 'language',
        durationMinutes: 25,
        taskType: 'flashcard',
        difficulty: 'medium',
        keyPoints: ['Usage in Task 2 essays', 'Synonyms and collocations']
      },
      {
        dayOffset: 0,
        title: 'IELTS Vocabulary Flashcard Review Session',
        description: 'Active recall and pronunciation check for today\'s new word deck.',
        subject: '英语雅思',
        category: 'language',
        durationMinutes: 15,
        taskType: 'review',
        difficulty: 'easy',
        keyPoints: ['Pronunciation & Stress', 'Spelling accuracy']
      },
      {
        dayOffset: 1,
        title: 'Paraphrasing Practice: Environmental & Tech Topics',
        description: 'Practice rewriting Task 2 prompt sentences using target academic vocabulary.',
        subject: '英语雅思',
        category: 'language',
        durationMinutes: 30,
        taskType: 'practice',
        difficulty: 'hard',
        keyPoints: ['Avoiding repetition', 'Formal academic tone']
      }
    ],
    flashcards: [
      {
        front: 'Mitigate',
        phonetic: '/ˈmɪtɪɡeɪt/',
        back: 'v. 使减轻，使缓和 (to make something less harmful, serious, or severe)',
        examples: [
          'Governments should take immediate measures to mitigate the environmental impact of industrial waste.',
          'Renewable energy can help mitigate climate change.'
        ],
        language: 'en',
        tags: ['IELTS', 'Vocabulary', 'Writing Task 2']
      },
      {
        front: 'Substantiate',
        phonetic: '/səbˈstænʃieɪt/',
        back: 'v. 证实，证明 (to provide evidence to support or prove the truth of)',
        examples: [
          'The researcher provided empirical data to substantiate her hypothesis.'
        ],
        language: 'en',
        tags: ['IELTS', 'Academic']
      },
      {
        front: 'Exacerbate',
        phonetic: '/ɪɡˈzæsərbeɪt/',
        back: 'v. 使加剧，使恶化 (to make a problem, bad situation, or negative feeling worse)',
        examples: [
          'Heavy traffic congestion exacerbates urban air pollution.'
        ],
        language: 'en',
        tags: ['IELTS', 'Writing Task 2']
      }
    ],
    quizQuestions: [
      {
        question: 'Choose the best synonym for "mitigate" in the sentence: "Policies were implemented to mitigate risks."',
        options: ['Increase', 'Alleviate', 'Ignore', 'Complicate'],
        correctIndex: 1,
        explanation: '"Mitigate" means to alleviate, reduce, or lessen the severity of something.'
      }
    ]
  },
  {
    id: 'plan-jlpt-1',
    title: '日本語 N2 语法与高频表达强化计划',
    subject: '日语 (Japanese JLPT N2)',
    gradeLevel: '中级 / JLPT N2 备考',
    targetGoal: '精通 20 个 N2 易混淆语法句型与听力高频接续',
    language: 'ja',
    createdAt: new Date().toISOString(),
    overview: 'JLPT N2合格に向けた集中復習プラン。間違いやすい文法接続と読解・聴解で頻出する表現を効率的にマスターします。',
    estimatedDays: 7,
    keyTopics: ['～に違いない / ～に過ぎない', '～ざるを得ない', '～をめぐって', '～かねない / ～かねる'],
    dailyTasks: [
      {
        dayOffset: 0,
        title: 'N2 核心句型 5 选：心理与意志表达',
        description: '复习「～ざるを得ない」「～かねない」「～っこない」的接续与含义。',
        subject: '日语 N2',
        category: 'language',
        durationMinutes: 25,
        taskType: 'concept',
        difficulty: 'medium',
        keyPoints: ['动词否定形+ざるを得ない', 'かねない (有可能导致坏结果)']
      },
      {
        dayOffset: 0,
        title: 'N2 语法翻卡训练与例句朗读',
        description: '进行多语言卡片朗读复习，注意发音与音调。',
        subject: '日语 N2',
        category: 'language',
        durationMinutes: 15,
        taskType: 'flashcard',
        difficulty: 'easy',
        keyPoints: ['例句背诵', '听力习惯']
      }
    ],
    flashcards: [
      {
        front: '～ざるを得ない (zaru wo etanai)',
        back: '不得不……，不能不……（表达因客观状况无奈做出某行为）\n接続：動詞ナイ形＋ざるを得ない（する→せざるを得ない）',
        examples: [
          '台風が近づいているため、試合は延期せざるを得ない。',
          '理由を証明できない以上、謝罪せざるを得ない。'
        ],
        language: 'ja',
        tags: ['JLPT N2', '文法']
      },
      {
        front: '～かねない (kanenai)',
        back: '有可能……，恐怕会……（表示担心某种不好的结果发生）\n接続：動詞マス形＋かねない',
        examples: [
          'このまま睡眠不足が続けば、病気になりかねない。',
          '不注意な発言は誤解を招きかねない。'
        ],
        language: 'ja',
        tags: ['JLPT N2', '文法']
      }
    ],
    quizQuestions: [
      {
        question: '「彼の不吉な予告は現実になり（　　）。」に最も適するものは？',
        options: ['かねない', 'っこない', 'を得ない', 'きれない'],
        correctIndex: 0,
        explanation: '「～かねない」表示“有可能导致不好事情发生”。句意为：他不幸的预言有可能会变成现实。'
      }
    ]
  }
];

export const INITIAL_TASKS: StudyTask[] = [
  {
    id: 'task-1',
    planId: 'plan-physics-1',
    title: '受力分析与牛顿第二定律深度复习',
    description: '系统梳理重力、弹力、摩擦力的受力分析步骤，练习整体法与隔离法。',
    subject: '高中物理',
    category: 'science',
    durationMinutes: 30,
    taskType: 'concept',
    difficulty: 'medium',
    dueDate: new Date().toISOString().split('T')[0],
    completed: true,
    completedAt: new Date().toISOString(),
    keyPoints: ['受力分析四步法', '正交分解法', '超重与失重特征']
  },
  {
    id: 'task-2',
    planId: 'plan-physics-1',
    title: '力学公式知识卡片记忆与默写',
    description: '复习力学核心公式与适用条件（如 F=ma, f=μN）。',
    subject: '高中物理',
    category: 'science',
    durationMinutes: 20,
    taskType: 'flashcard',
    difficulty: 'easy',
    dueDate: new Date().toISOString().split('T')[0],
    completed: false,
    keyPoints: ['公式矢量性', '静摩擦力最大值求解']
  },
  {
    id: 'task-3',
    planId: 'plan-ielts-1',
    title: 'Master 10 High-Frequency Academic Verbs',
    description: 'Learn terms like "substantiate", "exacerbate", "facilitate", "advocate", and "mitigate".',
    subject: '英语雅思',
    category: 'language',
    durationMinutes: 25,
    taskType: 'flashcard',
    difficulty: 'medium',
    dueDate: new Date().toISOString().split('T')[0],
    completed: false,
    keyPoints: ['Usage in Task 2 essays', 'Synonyms and collocations']
  },
  {
    id: 'task-4',
    planId: 'plan-jlpt-1',
    title: 'N2 核心句型 5 选：心理与意志表达',
    description: '复习「～ざるを得ない」「～かねない」「～っこない」的接续与含义。',
    subject: '日语 N2',
    category: 'language',
    durationMinutes: 25,
    taskType: 'concept',
    difficulty: 'medium',
    dueDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    completed: false,
    keyPoints: ['动词否定形+ざるを得ない', 'かねない (有可能导致坏结果)']
  }
];

export const INITIAL_FLASHCARDS: Flashcard[] = [
  {
    id: 'fc-1',
    subject: '英语雅思',
    language: 'en',
    front: 'Mitigate',
    phonetic: '/ˈmɪtɪɡeɪt/',
    back: 'v. 使减轻，使缓和 (to make something less harmful, serious, or severe)',
    examples: [
      'Governments should take immediate measures to mitigate the environmental impact of industrial waste.',
      'Renewable energy can help mitigate climate change.'
    ],
    tags: ['IELTS', 'Vocabulary', 'Writing Task 2'],
    intervalDays: 1,
    easeFactor: 2.5,
    repetitions: 1,
    nextReviewDate: new Date().toISOString().split('T')[0],
    masteryLevel: 40
  },
  {
    id: 'fc-2',
    subject: '英语雅思',
    language: 'en',
    front: 'Exacerbate',
    phonetic: '/ɪɡˈzæsərbeɪt/',
    back: 'v. 使加剧，使恶化 (to make a problem, bad situation, or negative feeling worse)',
    examples: [
      'Heavy traffic congestion exacerbates urban air pollution.'
    ],
    tags: ['IELTS', 'Writing Task 2'],
    intervalDays: 3,
    easeFactor: 2.5,
    repetitions: 2,
    nextReviewDate: new Date().toISOString().split('T')[0],
    masteryLevel: 65
  },
  {
    id: 'fc-3',
    subject: '日语 N2',
    language: 'ja',
    front: '～ざるを得ない (zaru wo etanai)',
    back: '不得不……，不能不……（表达因客观状况无奈做出某行为）\n接続：動詞ナイ形＋ざるを得ない（する→せざるを得ない）',
    examples: [
      '台風が近づいているため、試合は延期せざるを得ない。',
      '理由を証明できない以上、謝罪せざるを得ない。'
    ],
    tags: ['JLPT N2', '文法'],
    intervalDays: 1,
    easeFactor: 2.5,
    repetitions: 0,
    nextReviewDate: new Date().toISOString().split('T')[0],
    masteryLevel: 20
  },
  {
    id: 'fc-4',
    subject: '高中物理',
    language: 'zh',
    front: '动量守恒定律的适用条件是什么？',
    back: '系统不受外力，或者所受合外力为零；或者外力远小于内力（如碰撞、爆炸）；或者某一方向上合外力为零。',
    examples: ['两滑块在光滑水平面相撞：合外力为零，动量守恒。'],
    tags: ['物理', '动量', '守恒定律'],
    intervalDays: 4,
    easeFactor: 2.6,
    repetitions: 3,
    nextReviewDate: new Date().toISOString().split('T')[0],
    masteryLevel: 85
  }
];

export const INITIAL_QUIZZES: QuizQuestion[] = [
  {
    id: 'quiz-1',
    subject: '高中物理',
    question: '一质量为 m 的小球以速度 v 垂直撞击墙壁后以原速率反弹，墙壁对小球的冲量大小为多少？',
    options: ['0', 'mv', '2mv', '0.5mv'],
    correctIndex: 2,
    explanation: '取反弹方向为正方向，初速度为 -v，末速度为 v。冲量 I = Δp = m*v - m*(-v) = 2mv。'
  },
  {
    id: 'quiz-2',
    subject: '英语雅思',
    question: 'Choose the best synonym for "mitigate" in the sentence: "Policies were implemented to mitigate risks."',
    options: ['Increase', 'Alleviate', 'Ignore', 'Complicate'],
    correctIndex: 1,
    explanation: '"Mitigate" means to alleviate, reduce, or lessen the severity of something.'
  },
  {
    id: 'quiz-3',
    subject: '日语 N2',
    question: '「彼の不吉な予告は現実になり（　　）。」に最も適するものは？',
    options: ['かねない', 'っこない', 'を得ない', 'きれない'],
    correctIndex: 0,
    explanation: '「～かねない」表示“有可能导致不好事情发生”。句意为：他不幸的预言有可能会变成现实。'
  }
];

export const INITIAL_QUESTION_BANK: QuestionBankItem[] = [
  {
    id: 'qb-1',
    subject: '物理',
    gradeStage: '高中',
    gradeLevel: '高二',
    topic: '动量守恒与碰撞',
    question: '在光滑水平面上，质量为 m1=2kg 的木块以 v1=3m/s 的速度与静止的质量为 m2=1kg 的木块发生完全非弹性碰撞，碰撞后两木块粘在一起共同运动。求碰撞后的共同速度 v 及系统的机械能损失 ΔE。',
    options: [
      'v = 2m/s，ΔE = 3J',
      'v = 1.5m/s，ΔE = 4J',
      'v = 2m/s，ΔE = 6J',
      'v = 3m/s，ΔE = 0J'
    ],
    correctIndex: 0,
    explanation: '【解析】1. 动量守恒：m1*v1 = (m1+m2)*v => 2*3 = (2+1)*v => v = 2m/s。\n2. 碰撞前总动能 Ek1 = 0.5*m1*v1^2 = 0.5*2*9 = 9J。\n3. 碰撞后总动能 Ek2 = 0.5*(m1+m2)*v^2 = 0.5*3*4 = 6J。\n4. 机械能损失 ΔE = Ek1 - Ek2 = 9J - 6J = 3J。选 A。',
    questionType: 'choice',
    difficulty: 'medium',
    keyPoints: ['动量守恒定律', '完全非弹性碰撞', '机械能损失计算'],
    isSavedToMistakes: true
  },
  {
    id: 'qb-2',
    subject: '数学',
    gradeStage: '初中',
    gradeLevel: '初三/中考',
    topic: '二次函数图像与性质',
    question: '已知二次函数 y = a*x^2 + b*x + c (a≠0) 的图像开口向上，对称轴为直线 x = 1，且经过点 (-1, 0)。下列结论中：① b < 0；② 2a + b = 0；③ a - b + c = 0；④ 4a + 2b + c > 0。正确的有几个？',
    options: ['1个', '2个', '3个', '4个'],
    correctIndex: 2,
    explanation: '【解析】1. 开口向上 => a > 0；对称轴 x = -b/(2a) = 1 => b = -2a < 0 => ①正确，②2a+b=0正确；\n2. 图像过 (-1,0) => a*(-1)^2 + b*(-1) + c = 0 => a - b + c = 0 => ③正确；\n3. 对称轴为 x=1，点 (-1,0) 关于 x=1 对称点为 (3,0)，故当 x=2 时位于轴下方 y < 0，即 4a+2b+c < 0 => ④错误。\n综上正确的有①②③共 3 个。选 C。',
    questionType: 'choice',
    difficulty: 'hard',
    keyPoints: ['二次函数对称轴', '系数与图像判定', '中考压轴选择题'],
    isSavedToMistakes: false
  },
  {
    id: 'qb-3',
    subject: '化学',
    gradeStage: '高中',
    gradeLevel: '高一',
    topic: '氧化还原反应与电子转移',
    question: '在反应 2KMnO4 + 16HCl(浓) = 2KCl + 2MnCl2 + 5Cl2↑ + 8H2O 中，氧化剂与还原剂的物质的量之比为多少？当生成 5mol Cl2 时，转移的电子数为多少？',
    options: [
      '1 : 5，转移 10mol 电子',
      '1 : 8，转移 10mol 电子',
      '1 : 5，转移 5mol 电子',
      '2 : 16，转移 16mol 电子'
    ],
    correctIndex: 0,
    explanation: '【解析】1. KMnO4 中 Mn 从 +7 降至 +2 (做氧化剂)，16 个 HCl 中有 10 个 Cl- 被氧化成 Cl2 (做还原剂)，另外 6 个做酸。故氧化剂 : 还原剂 = 2 : 10 = 1 : 5。\n2. 生成 5mol Cl2 (10个 Cl 原子，从 -1 升至 0)，共失 10mol e-，故转移电子 10mol。选 A。',
    questionType: 'choice',
    difficulty: 'medium',
    keyPoints: ['氧化剂与还原剂', '电子转移守恒', '高考化学必考基础'],
    isSavedToMistakes: false
  },
  {
    id: 'qb-4',
    subject: '英语',
    gradeStage: '初中',
    gradeLevel: '初二',
    topic: '现在完成时与过去完成时辨析',
    question: 'Fill in the blank: "I _______ (study) English for three years, and I can now talk with foreigners fluently."',
    correctAnswerText: 'have studied',
    explanation: '【解析】句子表达从过去三年前开始一直持续到现在且对现在产生影响的动作，动词用现在完成时（have/has + 过去分词）。主语为 I，填 have studied。',
    questionType: 'fill',
    difficulty: 'easy',
    keyPoints: ['现在完成时结构', 'for + 时间段', '中考高频语法'],
    isSavedToMistakes: true
  },
  {
    id: 'qb-5',
    subject: '数学',
    gradeStage: '高中',
    gradeLevel: '高一',
    topic: '函数的单调性与奇偶性',
    question: '已知 f(x) 为 R 上的奇函数，且当 x > 0 时，f(x) = x^2 - 2x。求 f(x) 在 R 上的解析式并求出 f(-3) 的值。',
    correctAnswerText: '当 x < 0 时，f(x) = -x^2 - 2x；f(-3) = -3',
    explanation: '【解析】1. 因为 f(x) 是奇函数，定义域为 R，所以 f(0) = 0。\n2. 设 x < 0，则 -x > 0，代入已知解析式得：f(-x) = (-x)^2 - 2(-x) = x^2 + 2x。\n3. 由奇函数性质 f(-x) = -f(x)，得 -f(x) = x^2 + 2x => f(x) = -x^2 - 2x (x < 0)。\n4. 计算 f(-3)：利用 f(-3) = -f(3) = -(3^2 - 2*3) = -3。',
    questionType: 'solution',
    difficulty: 'medium',
    keyPoints: ['奇函数性质', '区间转化法求解析式', '高考函数核心突破'],
    isSavedToMistakes: false
  },
  {
    id: 'qb-6',
    subject: '生物',
    gradeStage: '高中',
    gradeLevel: '高一',
    topic: '光合作用与细胞呼吸',
    question: '在光照条件下，植物叶肉细胞中能够产生 ATP 的结构有：①细胞质基质；②线粒体基质；③线粒体内膜；④叶绿体类囊体薄膜；⑤叶绿体基质。下列选项正确的是？',
    options: ['①②③④', '①②③⑤', '②③④⑤', '①③④⑤'],
    correctIndex: 0,
    explanation: '【解析】1. 有氧呼吸三个阶段：第一阶段在细胞质基质(①)，第二阶段在线粒体基质(②)，第三阶段在线粒体内膜(③)，三者均产生 ATP。\n2. 光合作用光反应阶段在叶绿体类囊体薄膜(④)上产生 ATP；而叶绿体基质(⑤)是暗反应阶段，消耗 ATP，不产生 ATP。\n故正确选项为①②③④。选 A。',
    questionType: 'choice',
    difficulty: 'medium',
    keyPoints: ['光反应与暗反应', '有氧呼吸场所', 'ATP 产生途径'],
    isSavedToMistakes: false
  }
];

export const INITIAL_COURSE_PREVIEWS: CoursePreviewGuide[] = [
  {
    id: 'preview-physics-newton1',
    title: '初中物理：《牛顿第一定律与惯性》新课预习案',
    subject: '物理',
    gradeLevel: '初中 (初二下)',
    publisher: '人教版',
    overview: '本预习案带你打破日常生活中的物理直觉误区，探究“力是不是维持物体运动的原因”，深刻理解牛顿第一定律与惯性现象。',
    estimatedTimeMinutes: 20,
    learningObjectives: [
      '知道伽利略斜面实验的推理过程与科学方法',
      '理解牛顿第一定律（惯性定律）的准确表述与适用条件',
      '能够用“惯性”解释生活中的常见现象（如刹车前倾、甩干衣服）'
    ],
    prerequisites: [
      '力的三要素（大小、方向、作用点）与力的作用效果（改变物体的运动状态或形状）',
      '二力平衡条件（同物、等大、反向、共线）'
    ],
    coreDefinitions: [
      {
        name: '伽利略理想斜面实验',
        explanation: '让小车从同一斜面同一高度静止滑下，表面越光滑，受到的阻力越小，小车运动的距离越远。推理：若阻力为零，小车将永远做匀速直线运动。',
        keyFormula: '科学推理法 (理想化思维模型)'
      },
      {
        name: '牛顿第一定律 (惯性定律)',
        explanation: '一切物体在没有受到力的作用时，总保持静止状态或匀速直线运动状态。',
        keyFormula: 'F合 = 0 ⟹ 静止 或 匀速直线运动'
      },
      {
        name: '惯性 (Inertia)',
        explanation: '物体保持原有运动状态不变的属性。一切物体在任何情况下都具有惯性，质量是惯性大小的唯一量度。',
        keyFormula: '质量越大 ⟹ 惯性越大 ⟹ 运动状态越难改变'
      }
    ],
    selfCheckQuiz: [
      {
        question: '一正在空中飞行的足球，若突然失去一切外力作用，它将（ ）。',
        options: ['立即停在空中', '垂直掉落到地面', '做匀速直线运动', '减速运动直到停止'],
        correctIndex: 2,
        explanation: '根据牛顿第一定律，原来运动的物体在不受外力时将保持匀速直线运动状态。'
      },
      {
        question: '关于惯性，下列说法正确的是（ ）。',
        options: [
          '静止的物体没有惯性',
          '物体速度越大，惯性越大',
          '物体不受力时才有惯性',
          '汽车质量越大，惯性越大，越难刹车'
        ],
        correctIndex: 3,
        explanation: '质量是惯性大小的唯一决定因素。任何物体任何状态下均有惯性。'
      }
    ],
    questionsToAskTeacher: [
      '既然牛顿第一定律是在理想状况下（不受外力）成立的，我们生活中受力的物体是如何表现出匀速运动的？',
      '惯性是一种力吗？为什么不能说“受到了惯性的作用”？'
    ]
  },
  {
    id: 'preview-math-function-monotone',
    title: '高中数学：《函数的单调性与最大(小)值》新课预习案',
    subject: '数学',
    gradeLevel: '高中 (高一上)',
    publisher: '人教 A 版',
    overview: '函数的单调性是函数性质研究的核心。本预习案带你从“图像的升降”过渡到用严密的“代数定义 ($f(x_1) < f(x_2)$)”来证明单调性。',
    estimatedTimeMinutes: 25,
    learningObjectives: [
      '从图像直观理解函数的增减变化，掌握增函数与减函数的图象特征',
      '掌握用定义法证明函数单调性的标准四步法（作差法）',
      '学会利用单调性求函数在闭区间上的最大值与最小值'
    ],
    prerequisites: [
      '初中一次函数、二次函数的图像与性质',
      '不等式的性质与因式分解（特别是平方差与作差比较大小）'
    ],
    coreDefinitions: [
      {
        name: '增函数 (Increasing Function) 代数定义',
        explanation: '设函数 f(x) 在区间 D 上，对于任意的 x1, x2 ∈ D，当 x1 < x2 时，都有 f(x1) < f(x2)，则称 f(x) 在 D 上是增函数。',
        keyFormula: '(x1 - x2)[f(x1) - f(x2)] > 0'
      },
      {
        name: '定义法证明单调性四步法',
        explanation: '1. 取值：任取 x1, x2 ∈ D，且 x1 < x2；\n2. 作差：计算 f(x1) - f(x2)；\n3. 变形：因式分解或配方；\n4. 定号：判断差值符号并下结论。',
        keyFormula: '取值 ⟹ 作差 ⟹ 变形 ⟹ 定号'
      }
    ],
    selfCheckQuiz: [
      {
        question: '已知函数 f(x) = -x^2 + 2x，在区间 (-∞, 1] 上 f(x) 是（ ）。',
        options: ['增函数', '减函数', '先增后减', '常数函数'],
        correctIndex: 0,
        explanation: '二次函数对称轴为 x = 1，开口向下，在对称轴左侧 (-∞, 1] 上递增。'
      }
    ],
    questionsToAskTeacher: [
      '在写函数的单调递增区间时，为什么两个独立的递增区间中间不能用“∪”（并集符号）连接，而要用“和”或逗号隔开？',
      '除了作差法之外，未来我们在导数中将如何更快速地判断单调性？'
    ]
  }
];

export const INITIAL_CLASSROOM_LESSONS: ClassroomLesson[] = [
  {
    id: 'lesson-1-gaosan',
    subject: '物理',
    topic: '牛顿第二定律综合应用与受力分析',
    gradeLevel: '高三/高考',
    semester: '上学期',
    countryRegion: '中国大陆',
    educationSystem: '人教版 (新高考新教材)',
    teacherName: '智学名师 · 张特级',
    lectureTitle: '高考物理一轮复习：牛顿第二定律综合模型与受力分析破局',
    lectureSections: [
      {
        sectionTitle: '一、经典场景导入：为什么受力分析决定高考物理成败？',
        content: '同学们好！欢迎来到高考物理名师讲堂。高三一轮复习中，力学是整座物理大厦的基石。很多同学觉得“公式我都背过（F=ma），但一做高考大题就毫无头绪”。根本原因在于：你没有真正掌握【受力分析三步法】与【瞬时性判定】。今天张老师带大家彻底拿下这个必考核心模型！',
        keyTakeaway: '受力分析是解题的第一要素，F合 与 a 具有瞬时对应性与同向性！'
      },
      {
        sectionTitle: '二、核心推导与解题规范：斜面滑块与超重失重拆解',
        content: '我们来看一道高考真题变式：质量为 m 的物体放在倾角为 θ 的粗糙斜面上，受到水平向右的拉力 F。如何判断它的运动趋势？首先，隔离物体 m；第二步，画出重力 mg（竖直向下）、支持力 N（垂直斜面向上）、拉力 F（水平向右）；第三步，将所有力沿【平行斜面】和【垂直斜面】建立直角坐标系正交分解！垂直斜面方向无加速度：N = mg*cosθ + F*sinθ；平行斜面方向：若拉力分量大于重力分量与最大静摩擦力，物体将向上加速：F*cosθ - mg*sinθ - f = m*a。大家看，思路是不是瞬间清爽了？',
        keyTakeaway: '建系原则：顺着加速度方向建 x 轴，垂直加速度建 y 轴，分解不受力的“斜力”。'
      }
    ],
    simplifiedExplanation: '如果觉得抽象，我们可以用“推购物车上斜坡”来比喻：拉力 F 往右拉，一部分力用来把车往斜坡上拽（F*cosθ），一部分力把车往斜坡面上压（F*sinθ，增加了地面摩擦）。只有向上的拽力大于重力下滑力与摩擦力之和，车子才会加速跑起来！',
    checkQuestionPrompt: '同学们，上面关于斜面正交分解与 F合=ma 的推导逻辑，你听懂了吗？',
    homeworkQuiz: [
      {
        id: 'hw-gaosan-1',
        subject: '物理',
        gradeStage: '高中',
        gradeLevel: '高三/高考',
        topic: '牛顿第二定律',
        question: '质量为 2kg 的物体在倾角 30° 的光滑斜面上下滑，重力加速度 g=10m/s²。求物体的加速度大小为：',
        options: ['A. 2.5 m/s²', 'B. 5.0 m/s²', 'C. 8.6 m/s²', 'D. 10 m/s²'],
        correctIndex: 1,
        explanation: '在光滑斜面上，合外力只有重力沿斜面的分力：F合 = mg*sin30° = 2*10*0.5 = 10N。根据 F合 = ma，a = 10/2 = 5m/s²。答案选 B。',
        questionType: 'choice',
        difficulty: 'medium',
        keyPoints: ['牛顿第二定律', '斜面受力分析']
      },
      {
        id: 'hw-gaosan-2',
        subject: '物理',
        gradeStage: '高中',
        gradeLevel: '高三/高考',
        topic: '超重与失重',
        question: '人站在电梯中的体重计上，当电梯以 2m/s² 的加速度加速上升时，体重计的示数与静止时相比：',
        options: ['A. 增大（超重）', 'B. 减小（失重）', 'C. 不变', 'D. 变为零'],
        correctIndex: 0,
        explanation: '加速度向上时，N - mg = ma => N = m(g+a) > mg，此时人处于超重状态，示数增大。答案选 A。',
        questionType: 'choice',
        difficulty: 'easy',
        keyPoints: ['超重与失重', '加速度方向判断']
      }
    ]
  },
  {
    id: 'lesson-2-gaoyi',
    subject: '数学',
    topic: '二次函数的图像与区间最值（轴动区间定模型）',
    gradeLevel: '高一',
    semester: '上学期',
    countryRegion: '中国大陆',
    educationSystem: '人教版',
    teacherName: '智学名师 · 王老师',
    lectureTitle: '高一数学必修一：二次函数区间最值的分类讨论精讲',
    lectureSections: [
      {
        sectionTitle: '一、引入：初高中数学衔接的最大难点',
        content: '同学们好！初中我们学二次函数，自变量 x 通常是全体实数，最值直接看顶点。但到了高一，自变量被限制在指定闭区间 [m, n] 上！这就演变成了高中数学第一个高频考点——分类讨论。今天王老师教大家用“对称轴与区间相对位置”三步解题！',
        keyTakeaway: '区间最值看两要素：抛物线开口方向 + 对称轴在区间的左侧、内部还是右侧！'
      },
      {
        sectionTitle: '二、模型拆解：开口向上 f(x)=x^2-2ax+1 在 [0, 2] 上的最小值',
        content: '我们来看开口向上的二次函数 f(x) = (x-a)^2 + 1-a^2，对称轴为 x = a。当对称轴 a 在区间左侧（a < 0）时，函数在 [0, 2] 上单调递增，最小值在左端点 f(0) 处取得；当对称轴在区间内部（0 ≤ a ≤ 2）时，最小值就是顶点的纵坐标 f(a)；当对称轴在区间右侧（a > 2）时，函数在 [0, 2] 上单调递减，最小值在右端点 f(2) 处取得。三种情况全面覆盖，绝漏掉任何一种！',
        keyTakeaway: '分类讨论标准：对称轴 < 左端点、对称轴在区间内、对称轴 > 右端点。'
      }
    ],
    simplifiedExplanation: '我们可以想象在滑滑梯：区间 [0, 2] 就是你滑滑梯的活动范围。如果最底端（顶点）落在你的范围内，最低点就是滑滑梯的最底端；如果最底端在你左边远处，那你活动范围内最左边就是最低的；反之最右边就是最低的。',
    checkQuestionPrompt: '同学们，上面关于“对称轴与区间相对位置”的 3 种分类讨论方法，你听懂了吗？',
    homeworkQuiz: [
      {
        id: 'hw-gaoyi-1',
        subject: '数学',
        gradeStage: '高中',
        gradeLevel: '高一',
        topic: '二次函数最值',
        question: '函数 f(x) = (x-1)^2 + 2 在区间 [2, 4] 上的最小值是：',
        options: ['A. 2', 'B. 3', 'C. 11', 'D. 6'],
        correctIndex: 1,
        explanation: '对称轴为 x = 1，区间为 [2, 4]。对称轴在区间左侧，因此 f(x) 在 [2, 4] 上递增。最小值在 x = 2 处，f(2) = (2-1)^2 + 2 = 3。答案选 B。',
        questionType: 'choice',
        difficulty: 'easy',
        keyPoints: ['二次函数区间最值', '对称轴判定']
      }
    ]
  },
  {
    id: 'lesson-3-chusan',
    subject: '化学',
    topic: '质量守恒定律与化学方程式配平精讲',
    gradeLevel: '初三/中考',
    semester: '上学期',
    countryRegion: '中国大陆',
    educationSystem: '人教版',
    teacherName: '智学名师 · 李老师',
    lectureTitle: '初三化学中考冲刺：质量守恒定律微观本质与配平技巧',
    lectureSections: [
      {
        sectionTitle: '一、导入：为什么化学反应前后质量不会凭空消失？',
        content: '同学们好！化学是一门以实验为基础的学科。很多初三同学做实验时疑问：木炭燃烧后只剩下灰烬，质量变小了，难道质量守恒定律错了吗？当然没有！因为生成的二氧化碳气体逸散到了空气中。如果在密闭容器中，反应前后的总质量必定严格相等！',
        keyTakeaway: '质量守恒定律微观本质：化学反应前后，原子的种类、数目、质量均保持不变！'
      },
      {
        sectionTitle: '二、中考必考配平技巧：最小公倍数法与奇偶配平法',
        content: '配平化学方程式时，不要盲目凑数。例如配平 Fe + O2 -> Fe3O4：反应前 O 为 2 个，反应后 O 为 4 个，最小公倍数是 4，所以在 O2 前填 2；反应后 Fe 为 3 个，所以在 Fe 前填 3。即 3Fe + 2O2 = Fe3O4（点燃）。记准“六不变”：原子种类、数目、质量不变；元素种类、质量不变；物质总质量不变。',
        keyTakeaway: '化学反应宏观与微观“六不变”，抓准原子个数守恒即能快速配平。'
      }
    ],
    simplifiedExplanation: '质量守恒就好像玩积木：反应前你有 3 个红积木和 4 个蓝积木，拆开后重新拼成新的模型，积木的总个数和总重量依然是 3 个红 + 4 个蓝，一个都没有掉，也没有凭空多出来！',
    checkQuestionPrompt: '同学们，上面关于“原子种类与数目不变”及最小公倍数配平法，你听懂了吗？',
    homeworkQuiz: [
      {
        id: 'hw-chusan-1',
        subject: '化学',
        gradeStage: '初中',
        gradeLevel: '初三/中考',
        topic: '质量守恒定律',
        question: '在化学反应 A + 2B = C + 2D 中，已知 6g A 与足量 B 充分反应后生成 8g C 和 10g D，则参加反应的 B 的质量为：',
        options: ['A. 12g', 'B. 14g', 'C. 16g', 'D. 18g'],
        correctIndex: 0,
        explanation: '根据质量守恒定律：反应物总质量 = 生成物总质量。m(A) + m(B) = m(C) + m(D) => 6g + m(B) = 8g + 10g = 18g => m(B) = 12g。答案选 A。',
        questionType: 'choice',
        difficulty: 'easy',
        keyPoints: ['质量守恒定律计算', '质量守恒定律微观本质']
      }
    ]
  }
];


