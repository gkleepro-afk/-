export type SubjectCategory = 'language' | 'science' | 'math' | 'coding' | 'humanities' | 'general';

export type TaskType = 'concept' | 'flashcard' | 'practice' | 'quiz' | 'review';

export type DifficultyLevel = 'easy' | 'medium' | 'hard';

export interface StudyTask {
  id: string;
  planId?: string;
  title: string;
  description: string;
  subject: string;
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

export type QuestionType = 'choice' | 'fill' | 'solution';

export interface QuestionBankItem {
  id: string;
  subject: string; // e.g. '数学', '物理', '化学', '英语', '语文', '生物'
  gradeStage: '初中' | '高中';
  gradeLevel: '初一' | '初二' | '初三/中考' | '高一' | '高二' | '高三/高考';
  topic: string; // e.g. '动量守恒', '勾股定理', '函数的单调性'
  question: string;
  options?: string[]; // for choice questions
  correctIndex?: number; // for choice questions
  correctAnswerText?: string; // for fill/solution questions
  explanation: string;
  questionType: QuestionType;
  difficulty: 'easy' | 'medium' | 'hard';
  keyPoints: string[];
  isSavedToMistakes?: boolean;
  userNote?: string;
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

export interface CoursePreviewGuide {
  id: string;
  title: string;
  subject: string;
  gradeLevel: string; // e.g. '初中', '高中'
  publisher?: string; // e.g. '人教版', '沪教版'
  overview: string;
  estimatedTimeMinutes: number;
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

