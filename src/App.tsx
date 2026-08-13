import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { DailyRoadmap } from './components/DailyRoadmap';
import { PlanGenerator } from './components/PlanGenerator';
import { FlashcardsView } from './components/FlashcardsView';
import { QuizView } from './components/QuizView';
import { AnalyticsView } from './components/AnalyticsView';
import { PhotoSolveView } from './components/PhotoSolveView';
import { QuestionBankView } from './components/QuestionBankView';
import { CoursePreviewView } from './components/CoursePreviewView';
import { ConceptModal } from './components/ConceptModal';
import { PomodoroModal } from './components/PomodoroModal';

import { ClassroomView } from './components/ClassroomView';

import { 
  getStoredPlans, 
  savePlans, 
  getStoredTasks, 
  saveTasks, 
  getStoredFlashcards, 
  saveFlashcards, 
  getStoredQuizzes, 
  saveQuizzes, 
  getStoredStats, 
  saveStats,
  getStoredQuestionBank,
  saveQuestionBank,
  getStoredCoursePreviews,
  saveCoursePreviews,
  getStoredUserProfile,
  saveUserProfile,
  getStoredExamPapers,
  saveExamPapers,
  getStoredExamSubmissions,
  saveExamSubmissions,
  getStoredClassroomLessons,
  saveClassroomLessons,
  updateCardReview
} from './utils/storage';

import { GeneratedStudyPlan, StudyTask, Flashcard, QuizQuestion, UserStats, QuestionBankItem, CoursePreviewGuide, UserProfile, ExamPaperItem, ExamSubmission, ClassroomLesson } from './types';
import { UILanguage } from './utils/translations';
import { UserProfileModal } from './components/UserProfileModal';
import { ExamCenter } from './components/ExamCenter';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('roadmap');
  const [uiLang, setUiLang] = useState<UILanguage>('bilingual');
  
  // Data States
  const [plans, setPlans] = useState<GeneratedStudyPlan[]>(getStoredPlans);
  const [tasks, setTasks] = useState<StudyTask[]>(getStoredTasks);
  const [cards, setCards] = useState<Flashcard[]>(getStoredFlashcards);
  const [quizzes, setQuizzes] = useState<QuizQuestion[]>(getStoredQuizzes);
  const [stats, setStats] = useState<UserStats>(getStoredStats);
  const [questionBank, setQuestionBank] = useState<QuestionBankItem[]>(getStoredQuestionBank);
  const [coursePreviews, setCoursePreviews] = useState<CoursePreviewGuide[]>(getStoredCoursePreviews);
  const [userProfile, setUserProfile] = useState<UserProfile>(getStoredUserProfile);
  const [examPapers, setExamPapers] = useState<ExamPaperItem[]>(getStoredExamPapers);
  const [examSubmissions, setExamSubmissions] = useState<ExamSubmission[]>(getStoredExamSubmissions);
  const [classroomLessons, setClassroomLessons] = useState<ClassroomLesson[]>(getStoredClassroomLessons);

  // Modal States
  const [activeConceptTerm, setActiveConceptTerm] = useState<string | null>(null);
  const [showPomodoro, setShowPomodoro] = useState<boolean>(false);
  const [showProfileModal, setShowProfileModal] = useState<boolean>(false);

  // Sync to local storage
  useEffect(() => {
    savePlans(plans);
  }, [plans]);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  useEffect(() => {
    saveFlashcards(cards);
  }, [cards]);

  useEffect(() => {
    saveQuizzes(quizzes);
  }, [quizzes]);

  useEffect(() => {
    saveStats(stats);
  }, [stats]);

  useEffect(() => {
    saveQuestionBank(questionBank);
  }, [questionBank]);

  useEffect(() => {
    saveCoursePreviews(coursePreviews);
  }, [coursePreviews]);

  useEffect(() => {
    saveUserProfile(userProfile);
  }, [userProfile]);

  useEffect(() => {
    saveExamPapers(examPapers);
  }, [examPapers]);

  useEffect(() => {
    saveExamSubmissions(examSubmissions);
  }, [examSubmissions]);

  useEffect(() => {
    saveClassroomLessons(classroomLessons);
  }, [classroomLessons]);

  // Handlers
  const handleSaveToMistakeLog = (item: QuestionBankItem) => {
    setQuestionBank((prev) => [item, ...prev]);
    setActiveTab('qbank');
  };


  // Handlers
  const handleToggleTask = (taskId: string) => {
    setTasks((prevTasks) => {
      const updated = prevTasks.map((t) => {
        if (t.id === taskId) {
          const isNowCompleted = !t.completed;
          return {
            ...t,
            completed: isNowCompleted,
            completedAt: isNowCompleted ? new Date().toISOString() : undefined,
          };
        }
        return t;
      });

      // Update stats
      const newlyCompleted = updated.filter((t) => t.completed).length;
      setStats((prevStats) => ({
        ...prevStats,
        completedTasksCount: newlyCompleted,
      }));

      return updated;
    });
  };

  const handleAddTask = (newTaskData: Omit<StudyTask, 'id'>) => {
    const newTask: StudyTask = {
      ...newTaskData,
      id: `task-custom-${Date.now()}`,
    };

    setTasks((prev) => [newTask, ...prev]);
  };

  const handlePlanGenerated = (newPlan: GeneratedStudyPlan) => {
    setPlans((prev) => [newPlan, ...prev]);

    // Convert newPlan.dailyTasks to StudyTask instances
    const todayStr = new Date().toISOString().split('T')[0];
    const newTasks: StudyTask[] = newPlan.dailyTasks.map((dt, idx) => {
      const dueDateObj = new Date();
      dueDateObj.setDate(dueDateObj.getDate() + (dt.dayOffset || 0));

      return {
        id: `task-gen-${newPlan.id}-${idx}`,
        planId: newPlan.id,
        title: dt.title,
        description: dt.description,
        subject: dt.subject || newPlan.subject,
        category: dt.category || 'general',
        durationMinutes: dt.durationMinutes || 30,
        taskType: dt.taskType || 'concept',
        difficulty: dt.difficulty || 'medium',
        dueDate: dueDateObj.toISOString().split('T')[0],
        completed: false,
        keyPoints: dt.keyPoints || [],
      };
    });

    setTasks((prev) => [...newTasks, ...prev]);

    // Convert newPlan.flashcards to Flashcard instances
    if (newPlan.flashcards && newPlan.flashcards.length > 0) {
      const newFlashcards: Flashcard[] = newPlan.flashcards.map((fc, idx) => ({
        id: `fc-gen-${newPlan.id}-${idx}`,
        deckId: newPlan.id,
        subject: newPlan.subject,
        language: fc.language || newPlan.language || 'zh',
        front: fc.front,
        back: fc.back,
        phonetic: fc.phonetic,
        examples: fc.examples,
        tags: fc.tags || [newPlan.subject],
        intervalDays: 1,
        easeFactor: 2.5,
        repetitions: 0,
        nextReviewDate: todayStr,
        masteryLevel: 20,
      }));

      setCards((prev) => [...newFlashcards, ...prev]);
    }

    // Convert newPlan.quizQuestions
    if (newPlan.quizQuestions && newPlan.quizQuestions.length > 0) {
      const newQuizItems: QuizQuestion[] = newPlan.quizQuestions.map((qq, idx) => ({
        id: `quiz-gen-${newPlan.id}-${idx}`,
        subject: newPlan.subject,
        question: qq.question,
        options: qq.options,
        correctIndex: qq.correctIndex,
        explanation: qq.explanation,
      }));

      setQuizzes((prev) => [...newQuizItems, ...prev]);
    }

    // Update subject progress stats
    setStats((prev) => ({
      ...prev,
      subjectProgress: {
        ...prev.subjectProgress,
        [newPlan.subject]: 35,
      },
    }));

    // Switch to Roadmap view to see newly generated tasks
    setActiveTab('roadmap');
  };

  const handleReviewCard = (cardId: string, rating: 'again' | 'hard' | 'good' | 'easy') => {
    setCards((prev) =>
      prev.map((c) => {
        if (c.id === cardId) {
          return updateCardReview(c, rating);
        }
        return c;
      })
    );

    setStats((prev) => ({
      ...prev,
      reviewedCardsCount: prev.reviewedCardsCount + 1,
    }));
  };

  const handleAddCard = (
    newCardData: Omit<
      Flashcard,
      'id' | 'intervalDays' | 'easeFactor' | 'repetitions' | 'nextReviewDate' | 'masteryLevel'
    >
  ) => {
    const todayStr = new Date().toISOString().split('T')[0];
    const newCard: Flashcard = {
      ...newCardData,
      id: `fc-custom-${Date.now()}`,
      intervalDays: 1,
      easeFactor: 2.5,
      repetitions: 0,
      nextReviewDate: todayStr,
      masteryLevel: 20,
    };

    setCards((prev) => [newCard, ...prev]);
  };

  const handleGenerateCardsFromText = async (subject: string, textContent: string) => {
    try {
      const res = await fetch('/api/generate-cards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject, textContent, count: 4 }),
      });
      const data = await res.json();

      if (data.success && data.cards && data.cards.length > 0) {
        const todayStr = new Date().toISOString().split('T')[0];
        const generated: Flashcard[] = data.cards.map((item: any, idx: number) => ({
          id: `fc-ai-text-${Date.now()}-${idx}`,
          subject,
          language: 'zh',
          front: item.front,
          back: item.back,
          phonetic: item.phonetic,
          examples: item.examples,
          tags: item.tags || [subject],
          intervalDays: 1,
          easeFactor: 2.5,
          repetitions: 0,
          nextReviewDate: todayStr,
          masteryLevel: 20,
        }));

        setCards((prev) => [...generated, ...prev]);
      }
    } catch (err) {
      console.error('Error generating cards from text:', err);
    }
  };

  const handleCompleteQuiz = (scorePercent: number) => {
    setStats((prev) => {
      const newCount = prev.quizzesTakenCount + 1;
      const newAvg = Math.round((prev.averageQuizScore * prev.quizzesTakenCount + scorePercent) / newCount);

      return {
        ...prev,
        quizzesTakenCount: newCount,
        averageQuizScore: newAvg,
      };
    });
  };

  const handleAddStudyMinutes = (minutes: number) => {
    setStats((prev) => ({
      ...prev,
      totalStudyMinutes: prev.totalStudyMinutes + minutes,
    }));
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#F8FAFC] font-sans text-slate-800">
      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        stats={stats}
        onOpenPomodoro={() => setShowPomodoro(true)}
        uiLang={uiLang}
        onChangeLang={setUiLang}
        userProfile={userProfile}
        onOpenProfileModal={() => setShowProfileModal(true)}
      />

      {/* Main View Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        {activeTab === 'roadmap' && (
          <DailyRoadmap
            tasks={tasks}
            onToggleTask={handleToggleTask}
            onAddTask={handleAddTask}
            onExplainConcept={(term) => setActiveConceptTerm(term)}
            onNavigateToGenerator={() => setActiveTab('generator')}
            stats={stats}
            uiLang={uiLang}
            userProfile={userProfile}
            onOpenProfileModal={() => setShowProfileModal(true)}
          />
        )}

        {activeTab === 'classroom' && (
          <ClassroomView
            lessons={classroomLessons}
            uiLang={uiLang}
            userProfile={userProfile}
            onUpdateLessons={setClassroomLessons}
            onAddQuestionToBank={handleSaveToMistakeLog}
            onOpenProfileModal={() => setShowProfileModal(true)}
            onExplainConcept={(term) => setActiveConceptTerm(term)}
          />
        )}

        {activeTab === 'generator' && (
          <PlanGenerator
            onPlanGenerated={handlePlanGenerated}
            existingPlans={plans}
            onSelectExistingPlan={(p) => {
              setActiveTab('roadmap');
            }}
            uiLang={uiLang}
            userProfile={userProfile}
          />
        )}

        {activeTab === 'examcenter' && (
          <ExamCenter
            papers={examPapers}
            submissions={examSubmissions}
            userProfile={userProfile}
            onSavePaper={(paper) => setExamPapers([paper, ...examPapers])}
            onSaveSubmission={(sub) => setExamSubmissions([sub, ...examSubmissions])}
            onAddQuestionToMistakes={handleSaveToMistakeLog}
            uiLang={uiLang}
          />
        )}

        {activeTab === 'userprofile' && (
          <div className="flex-1 bg-slate-900 flex items-center justify-center p-8">
            <UserProfileModal
              isOpen={true}
              onClose={() => setActiveTab('roadmap')}
              userProfile={userProfile}
              onSaveProfile={setUserProfile}
              uiLang={uiLang}
            />
          </div>
        )}

        {activeTab === 'photosolve' && (
          <PhotoSolveView
            uiLang={uiLang}
            onSaveToMistakes={handleSaveToMistakeLog}
            onExplainConcept={(term) => setActiveConceptTerm(term)}
          />
        )}

        {activeTab === 'qbank' && (
          <QuestionBankView
            questions={questionBank}
            uiLang={uiLang}
            userProfile={userProfile}
            onUpdateQuestions={setQuestionBank}
            onExplainConcept={(term) => setActiveConceptTerm(term)}
          />
        )}

        {activeTab === 'preview' && (
          <CoursePreviewView
            previews={coursePreviews}
            uiLang={uiLang}
            userProfile={userProfile}
            onUpdatePreviews={setCoursePreviews}
            onExplainConcept={(term) => setActiveConceptTerm(term)}
          />
        )}

        {activeTab === 'flashcards' && (
          <FlashcardsView
            cards={cards}
            onReviewCard={handleReviewCard}
            onAddCard={handleAddCard}
            onGenerateCardsFromText={handleGenerateCardsFromText}
            uiLang={uiLang}
          />
        )}

        {activeTab === 'quiz' && (
          <QuizView
            quizzes={quizzes}
            onCompleteQuiz={handleCompleteQuiz}
            onExplainConcept={(term) => setActiveConceptTerm(term)}
            uiLang={uiLang}
          />
        )}

        {activeTab === 'analytics' && (
          <AnalyticsView stats={stats} uiLang={uiLang} />
        )}
      </main>

      {/* Concept Deep Dive Modal */}
      {activeConceptTerm && (
        <ConceptModal
          term={activeConceptTerm}
          onClose={() => setActiveConceptTerm(null)}
        />
      )}

      {/* Focus Timer Pomodoro Modal */}
      {showPomodoro && (
        <PomodoroModal
          onClose={() => setShowPomodoro(false)}
          onAddStudyMinutes={handleAddStudyMinutes}
        />
      )}

      {/* User Profile Modal */}
      {showProfileModal && (
        <UserProfileModal
          isOpen={showProfileModal}
          onClose={() => setShowProfileModal(false)}
          userProfile={userProfile}
          onSaveProfile={setUserProfile}
          uiLang={uiLang}
        />
      )}
    </div>
  );
}
