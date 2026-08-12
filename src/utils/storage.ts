import { StudyTask, Flashcard, QuizQuestion, GeneratedStudyPlan, UserStats, QuestionBankItem, CoursePreviewGuide } from '../types';
import { INITIAL_PLANS, INITIAL_TASKS, INITIAL_FLASHCARDS, INITIAL_QUIZZES, INITIAL_QUESTION_BANK, INITIAL_COURSE_PREVIEWS } from '../data/templates';

const KEYS = {
  TASKS: 'zhixue_study_tasks_v1',
  FLASHCARDS: 'zhixue_flashcards_v1',
  QUIZZES: 'zhixue_quizzes_v1',
  PLANS: 'zhixue_plans_v1',
  STATS: 'zhixue_user_stats_v1',
  QUESTION_BANK: 'zhixue_question_bank_v1',
  COURSE_PREVIEWS: 'zhixue_course_previews_v1',
};

export const getStoredQuestionBank = (): QuestionBankItem[] => {
  try {
    const raw = localStorage.getItem(KEYS.QUESTION_BANK);
    return raw ? JSON.parse(raw) : INITIAL_QUESTION_BANK;
  } catch {
    return INITIAL_QUESTION_BANK;
  }
};

export const saveQuestionBank = (questions: QuestionBankItem[]) => {
  localStorage.setItem(KEYS.QUESTION_BANK, JSON.stringify(questions));
};

export const getStoredCoursePreviews = (): CoursePreviewGuide[] => {
  try {
    const raw = localStorage.getItem(KEYS.COURSE_PREVIEWS);
    return raw ? JSON.parse(raw) : INITIAL_COURSE_PREVIEWS;
  } catch {
    return INITIAL_COURSE_PREVIEWS;
  }
};

export const saveCoursePreviews = (guides: CoursePreviewGuide[]) => {
  localStorage.setItem(KEYS.COURSE_PREVIEWS, JSON.stringify(guides));
};


export const getStoredPlans = (): GeneratedStudyPlan[] => {
  try {
    const raw = localStorage.getItem(KEYS.PLANS);
    return raw ? JSON.parse(raw) : INITIAL_PLANS;
  } catch {
    return INITIAL_PLANS;
  }
};

export const savePlans = (plans: GeneratedStudyPlan[]) => {
  localStorage.setItem(KEYS.PLANS, JSON.stringify(plans));
};

export const getStoredTasks = (): StudyTask[] => {
  try {
    const raw = localStorage.getItem(KEYS.TASKS);
    return raw ? JSON.parse(raw) : INITIAL_TASKS;
  } catch {
    return INITIAL_TASKS;
  }
};

export const saveTasks = (tasks: StudyTask[]) => {
  localStorage.setItem(KEYS.TASKS, JSON.stringify(tasks));
};

export const getStoredFlashcards = (): Flashcard[] => {
  try {
    const raw = localStorage.getItem(KEYS.FLASHCARDS);
    return raw ? JSON.parse(raw) : INITIAL_FLASHCARDS;
  } catch {
    return INITIAL_FLASHCARDS;
  }
};

export const saveFlashcards = (cards: Flashcard[]) => {
  localStorage.setItem(KEYS.FLASHCARDS, JSON.stringify(cards));
};

export const getStoredQuizzes = (): QuizQuestion[] => {
  try {
    const raw = localStorage.getItem(KEYS.QUIZZES);
    return raw ? JSON.parse(raw) : INITIAL_QUIZZES;
  } catch {
    return INITIAL_QUIZZES;
  }
};

export const saveQuizzes = (quizzes: QuizQuestion[]) => {
  localStorage.setItem(KEYS.QUIZZES, JSON.stringify(quizzes));
};

export const getStoredStats = (): UserStats => {
  const defaultStats: UserStats = {
    totalStudyMinutes: 135,
    streakDays: 4,
    lastStudyDate: new Date().toISOString().split('T')[0],
    completedTasksCount: 12,
    reviewedCardsCount: 38,
    quizzesTakenCount: 5,
    averageQuizScore: 88,
    subjectProgress: {
      '高中物理': 65,
      '英语雅思': 80,
      '日语 N2': 45,
    },
  };

  try {
    const raw = localStorage.getItem(KEYS.STATS);
    return raw ? JSON.parse(raw) : defaultStats;
  } catch {
    return defaultStats;
  }
};

export const saveStats = (stats: UserStats) => {
  localStorage.setItem(KEYS.STATS, JSON.stringify(stats));
};

// Spaced Repetition (Ebbinghaus algorithm logic)
export const updateCardReview = (card: Flashcard, rating: 'again' | 'hard' | 'good' | 'easy'): Flashcard => {
  let intervalDays = card.intervalDays || 1;
  let easeFactor = card.easeFactor || 2.5;
  let repetitions = card.repetitions || 0;
  let masteryLevel = card.masteryLevel || 0;

  if (rating === 'again') {
    repetitions = 0;
    intervalDays = 1;
    easeFactor = Math.max(1.3, easeFactor - 0.2);
    masteryLevel = Math.max(0, masteryLevel - 20);
  } else if (rating === 'hard') {
    intervalDays = Math.max(1, Math.round(intervalDays * 1.2));
    easeFactor = Math.max(1.3, easeFactor - 0.15);
    masteryLevel = Math.min(100, masteryLevel + 10);
  } else if (rating === 'good') {
    repetitions += 1;
    if (repetitions === 1) intervalDays = 2;
    else if (repetitions === 2) intervalDays = 5;
    else intervalDays = Math.round(intervalDays * easeFactor);
    masteryLevel = Math.min(100, masteryLevel + 25);
  } else if (rating === 'easy') {
    repetitions += 1;
    intervalDays = Math.round(intervalDays * easeFactor * 1.3);
    easeFactor = easeFactor + 0.15;
    masteryLevel = Math.min(100, masteryLevel + 40);
  }

  const nextDate = new Date();
  nextDate.setDate(nextDate.getDate() + intervalDays);

  return {
    ...card,
    intervalDays,
    easeFactor,
    repetitions,
    masteryLevel,
    nextReviewDate: nextDate.toISOString().split('T')[0],
    lastReviewedAt: new Date().toISOString(),
  };
};
