import { GeneratedStudyPlan, StudyTask, Flashcard, QuizQuestion } from '../types';

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
