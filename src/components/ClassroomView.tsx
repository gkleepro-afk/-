import React, { useState, useEffect, useRef } from 'react';
import {
  GraduationCap,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Square,
  Sparkles,
  HelpCircle,
  CheckCircle2,
  XCircle,
  MessageSquare,
  RefreshCw,
  Award,
  BookOpen,
  ArrowRight,
  Send,
  Lightbulb,
  Plus,
  BookMarked,
  Settings,
  Flame,
  Check,
  Radio,
  Sliders
} from 'lucide-react';
import { ClassroomLesson, UserProfile, QuestionBankItem } from '../types';
import { UILanguage, TRANSLATIONS } from '../utils/translations';
import { matchGradeStrict } from '../utils/gradeMatcher';

interface ClassroomViewProps {
  lessons: ClassroomLesson[];
  uiLang: UILanguage;
  userProfile?: UserProfile;
  onUpdateLessons: (updated: ClassroomLesson[]) => void;
  onAddQuestionToBank?: (item: QuestionBankItem) => void;
  onOpenProfileModal?: () => void;
  onExplainConcept?: (term: string) => void;
}

// Sanitizes formula notation, math symbols, and markdown for natural speech synthesis
const cleanTextForSpeech = (text: string): string => {
  if (!text) return '';
  return text
    .replace(/\*\*/g, '')
    .replace(/#/g, '')
    .replace(/`/g, '')
    .replace(/m\/s²/gi, '米每二次方秒')
    .replace(/m\/s/gi, '米每秒')
    .replace(/kg\*m\/s/gi, '千克米每秒')
    .replace(/\^2/g, '的平方')
    .replace(/\^3/g, '的立方')
    .replace(/->|→/g, '反应生成')
    .replace(/θ/g, '西塔')
    .replace(/α/g, '阿尔法')
    .replace(/β/g, '贝塔')
    .replace(/Δ/g, '德尔塔')
    .replace(/=/g, '等于')
    .replace(/\+/g, '加')
    .replace(/×/g, '乘以')
    .replace(/÷/g, '除以')
    .replace(/\(/g, '，')
    .replace(/\)/g, '，')
    .trim();
};

export const ClassroomView: React.FC<ClassroomViewProps> = ({
  lessons,
  uiLang,
  userProfile,
  onUpdateLessons,
  onAddQuestionToBank,
  onOpenProfileModal,
  onExplainConcept,
}) => {
  const t = (key: keyof typeof TRANSLATIONS) => TRANSLATIONS[key][uiLang] || TRANSLATIONS[key].bilingual;

  const currentGrade = userProfile?.gradeLevel || '高一';
  const currentSemester = userProfile?.semester || '上学期';
  const currentRegion = userProfile?.countryRegion || '中国大陆';
  const currentSystem = userProfile?.educationSystem || '人教版';

  // Selected Lesson
  const [selectedLessonId, setSelectedLessonId] = useState<string>(
    lessons[0]?.id || ''
  );

  // Filter option: 'matched' or 'all'
  const [filterMode, setFilterMode] = useState<'matched' | 'all'>('matched');

  // Comprehension state: 'unasked' | 'understood' | 'needs_simplification' | 'asked_question'
  const [understandingStatus, setUnderstandingStatus] = useState<
    'unasked' | 'understood' | 'needs_simplification' | 'asked_question'
  >('unasked');

  // Teacher Q&A state
  const [studentQuestion, setStudentQuestion] = useState('');
  const [teacherAnswer, setTeacherAnswer] = useState('');
  const [isAskingTeacher, setIsAskingTeacher] = useState(false);

  // Homework Answers: questionIdx -> selectedOption
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [submittedQuiz, setSubmittedQuiz] = useState(false);
  const [savedQuestions, setSavedQuestions] = useState<Record<number, boolean>>({});

  // Audio Speech Synthesis state
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [speechRate, setSpeechRate] = useState<number>(1.0);
  const [speechPitch, setSpeechPitch] = useState<number>(1.0);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoiceURI, setSelectedVoiceURI] = useState<string>('');
  const [activeSectionIdx, setActiveSectionIdx] = useState<number | null>(null);

  // Queue ref for section-by-section lecture playback
  const speechQueueRef = useRef<Array<{ text: string; sectionIdx: number }>>([]);
  const sectionRefs = useRef<Record<number, HTMLDivElement | null>>({});

  // AI Generator Modal
  const [showGenModal, setShowGenModal] = useState(false);
  const [genSubject, setGenSubject] = useState('物理');
  const [genTopic, setGenTopic] = useState('牛顿第二定律综合应用');
  const [isGenerating, setIsGenerating] = useState(false);

  // Filter lessons strictly by user profile grade
  const filteredLessons = lessons.filter((l) =>
    matchGradeStrict(l.gradeLevel, currentGrade)
  );

  const activeLesson =
    filteredLessons.find((l) => l.id === selectedLessonId) ||
    filteredLessons[0] ||
    null;

  // Speech Synthesis Voices Setup
  useEffect(() => {
    const updateVoices = () => {
      if ('speechSynthesis' in window) {
        const voices = window.speechSynthesis.getVoices();
        const zhVoices = voices.filter(
          (v) => v.lang.startsWith('zh') || v.lang.startsWith('cn')
        );
        setAvailableVoices(zhVoices.length > 0 ? zhVoices : voices);
        if (zhVoices.length > 0 && !selectedVoiceURI) {
          setSelectedVoiceURI(zhVoices[0].voiceURI);
        }
      }
    };

    updateVoices();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = updateVoices;
    }

    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Play next item in speech queue
  const playNextInQueue = () => {
    if (!('speechSynthesis' in window) || speechQueueRef.current.length === 0) {
      setIsSpeaking(false);
      setIsPaused(false);
      setActiveSectionIdx(null);
      return;
    }

    const currentItem = speechQueueRef.current.shift();
    if (!currentItem) {
      setIsSpeaking(false);
      setIsPaused(false);
      setActiveSectionIdx(null);
      return;
    }

    setActiveSectionIdx(currentItem.sectionIdx);

    // Scroll to section smoothly if valid
    if (currentItem.sectionIdx >= 0 && sectionRefs.current[currentItem.sectionIdx]) {
      sectionRefs.current[currentItem.sectionIdx]?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }

    const utterance = new SpeechSynthesisUtterance(cleanTextForSpeech(currentItem.text));
    utterance.lang = uiLang === 'en' ? 'en-US' : 'zh-CN';
    utterance.rate = speechRate;
    utterance.pitch = speechPitch;

    if (selectedVoiceURI) {
      const matchedVoice = availableVoices.find((v) => v.voiceURI === selectedVoiceURI);
      if (matchedVoice) utterance.voice = matchedVoice;
    }

    utterance.onend = () => {
      if (speechQueueRef.current.length > 0) {
        // Small natural pause between lecture sections
        setTimeout(() => {
          playNextInQueue();
        }, 600);
      } else {
        setIsSpeaking(false);
        setIsPaused(false);
        setActiveSectionIdx(null);
      }
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
      setIsPaused(false);
      setActiveSectionIdx(null);
    };

    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
    setIsPaused(false);
  };

  // Start Full Speech (Sequential Sections)
  const handleStartSpeech = () => {
    if (!('speechSynthesis' in window) || !activeLesson) return;

    window.speechSynthesis.cancel();

    // Build speech queue
    const queue: Array<{ text: string; sectionIdx: number }> = [
      {
        text: `同学们好！我是${activeLesson.teacherName}。今天为您讲授的是高分考点《${activeLesson.lectureTitle}》。`,
        sectionIdx: -1,
      },
      ...activeLesson.lectureSections.map((sec, idx) => ({
        text: `${sec.sectionTitle}。${sec.content}。核心结论与记忆口诀：${sec.keyTakeaway}`,
        sectionIdx: idx,
      })),
      {
        text: activeLesson.checkQuestionPrompt || `同学们，以上核心考点你听懂了吗？`,
        sectionIdx: -2,
      },
    ];

    speechQueueRef.current = queue;
    playNextInQueue();
  };

  // Speak single text snippet (e.g. single section or teacher answer)
  const handleSpeakSnippet = (text: string, sectionIdx: number) => {
    if (!('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();
    speechQueueRef.current = [{ text, sectionIdx }];
    playNextInQueue();
  };

  const handlePauseSpeech = () => {
    if ('speechSynthesis' in window) {
      if (isSpeaking && !isPaused) {
        window.speechSynthesis.pause();
        setIsPaused(true);
      } else if (isSpeaking && isPaused) {
        window.speechSynthesis.resume();
        setIsPaused(false);
      }
    }
  };

  const handleStopSpeech = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      speechQueueRef.current = [];
      setIsSpeaking(false);
      setIsPaused(false);
      setActiveSectionIdx(null);
    }
  };

  // Ask Teacher Submission
  const handleAskTeacher = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentQuestion.trim() || !activeLesson) return;

    setIsAskingTeacher(true);
    setTeacherAnswer('');

    try {
      const res = await fetch('/api/ask-teacher', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lessonTopic: activeLesson.lectureTitle,
          studentQuestion: studentQuestion.trim(),
          gradeLevel: currentGrade,
          semester: currentSemester,
        }),
      });

      const data = await res.json();
      if (data.success && data.teacherAnswer) {
        setTeacherAnswer(data.teacherAnswer);
        setUnderstandingStatus('asked_question');
        // Auto-speak teacher answer
        handleSpeakSnippet(`老师解答如下：${data.teacherAnswer}`, -3);
      }
    } catch (err) {
      console.error(err);
      setTeacherAnswer('老师收到了你的问题。重难点在于结合受力分析与运动学公式，再多思考一下哦！');
    } finally {
      setIsAskingTeacher(false);
    }
  };

  // AI Generate Lesson Submit
  const handleGenerateLesson = async () => {
    if (!genTopic.trim()) return;
    setIsGenerating(true);

    try {
      const res = await fetch('/api/generate-classroom-lesson', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject: genSubject,
          topic: genTopic.trim(),
          gradeLevel: currentGrade,
          semester: currentSemester,
          countryRegion: currentRegion,
          educationSystem: currentSystem,
        }),
      });

      const data = await res.json();
      if (data.success && data.lesson) {
        const newLesson: ClassroomLesson = {
          ...data.lesson,
          id: `classroom-ai-${Date.now()}`,
        };

        const updated = [newLesson, ...lessons];
        onUpdateLessons(updated);
        setSelectedLessonId(newLesson.id);
        setShowGenModal(false);
        setUnderstandingStatus('unasked');
        setUserAnswers({});
        setSubmittedQuiz(false);
        handleStopSpeech();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  // Save Homework Question to Mistakes
  const handleSaveToMistakes = (qIdx: number, item: QuestionBankItem) => {
    if (onAddQuestionToBank) {
      onAddQuestionToBank({
        ...item,
        id: `qb-lesson-${Date.now()}-${qIdx}`,
        gradeLevel: currentGrade,
        semester: currentSemester,
        isSavedToMistakes: true,
      });
      setSavedQuestions((prev) => ({ ...prev, [qIdx]: true }));
    }
  };

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 pb-20">
      {/* Header Banner */}
      <header className="bg-white border-b border-slate-200 px-6 sm:px-8 py-6 sticky top-0 z-10 shadow-2xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <GraduationCap className="w-7 h-7 text-blue-600" />
                {t('classroomTitle')}
              </h2>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-100 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                Interactive Classroom Speech
              </span>
            </div>
            <p className="text-sm text-slate-500 mt-1">
              {t('classroomSubtitle')}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowGenModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>{t('customClassroomBtn')}</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-6 space-y-6">
        {/* Strict Grade & Region Match Notification Bar */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-5 rounded-2xl shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-blue-800/50">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <p className="text-xs font-semibold text-blue-200 uppercase tracking-wider">
                {t('gradeLockBanner')}
              </p>
              <p className="text-sm font-bold text-white mt-0.5">
                {uiLang === 'en'
                  ? `Syllabus: 【${currentGrade} · ${currentSemester}】· ${currentRegion} (${currentSystem})`
                  : `当前考纲：【${currentGrade} · ${currentSemester}】· ${currentRegion} (${currentSystem})`}
              </p>
              <p className="text-[11px] text-slate-300 mt-0.5">
                {t('gradeLockDesc')}
              </p>
            </div>
          </div>

          <button
            onClick={onOpenProfileModal}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-lg border border-white/20 transition shrink-0 cursor-pointer"
          >
            <Settings className="w-3.5 h-3.5" />
            <span>{t('adjustGradeBtn')}</span>
          </button>
        </div>

        {/* Lesson Navigation & Filter */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-blue-600" />
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                {t('lessonListTitle')}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold rounded-lg flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>全屏年级锁：仅呈现【{currentGrade}】讲堂 ({filteredLessons.length} 门)</span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-none">
            {filteredLessons.length > 0 ? (
              filteredLessons.map((l) => {
                const isActive = l.id === activeLesson?.id;
                return (
                  <button
                    key={l.id}
                    onClick={() => {
                      setSelectedLessonId(l.id);
                      setUnderstandingStatus('unasked');
                      setUserAnswers({});
                      setSubmittedQuiz(false);
                      handleStopSpeech();
                    }}
                    className={`px-4 py-3 rounded-xl text-xs font-bold transition-all shrink-0 text-left border ${
                      isActive
                        ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    <p className="line-clamp-1">{l.lectureTitle}</p>
                    <span
                      className={`text-[10px] block mt-1 ${
                        isActive ? 'text-blue-100' : 'text-slate-400'
                      }`}
                    >
                      {l.subject} · {l.gradeLevel} · {l.teacherName}
                    </span>
                  </button>
                );
              })
            ) : (
              <div className="text-center py-4 text-xs text-slate-400 w-full flex items-center justify-center gap-2">
                <span>暂无完全符合【{currentGrade}】的预设讲堂，可以点击右上角使用 AI 自动生成！</span>
                <button
                  onClick={() => setShowGenModal(true)}
                  className="text-blue-600 font-bold underline"
                >
                  本地生成
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Active Lesson View */}
        {activeLesson && (
          <div className="space-y-6">
            {/* Phase 1: Teacher Lecture Card */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
              {/* Lecture Top Bar */}
              <div className="bg-slate-900 text-white p-6 sm:p-8 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-lg text-xs font-bold border border-blue-500/30">
                      {activeLesson.subject}
                    </span>
                    <span className="px-3 py-1 bg-slate-800 text-slate-300 rounded-lg text-xs font-medium border border-slate-700">
                      {activeLesson.gradeLevel} · {activeLesson.semester || '上学期'}
                    </span>
                    <span className="px-3 py-1 bg-amber-500/20 text-amber-300 rounded-lg text-xs font-bold border border-amber-500/30">
                      👨‍🏫 {activeLesson.teacherName}
                    </span>
                  </div>

                  {/* Speech Audio Controls Toolbar */}
                  <div className="flex flex-wrap items-center gap-2 bg-slate-800/90 p-2 rounded-xl border border-slate-700">
                    <span className="text-[11px] text-slate-300 font-bold px-2 flex items-center gap-1.5">
                      <Volume2 className="w-4 h-4 text-blue-400" />
                      名师原声授课 (TTS)
                    </span>

                    {!isSpeaking ? (
                      <button
                        onClick={handleStartSpeech}
                        className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 transition cursor-pointer shadow-xs"
                      >
                        <Play className="w-3.5 h-3.5 fill-white" />
                        <span>播放完整讲堂</span>
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={handlePauseSpeech}
                          className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold rounded-lg flex items-center gap-1 transition cursor-pointer"
                        >
                          {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
                          <span>{isPaused ? '继续' : '暂停'}</span>
                        </button>

                        <button
                          onClick={handleStopSpeech}
                          className="px-3 py-1.5 bg-red-600/80 hover:bg-red-600 text-white text-xs font-bold rounded-lg flex items-center gap-1 transition cursor-pointer"
                        >
                          <Square className="w-3.5 h-3.5 fill-white" />
                          <span>停止</span>
                        </button>
                      </>
                    )}

                    {/* Speech Voice Select */}
                    {availableVoices.length > 0 && (
                      <select
                        value={selectedVoiceURI}
                        onChange={(e) => setSelectedVoiceURI(e.target.value)}
                        className="bg-slate-900 border border-slate-700 text-slate-300 rounded-lg px-2 py-1 text-[11px] font-bold focus:outline-none max-w-[130px] truncate"
                        title="选择讲课发音人"
                      >
                        {availableVoices.map((v) => (
                          <option key={v.voiceURI} value={v.voiceURI}>
                            {v.name}
                          </option>
                        ))}
                      </select>
                    )}

                    {/* Rate Select */}
                    <select
                      value={speechRate}
                      onChange={(e) => setSpeechRate(Number(e.target.value))}
                      className="bg-slate-900 border border-slate-700 text-slate-300 rounded-lg px-2 py-1 text-[11px] font-bold focus:outline-none"
                    >
                      <option value={0.8}>0.8x 语速</option>
                      <option value={1.0}>1.0x 标准</option>
                      <option value={1.25}>1.25x 快速</option>
                      <option value={1.5}>1.5x 高速</option>
                    </select>

                    {/* Pitch Select */}
                    <select
                      value={speechPitch}
                      onChange={(e) => setSpeechPitch(Number(e.target.value))}
                      className="bg-slate-900 border border-slate-700 text-slate-300 rounded-lg px-2 py-1 text-[11px] font-bold focus:outline-none"
                    >
                      <option value={0.9}>沉稳名师音</option>
                      <option value={1.0}>标准教案音</option>
                      <option value={1.15}>生动高亢音</option>
                    </select>
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-3">
                  {activeLesson.lectureTitle}
                </h3>

                {isSpeaking && (
                  <div className="flex items-center justify-between text-xs text-blue-300 font-medium bg-blue-950/80 p-3 rounded-xl border border-blue-800/80 animate-in fade-in duration-150">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-ping" />
                      <span>
                        {activeSectionIdx === -1
                          ? '🎙️ 名师开场问候与课题引入中...'
                          : activeSectionIdx !== null && activeSectionIdx >= 0
                          ? `🎙️ 名师正在精讲第 ${activeSectionIdx + 1} 节，请结合屏幕文本听讲...`
                          : '🎙️ 正在进行课堂互动问询讲解...'}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-[10px] text-blue-200">
                      <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                      <span>原声分段播放中</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Lecture Sections Content */}
              <div className="p-6 sm:p-8 space-y-8">
                {activeLesson.lectureSections.map((sec, idx) => {
                  const isCurrentSpeaking = activeSectionIdx === idx;

                  return (
                    <div
                      key={idx}
                      ref={(el) => (sectionRefs.current[idx] = el)}
                      className={`space-y-3 p-5 rounded-2xl transition-all duration-300 border ${
                        isCurrentSpeaking
                          ? 'bg-blue-50/70 border-blue-400 shadow-md ring-2 ring-blue-400/50 scale-[1.01]'
                          : 'bg-white border-slate-100 hover:border-slate-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <span
                            className={`w-7 h-7 rounded-xl font-bold text-xs flex items-center justify-center shrink-0 border ${
                              isCurrentSpeaking
                                ? 'bg-blue-600 text-white border-blue-600'
                                : 'bg-blue-50 text-blue-600 border-blue-100'
                            }`}
                          >
                            {idx + 1}
                          </span>
                          <h4 className="text-base font-bold text-slate-900">
                            {sec.sectionTitle}
                          </h4>
                        </div>

                        <div className="flex items-center gap-2">
                          {isCurrentSpeaking && (
                            <span className="text-[11px] font-bold text-blue-700 bg-blue-100 px-2.5 py-0.5 rounded-full border border-blue-200 flex items-center gap-1 animate-pulse">
                              <Volume2 className="w-3.5 h-3.5" />
                              正在讲授此段
                            </span>
                          )}

                          <button
                            onClick={() =>
                              handleSpeakSnippet(
                                `${sec.sectionTitle}。${sec.content}。核心结论：${sec.keyTakeaway}`,
                                idx
                              )
                            }
                            className="text-xs font-bold text-slate-600 hover:text-blue-600 bg-slate-100 hover:bg-blue-50 px-3 py-1.5 rounded-lg border border-slate-200 transition flex items-center gap-1 cursor-pointer"
                            title="单独播放本段讲课"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                            <span>朗读本段</span>
                          </button>
                        </div>
                      </div>

                      <div className="text-slate-700 text-sm leading-relaxed whitespace-pre-line pl-1 sm:pl-9">
                        {sec.content}
                      </div>

                      <div className="sm:ml-9 bg-amber-50 border border-amber-200/80 rounded-xl p-3.5 flex items-start gap-3">
                        <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <div>
                          <span className="text-xs font-bold text-amber-800 uppercase tracking-wider block">
                            核心结论 / 记忆秘籍：
                          </span>
                          <p className="text-xs text-amber-900 font-medium mt-0.5">
                            {sec.keyTakeaway}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Phase 2: Comprehension Checkpoint (导师听懂问询与互动) */}
            <div className="bg-gradient-to-r from-indigo-50 via-blue-50 to-slate-50 border border-blue-200/80 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xs">
              <div className="flex items-start justify-between gap-3.5">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold text-lg shrink-0 shadow-sm">
                    👨‍🏫
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-blue-600 bg-blue-100/80 px-2.5 py-0.5 rounded-full">
                        名师互动问询
                      </span>
                      <span className="text-xs text-slate-400">Phase 2 Checkpoint</span>
                    </div>
                    <h4 className="text-base sm:text-lg font-bold text-slate-900 mt-1">
                      {activeLesson.checkQuestionPrompt ||
                        `同学们，上面关于《${activeLesson.topic}》的推导与讲解，你听懂了吗？`}
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      请如实反馈。听懂即可解锁课后练习，若没太懂名师将为你进行更通俗的生动拆解。
                    </p>
                  </div>
                </div>

                <button
                  onClick={() =>
                    handleSpeakSnippet(
                      activeLesson.checkQuestionPrompt ||
                        `同学们，上面关于${activeLesson.topic}的推导与讲解，你听懂了吗？`,
                      -2
                    )
                  }
                  className="px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl border border-slate-200 transition flex items-center gap-1 cursor-pointer shrink-0"
                >
                  <Volume2 className="w-3.5 h-3.5 text-blue-600" />
                  <span>语音问询</span>
                </button>
              </div>

              {/* Response Options */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <button
                  onClick={() => setUnderstandingStatus('understood')}
                  className={`p-4 rounded-xl border font-bold text-xs flex items-center justify-between transition-all cursor-pointer ${
                    understandingStatus === 'understood'
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-emerald-50 hover:border-emerald-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>💡 完全听懂了，去做课后练习！</span>
                  </div>
                </button>

                <button
                  onClick={() => {
                    setUnderstandingStatus('needs_simplification');
                    handleSpeakSnippet(
                      `没太听懂没关系，老师用更通俗的比喻为你拆解：${activeLesson.simplifiedExplanation}`,
                      -3
                    );
                  }}
                  className={`p-4 rounded-xl border font-bold text-xs flex items-center justify-between transition-all cursor-pointer ${
                    understandingStatus === 'needs_simplification'
                      ? 'bg-amber-600 text-white border-amber-600 shadow-sm'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-amber-50 hover:border-amber-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-amber-500" />
                    <span>🤔 没太听懂，请用更通俗方式再讲讲</span>
                  </div>
                </button>

                <button
                  onClick={() => setUnderstandingStatus('asked_question')}
                  className={`p-4 rounded-xl border font-bold text-xs flex items-center justify-between transition-all cursor-pointer ${
                    understandingStatus === 'asked_question'
                      ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-blue-50 hover:border-blue-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-blue-500" />
                    <span>❓ 我有具体疑问，想向老师提问</span>
                  </div>
                </button>
              </div>

              {/* Simplified Explanation Box */}
              {understandingStatus === 'needs_simplification' && (
                <div className="bg-amber-50/90 border border-amber-200 rounded-2xl p-5 space-y-3 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
                      <Lightbulb className="w-5 h-5 text-amber-600" />
                      <span>名师通俗生活化比喻与通俗拆解：</span>
                    </div>

                    <button
                      onClick={() =>
                        handleSpeakSnippet(
                          `通俗比喻讲解：${activeLesson.simplifiedExplanation}`,
                          -3
                        )
                      }
                      className="px-3 py-1 bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-bold rounded-lg transition flex items-center gap-1 cursor-pointer"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>朗读通俗拆解</span>
                    </button>
                  </div>

                  <p className="text-xs text-amber-950 leading-relaxed font-medium bg-white/80 p-4 rounded-xl border border-amber-100">
                    {activeLesson.simplifiedExplanation}
                  </p>

                  <div className="flex justify-end">
                    <button
                      onClick={() => setUnderstandingStatus('understood')}
                      className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl transition cursor-pointer"
                    >
                      再次确认：现在听懂了，去过关测试 ➔
                    </button>
                  </div>
                </div>
              )}

              {/* Ask Teacher Chat Field */}
              {(understandingStatus === 'asked_question' || studentQuestion) && (
                <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4 animate-in fade-in duration-200">
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                    <MessageSquare className="w-4 h-4 text-blue-600" />
                    <span>向名师发起在线课堂提问：</span>
                  </div>

                  <form onSubmit={handleAskTeacher} className="flex gap-2">
                    <input
                      type="text"
                      value={studentQuestion}
                      onChange={(e) => setStudentQuestion(e.target.value)}
                      placeholder="例：为什么这里的受力分析不需要考虑滑动摩擦力？"
                      className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 font-medium"
                    />
                    <button
                      type="submit"
                      disabled={isAskingTeacher || !studentQuestion.trim()}
                      className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition cursor-pointer shrink-0"
                    >
                      {isAskingTeacher ? (
                        <RefreshCw className="w-4 h-4 animate-spin" />
                      ) : (
                        <Send className="w-4 h-4" />
                      )}
                      <span>发送提问</span>
                    </button>
                  </form>

                  {teacherAnswer && (
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-blue-900">
                          👨‍🏫 {activeLesson.teacherName} 的解答：
                        </span>

                        <button
                          onClick={() =>
                            handleSpeakSnippet(
                              `老师关于提问的解答：${teacherAnswer}`,
                              -3
                            )
                          }
                          className="px-2.5 py-1 bg-blue-100 hover:bg-blue-200 text-blue-900 text-[11px] font-bold rounded-lg transition flex items-center gap-1 cursor-pointer"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                          <span>朗读回答</span>
                        </button>
                      </div>

                      <p className="text-xs text-slate-800 leading-relaxed font-medium">
                        {teacherAnswer}
                      </p>

                      <div className="flex justify-end pt-2">
                        <button
                          onClick={() => setUnderstandingStatus('understood')}
                          className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] rounded-lg transition"
                        >
                          明白了，开始课后巩固测试 ➔
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Phase 3: Homework & Quiz (课后巩固测试) */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center font-bold">
                    <BookMarked className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      Phase 3: 课后巩固测试题 ({activeLesson.homeworkQuiz?.length || 0} 题)
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      根据讲课要点精心定制，做完即可检验学习成果
                    </p>
                  </div>
                </div>

                {understandingStatus !== 'understood' && (
                  <span className="text-xs text-amber-600 font-bold bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
                    请先在 Phase 2 确认听懂状况
                  </span>
                )}
              </div>

              {activeLesson.homeworkQuiz && activeLesson.homeworkQuiz.length > 0 ? (
                <div className="space-y-6">
                  {activeLesson.homeworkQuiz.map((q, qIdx) => {
                    const selectedOpt = userAnswers[qIdx];
                    const isCorrect = selectedOpt === q.correctIndex;

                    return (
                      <div
                        key={qIdx}
                        className="p-5 rounded-2xl border border-slate-200 bg-slate-50/60 space-y-4"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <h4 className="text-sm font-bold text-slate-900 leading-snug">
                            {qIdx + 1}. {q.question}
                          </h4>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-700 shrink-0">
                            {q.difficulty === 'easy' ? '基础' : q.difficulty === 'hard' ? '拔高' : '中等'}
                          </span>
                        </div>

                        {/* Options */}
                        {q.options && (
                          <div className="space-y-2">
                            {q.options.map((opt, optIdx) => {
                              const isSelected = selectedOpt === optIdx;
                              let btnStyle =
                                'bg-white text-slate-700 border-slate-200 hover:bg-slate-100';

                              if (submittedQuiz) {
                                if (optIdx === q.correctIndex) {
                                  btnStyle = 'bg-emerald-500 text-white border-emerald-600 font-bold';
                                } else if (isSelected && !isCorrect) {
                                  btnStyle = 'bg-red-500 text-white border-red-600 font-bold';
                                }
                              } else if (isSelected) {
                                btnStyle = 'bg-blue-600 text-white border-blue-600 font-bold';
                              }

                              return (
                                <button
                                  key={optIdx}
                                  onClick={() => {
                                    if (!submittedQuiz) {
                                      setUserAnswers((prev) => ({
                                        ...prev,
                                        [qIdx]: optIdx,
                                      }));
                                    }
                                  }}
                                  className={`w-full text-left p-3 rounded-xl border text-xs transition flex items-center justify-between cursor-pointer ${btnStyle}`}
                                >
                                  <span>{opt}</span>
                                  {submittedQuiz && optIdx === q.correctIndex && (
                                    <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        )}

                        {/* Explanation after submission */}
                        {submittedQuiz && (
                          <div className="pt-3 border-t border-slate-200 space-y-2">
                            <div className="flex items-center justify-between">
                              <span
                                className={`text-xs font-bold ${
                                  isCorrect ? 'text-emerald-600' : 'text-red-600'
                                }`}
                              >
                                {isCorrect ? '✅ 回答正确！' : '❌ 答错了，请查看名师解析：'}
                              </span>

                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() =>
                                    handleSpeakSnippet(
                                      `试题解析：${q.explanation}`,
                                      -3
                                    )
                                  }
                                  className="text-[11px] font-bold text-blue-700 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-2.5 py-1 rounded-lg border border-blue-200 transition cursor-pointer flex items-center gap-1"
                                >
                                  <Volume2 className="w-3 h-3" />
                                  <span>朗读解析</span>
                                </button>

                                <button
                                  onClick={() => handleSaveToMistakes(qIdx, q)}
                                  disabled={savedQuestions[qIdx]}
                                  className="text-[11px] font-bold text-amber-700 hover:text-amber-800 bg-amber-50 hover:bg-amber-100 px-2.5 py-1 rounded-lg border border-amber-200 transition cursor-pointer flex items-center gap-1"
                                >
                                  <Plus className="w-3 h-3" />
                                  <span>{savedQuestions[qIdx] ? '已存入错题本' : '存入错题本'}</span>
                                </button>
                              </div>
                            </div>

                            <p className="text-xs text-slate-700 leading-relaxed font-medium bg-white p-3 rounded-xl border border-slate-200">
                              {q.explanation}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}

                  <div className="flex items-center justify-between pt-2">
                    {!submittedQuiz ? (
                      <button
                        onClick={() => setSubmittedQuiz(true)}
                        disabled={Object.keys(userAnswers).length < activeLesson.homeworkQuiz.length}
                        className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-xs transition cursor-pointer"
                      >
                        提交课后作业并查看答案解析
                      </button>
                    ) : (
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-slate-700">
                          得分：
                          {
                            activeLesson.homeworkQuiz.filter(
                              (q, idx) => userAnswers[idx] === q.correctIndex
                            ).length
                          }{' '}
                          / {activeLesson.homeworkQuiz.length} 正确
                        </span>
                        <button
                          onClick={() => {
                            setSubmittedQuiz(false);
                            setUserAnswers({});
                          }}
                          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition"
                        >
                          重新做题
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <p className="text-xs text-slate-400 py-4 text-center">暂无课后练习题。</p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* AI Generator Modal */}
      {showGenModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">AI 定制年级/地区专属讲堂</h3>
                  <p className="text-xs text-slate-500">
                    完全依据【{currentGrade} · {currentSemester}】大纲生成讲教案与习题
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowGenModal(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs font-medium">
              <div>
                <label className="text-slate-700 font-bold block mb-1">学科领域</label>
                <select
                  value={genSubject}
                  onChange={(e) => setGenSubject(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold"
                >
                  <option value="物理">物理 (Physics)</option>
                  <option value="数学">数学 (Mathematics)</option>
                  <option value="化学">化学 (Chemistry)</option>
                  <option value="英语">英语 (English)</option>
                  <option value="语文">语文 (Chinese)</option>
                  <option value="生物">生物 (Biology)</option>
                  <option value="历史">历史 (History)</option>
                </select>
              </div>

              <div>
                <label className="text-slate-700 font-bold block mb-1">
                  讲座主题 / 核心考点课题
                </label>
                <input
                  type="text"
                  value={genTopic}
                  onChange={(e) => setGenTopic(e.target.value)}
                  placeholder="如：牛顿第二定律综合应用 / 导数求最值"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                />
              </div>

              <div className="bg-blue-50 p-3 rounded-xl text-[11px] text-blue-900 space-y-1 border border-blue-100">
                <p className="font-bold">🎯 系统考纲锁已开启：</p>
                <p>• 目标年级：{currentGrade}</p>
                <p>• 目标学期：{currentSemester}</p>
                <p>• 地区/教材：{currentRegion} · {currentSystem}</p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowGenModal(false)}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition"
              >
                取消
              </button>
              <button
                onClick={handleGenerateLesson}
                disabled={isGenerating || !genTopic.trim()}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-xs rounded-xl flex items-center gap-2 transition cursor-pointer"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>AI 名师编写教案中...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>生成名师模拟讲堂</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
