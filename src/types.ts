export type SubjectCategory = 'language' | 'science' | 'math' | 'coding' | 'humanities' | 'general';

export type TaskType = 'concept' | 'flashcard' | 'practice' | 'quiz' | 'review';

export type DifficultyLevel = 'easy' | 'medium' | 'hard';

export interface StudyTask {
  id: string;
  planId?: string;
  title: string;
  description: string;
  subject: string;
  gradeLevel?: string;
  category: SubjectCategory;
  durationMinutes: number;
  taskType: TaskType;
  difficulty: DifficultyLevel;
  dueDate: string; // ISO string (YYYY-MM-DD)
  completed: boolean;
  completedAt?: string;
  keyPoints: string[];
  language?: string;
}

export interface Flashcard {
  id: string;
  deckId?: string;
  subject: string;
  language: string; // e.g., 'en', 'zh', 'ja', 'es', 'fr', 'de', 'ko'
  front: string;
  back: string;
  phonetic?: string;
  examples?: string[];
  tags?: string[];
  // Spaced repetition fields (Ebbinghaus)
  intervalDays: number;
  easeFactor: number; // default 2.5
  repetitions: number;
  nextReviewDate: string; // YYYY-MM-DD
  masteryLevel: number; // 0 to 100
  lastReviewedAt?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  subject: string;
  language?: string;
}

export interface GeneratedStudyPlan {
  id: string;
  title: string;
  subject: string;
  gradeLevel: string;
  targetGoal: string;
  language: string;
  createdAt: string;
  overview: string;
  estimatedDays: number;
  keyTopics: string[];
  dailyTasks: Array<{
    dayOffset: number;
    title: string;
    description: string;
    subject: string;
    category: SubjectCategory;
    durationMinutes: number;
    taskType: TaskType;
    difficulty: DifficultyLevel;
    keyPoints: string[];
  }>;
  flashcards: Array<{
    front: string;
    back: string;
    phonetic?: string;
    examples?: string[];
    language: string;
    tags?: string[];
  }>;
  quizQuestions: Array<{
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }>;
}

export interface UserStats {
  totalStudyMinutes: number;
  streakDays: number;
  lastStudyDate: string; // YYYY-MM-DD
  completedTasksCount: number;
  reviewedCardsCount: number;
  quizzesTakenCount: number;
  averageQuizScore: number;
  subjectProgress: Record<string, number>; // subject -> mastery percentage
}

export interface ConceptExplanation {
  term: string;
  category: string;
  coreDefinition: string;
  detailedExplanation: string;
  keyTakeaways: string[];
  examples: string[];
  commonPitfalls?: string[];
  relatedTerms?: string[];
}

export interface PhotoQuestionAnalysis {
  ocrText: string;
  subject: string;
  grade: string;
  topic: string;
  difficulty?: string;
  keyPoints: string[];
  stepByStepSolution: string[];
  commonMistakes: string[];
  similarQuestion?: {
    question: string;
    options?: string[];
    correctAnswer: string;
    explanation: string;
  };
}

export type QuestionType = '单选题' | '填空题' | '解答题' | 'choice' | 'fill' | 'solution';
export type QuestionDifficulty = '基础' | '中等' | '拔高' | 'easy' | 'medium' | 'hard';

export interface CoursePreviewGuide {
  id: string;
  title: string;
  chapterTitle?: string;
  subject: string;
  gradeLevel: string; // e.g. '初中', '高中'
  semester?: string; // e.g. '上学期', '下学期'
  publisher?: string; // e.g. '人教版', '沪教版'
  overview: string;
  estimatedTimeMinutes: number;
  estimatedMinutes?: number;
  learningObjectives: string[];
  prerequisites: string[];
  coreDefinitions: Array<{
    name: string;
    explanation: string;
    keyFormula?: string;
  }>;
  selfCheckQuiz: Array<{
    id?: string;
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }>;
  questionsToAskTeacher: string[];
}

export interface UserProfile {
  userName: string;
  avatarEmoji?: string; // e.g. '🎓', '🚀', '🦊', '🦉', '⚡', '🌸', '🦁', '📚'
  avatarUrl?: string; // custom avatar image URL
  gradeLevel: string; // e.g., '高三/高考', '初三/中考', '高一', '高二', '初一', '初二', 'Grade 10', 'Grade 12'
  semester: string; // '上学期' | '下学期' | '全学年/中高考复习'
  countryRegion: string; // e.g., '中国大陆', '中国香港', '美国', '英国', '新加坡'
  educationSystem: string; // e.g., '人教版', '粤教版', '苏教版', '沪教版', '通用/中高考', 'IB/AP/A-Level'
  targetLanguage: string; // e.g., '英语', '日语', '法语', '德语', '西班牙语', '中文'
  targetExam: string; // e.g., '高考', '中考', 'SAT/ACT', '雅思/托福', 'JLPT N2'
  dailyGoalMinutes: number;
  encouragementTone: 'gentle' | 'passionate' | 'humorous' | 'academic';
  customMotto: string;
}

export interface QuestionBankItem {
  id: string;
  subject: string;
  gradeStage: '小学' | '初中' | '高中' | '大学/技能' | string;
  gradeLevel: string;
  semester?: string; // e.g. '上学期', '下学期', '全学年'
  topic: string;
  topicEn?: string;
  question: string;
  questionEn?: string;
  options?: string[];
  optionsEn?: string[];
  correctIndex?: number;
  correctAnswerText?: string;
  explanation: string;
  explanationEn?: string;
  questionType: QuestionType;
  difficulty: QuestionDifficulty;
  isSavedToMistakes?: boolean;
  userNotes?: string;
  userNote?: string;
  keyPoints: string[];
}

export interface ClassroomSection {
  sectionTitle: string;
  sectionTitleEn?: string;
  content: string;
  contentEn?: string;
  keyTakeaway: string;
  keyTakeawayEn?: string;
}

export interface ClassroomLesson {
  id: string;
  subject: string;
  topic: string;
  topicEn?: string;
  gradeLevel: string;
  semester?: string;
  countryRegion?: string;
  educationSystem?: string;
  teacherName: string;
  teacherNameEn?: string;
  lectureTitle: string;
  lectureTitleEn?: string;
  lectureSections: ClassroomSection[];
  simplifiedExplanation: string;
  simplifiedExplanationEn?: string;
  checkQuestionPrompt: string;
  checkQuestionPromptEn?: string;
  homeworkQuiz: QuestionBankItem[];
}

export interface ExamPaperItem {
  id: string;
  title: string;
  titleEn?: string;
  subject: string;
  gradeLevel: string;
  semester?: string;
  countryRegion: string;
  publisher?: string;
  durationMinutes: number;
  totalScore: number;
  passingScore: number;
  description: string;
  descriptionEn?: string;
  questions: QuestionBankItem[];
}

export interface ExamSubmission {
  id: string;
  paperId: string;
  paperTitle: string;
  submittedAt: string;
  score: number;
  totalScore: number;
  timeSpentSeconds: number;
  userAnswers: Record<string, number | string>;
  aiEvaluation?: {
    summary: string;
    strengths: string[];
    weaknesses: string[];
    studyAdvice: string[];
  };
}


