import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  Bookmark,
  Sparkles,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Filter,
  Plus,
  Search,
  Check,
  Zap,
  RefreshCw,
  Brain,
  Trash2,
  Layers,
  Award
} from 'lucide-react';
import { QuestionBankItem, QuestionType, UserProfile } from '../types';
import { UILanguage, TRANSLATIONS } from '../utils/translations';
import { matchGradeStrict } from '../utils/gradeMatcher';

interface QuestionBankViewProps {
  questions: QuestionBankItem[];
  uiLang: UILanguage;
  userProfile?: UserProfile;
  onUpdateQuestions: (updatedList: QuestionBankItem[]) => void;
  onExplainConcept: (term: string) => void;
}

export const QuestionBankView: React.FC<QuestionBankViewProps> = ({
  questions,
  uiLang,
  userProfile,
  onUpdateQuestions,
  onExplainConcept,
}) => {
  const t = (key: keyof typeof TRANSLATIONS) => TRANSLATIONS[key][uiLang] || TRANSLATIONS[key].bilingual;

  // View mode tab
  const [activeTab, setActiveTab] = useState<'all' | 'mistakes'>('all');

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStage, setSelectedStage] = useState<string>('all');
  const [selectedGrade, setSelectedGrade] = useState<string>('all');
  const [selectedSemester, setSelectedSemester] = useState<string>('all');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');

  // Interactive Answer States: questionId -> selectedOption / fillAnswer / showSolution
  const [userAnswers, setUserAnswers] = useState<Record<string, number | string>>({});
  const [revealedSolutions, setRevealedSolutions] = useState<Record<string, boolean>>({});

  // AI Generator Modal
  const [showGeneratorModal, setShowGeneratorModal] = useState(false);
  const [genSubject, setGenSubject] = useState('物理');
  const [genGrade, setGenGrade] = useState('高一');
  const [genTopic, setGenTopic] = useState('平抛运动与圆周运动');
  const [genCount, setGenCount] = useState(3);
  const [genDifficulty, setGenDifficulty] = useState('中等');
  const [isGenerating, setIsGenerating] = useState(false);

  // Filtered List
  const filteredQuestions = useMemo(() => {
    return questions.filter((item) => {
      // Tab filter
      if (activeTab === 'mistakes' && !item.isSavedToMistakes) return false;

      // Strict User Profile Grade Filter
      if (!matchGradeStrict(item.gradeLevel, userProfile?.gradeLevel)) return false;

      // Stage filter
      if (selectedStage !== 'all' && item.gradeStage !== selectedStage) return false;

      // Semester filter
      if (selectedSemester !== 'all' && item.semester && item.semester !== selectedSemester) return false;

      // Subject filter
      if (selectedSubject !== 'all' && item.subject !== selectedSubject) return false;

      // Type filter
      if (selectedType !== 'all' && item.questionType !== selectedType) return false;

      // Difficulty filter
      if (selectedDifficulty !== 'all' && item.difficulty !== selectedDifficulty) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const text = `${item.question} ${item.topic} ${item.subject} ${item.explanation}`.toLowerCase();
        if (!text.includes(q)) return false;
      }

      return true;
    });
  }, [
    questions,
    activeTab,
    selectedStage,
    selectedGrade,
    selectedSubject,
    selectedType,
    selectedDifficulty,
    searchQuery,
  ]);

  // Toggle Bookmark / Mistake Log
  const toggleMistakeLog = (id: string) => {
    const updated = questions.map((q) => {
      if (q.id === id) {
        return { ...q, isSavedToMistakes: !q.isSavedToMistakes };
      }
      return q;
    });
    onUpdateQuestions(updated);
  };

  // AI Question Set Generation
  const handleGenerateQuestions = async () => {
    setIsGenerating(true);
    try {
      const res = await fetch('/api/generate-questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject: genSubject,
          gradeLevel: genGrade,
          topic: genTopic,
          count: genCount,
          difficulty: genDifficulty,
        }),
      });

      const data = await res.json();
      if (data.success && data.questions) {
        const newItems: QuestionBankItem[] = data.questions.map((q: any, i: number) => ({
          id: `qb-ai-${Date.now()}-${i}`,
          subject: genSubject,
          gradeStage: genGrade.includes('初') ? '初中' : '高中',
          gradeLevel: genGrade as any,
          topic: genTopic,
          question: q.question,
          options: q.options,
          correctIndex: q.correctIndex,
          explanation: q.explanation,
          questionType: (q.options && q.options.length > 0) ? 'choice' : 'solution',
          difficulty: genDifficulty === '基础' ? 'easy' : genDifficulty === '压轴' ? 'hard' : 'medium',
          keyPoints: q.keyPoints || [genTopic],
          isSavedToMistakes: false,
        }));

        onUpdateQuestions([...newItems, ...questions]);
        setShowGeneratorModal(false);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const mistakesCount = questions.filter((q) => q.isSavedToMistakes).length;

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 pb-16">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 sm:px-8 py-6 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">{t('qbTitle')}</h2>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-100 flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5" />
                K-12 Exam Bank
              </span>
            </div>
            <p className="text-sm text-slate-500 mt-1">
              {t('qbSubtitle')}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowGeneratorModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>{t('aiGenVariantBtn')}</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-8 space-y-6">
        {/* Top View Tabs & Search */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          {/* Main Tabs */}
          <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === 'all'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Layers className="w-4 h-4 text-blue-600" />
              <span>{t('allQuestionBankTab')} ({questions.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('mistakes')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === 'mistakes'
                  ? 'bg-white text-amber-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Bookmark className="w-4 h-4 text-amber-500 fill-amber-500/20" />
              <span>{t('mistakesTab')} ({mistakesCount})</span>
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('searchPlaceholder')}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
        </div>

        {/* Filters Bar */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wider">
            <Filter className="w-3.5 h-3.5 text-blue-600" />
            <span>{uiLang === 'en' ? 'Multidimensional Filters' : '精细多维筛选'}</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {/* Stage */}
            <div>
              <label className="text-[11px] font-bold text-slate-400 block mb-1">{t('stageFilter')}</label>
              <select
                value={selectedStage}
                onChange={(e) => setSelectedStage(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-800 font-medium"
              >
                <option value="all">{uiLang === 'en' ? 'All Stages' : '全部学段'}</option>
                <option value="初中">{uiLang === 'en' ? 'Middle School' : '初中 (中考)'}</option>
                <option value="高中">{uiLang === 'en' ? 'High School' : '高中 (高考)'}</option>
              </select>
            </div>

            {/* Grade */}
            <div>
              <label className="text-[11px] font-bold text-slate-400 block mb-1">{t('gradeFilter')}</label>
              <select
                value={selectedGrade}
                onChange={(e) => setSelectedGrade(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-800 font-medium"
              >
                <option value="all">{uiLang === 'en' ? 'All Grades' : '全部年级'}</option>
                <option value="初一">{uiLang === 'en' ? 'Grade 7' : '初一'}</option>
                <option value="初二">{uiLang === 'en' ? 'Grade 8' : '初二'}</option>
                <option value="初三/中考">{uiLang === 'en' ? 'Grade 9 / Senior Exam' : '初三 / 中考'}</option>
                <option value="高一">{uiLang === 'en' ? 'Grade 10' : '高一'}</option>
                <option value="高二">{uiLang === 'en' ? 'Grade 11' : '高二'}</option>
                <option value="高三/高考">{uiLang === 'en' ? 'Grade 12 / College Entrance' : '高三 / 高考'}</option>
              </select>
            </div>

            {/* Semester */}
            <div>
              <label className="text-[11px] font-bold text-slate-400 block mb-1">{t('semesterFilter')}</label>
              <select
                value={selectedSemester}
                onChange={(e) => setSelectedSemester(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-800 font-medium"
              >
                <option value="all">{uiLang === 'en' ? 'All Semesters' : '全部学期'}</option>
                <option value="上学期">{uiLang === 'en' ? '1st Semester (Fall)' : '上学期 (秋季)'}</option>
                <option value="下学期">{uiLang === 'en' ? '2nd Semester (Spring)' : '下学期 (春季)'}</option>
              </select>
            </div>

            {/* Subject */}
            <div>
              <label className="text-[11px] font-bold text-slate-400 block mb-1">{t('subjectFilter')}</label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-800 font-medium"
              >
                <option value="all">{uiLang === 'en' ? 'All Subjects' : '全部学科'}</option>
                <option value="数学">{uiLang === 'en' ? 'Math' : '数学'}</option>
                <option value="物理">{uiLang === 'en' ? 'Physics' : '物理'}</option>
                <option value="化学">{uiLang === 'en' ? 'Chemistry' : '化学'}</option>
                <option value="生物">{uiLang === 'en' ? 'Biology' : '生物'}</option>
                <option value="英语">{uiLang === 'en' ? 'English' : '英语'}</option>
                <option value="语文">{uiLang === 'en' ? 'Chinese' : '语文'}</option>
              </select>
            </div>

            {/* Type */}
            <div>
              <label className="text-[11px] font-bold text-slate-400 block mb-1">{t('typeFilter')}</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-800 font-medium"
              >
                <option value="all">{uiLang === 'en' ? 'All Types' : '全部题型'}</option>
                <option value="choice">{t('choiceType')}</option>
                <option value="fill">{t('fillType')}</option>
                <option value="solution">{t('solutionType')}</option>
              </select>
            </div>

            {/* Difficulty */}
            <div>
              <label className="text-[11px] font-bold text-slate-400 block mb-1">{t('difficultyFilter')}</label>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-800 font-medium"
              >
                <option value="all">{uiLang === 'en' ? 'All Difficulties' : '全部难度'}</option>
                <option value="easy">{uiLang === 'en' ? 'Foundation (Easy)' : '基础巩固 (Easy)'}</option>
                <option value="medium">{uiLang === 'en' ? 'Intermediate (Medium)' : '进阶中等 (Medium)'}</option>
                <option value="hard">{uiLang === 'en' ? 'Challenging (Hard)' : '压轴拔高 (Hard)'}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Question Cards List */}
        {filteredQuestions.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <BookOpen className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-800">暂无符合筛选条件的题目</h3>
              <p className="text-xs text-slate-400 mt-1">请尝试切换或清除筛选条件，或使用上方“AI 智能生成变式考题”。</p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredQuestions.map((item, index) => {
              const selectedOpt = userAnswers[item.id];
              const isSolutionRevealed = revealedSolutions[item.id];

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:border-blue-200 transition-all space-y-4"
                >
                  {/* Item Header Tags */}
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-bold">
                        #{index + 1}
                      </span>
                      <span className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-bold border border-blue-100">
                        {item.subject} · {item.gradeLevel}
                      </span>
                      <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-medium">
                        {item.topic}
                      </span>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                          item.difficulty === 'easy'
                            ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                            : item.difficulty === 'hard'
                            ? 'bg-rose-50 text-rose-600 border border-rose-100'
                            : 'bg-amber-50 text-amber-600 border border-amber-100'
                        }`}
                      >
                        {item.difficulty === 'easy' ? '基础' : item.difficulty === 'hard' ? '压轴' : '中等'}
                      </span>
                    </div>

                    <button
                      onClick={() => toggleMistakeLog(item.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                        item.isSavedToMistakes
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                      }`}
                    >
                      <Bookmark
                        className={`w-3.5 h-3.5 ${
                          item.isSavedToMistakes ? 'fill-amber-500 text-amber-500' : ''
                        }`}
                      />
                      <span>{item.isSavedToMistakes ? '已在错题本' : '移入错题本'}</span>
                    </button>
                  </div>

                  {/* Question Prompt */}
                  <div className="space-y-2">
                    <p className="text-sm sm:text-base font-bold text-slate-900 leading-relaxed">
                      {item.question}
                    </p>
                  </div>

                  {/* Multiple Choice Options */}
                  {item.questionType === 'choice' && item.options && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      {item.options.map((opt, optIdx) => {
                        const isSelected = selectedOpt === optIdx;
                        const isCorrect = optIdx === item.correctIndex;
                        const hasAnswered = selectedOpt !== undefined;

                        let style = 'bg-slate-50 border-slate-200 hover:border-blue-400 text-slate-800';
                        if (hasAnswered) {
                          if (isCorrect) {
                            style = 'bg-emerald-50 border-emerald-300 text-emerald-900 font-bold';
                          } else if (isSelected && !isCorrect) {
                            style = 'bg-rose-50 border-rose-300 text-rose-900 font-bold';
                          } else {
                            style = 'bg-slate-50 border-slate-200 opacity-60 text-slate-500';
                          }
                        }

                        return (
                          <button
                            key={optIdx}
                            onClick={() => {
                              setUserAnswers({ ...userAnswers, [item.id]: optIdx });
                              setRevealedSolutions({ ...revealedSolutions, [item.id]: true });
                            }}
                            className={`p-3.5 rounded-xl border text-xs sm:text-sm text-left transition-all flex items-center justify-between gap-3 ${style}`}
                          >
                            <span>{opt}</span>
                            {hasAnswered && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                            {hasAnswered && isSelected && !isCorrect && (
                              <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Fill or Solution Toggle Button */}
                  {item.questionType !== 'choice' && (
                    <div className="pt-2">
                      <button
                        onClick={() =>
                          setRevealedSolutions({
                            ...revealedSolutions,
                            [item.id]: !revealedSolutions[item.id],
                          })
                        }
                        className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5"
                      >
                        <Zap className="w-3.5 h-3.5 text-blue-600" />
                        <span>{isSolutionRevealed ? '收起标准答案与解题推导' : '展开标准答案与推导过程'}</span>
                      </button>
                    </div>
                  )}

                  {/* Detailed Explanation & Key points when revealed */}
                  {(isSolutionRevealed || userAnswers[item.id] !== undefined) && (
                    <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3 text-xs sm:text-sm animate-in fade-in duration-200">
                      {item.correctAnswerText && (
                        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 font-bold">
                          标准答案：{item.correctAnswerText}
                        </div>
                      )}

                      <div>
                        <span className="font-bold text-slate-900 block mb-1 text-xs uppercase tracking-wider">
                          详细名师推导解析：
                        </span>
                        <p className="text-slate-700 leading-relaxed whitespace-pre-wrap font-sans">
                          {item.explanation}
                        </p>
                      </div>

                      {item.keyPoints && item.keyPoints.length > 0 && (
                        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-200/80">
                          <span className="text-[11px] font-bold text-slate-400">核心知识点：</span>
                          {item.keyPoints.map((kp, kIdx) => (
                            <button
                              key={kIdx}
                              onClick={() => onExplainConcept(kp)}
                              className="px-2.5 py-0.5 bg-white border border-slate-200 rounded-md text-xs font-medium text-slate-700 hover:border-blue-400 transition-all flex items-center gap-1"
                            >
                              <span>{kp}</span>
                              <HelpCircle className="w-3 h-3 text-blue-500" />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* AI Question Generator Modal */}
      {showGeneratorModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-lg p-6 space-y-5 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-slate-900">AI 智能生成变式考题</h3>
              </div>
              <button
                onClick={() => setShowGeneratorModal(false)}
                className="text-slate-400 hover:text-slate-600 text-xs font-bold p-1 rounded-lg"
              >
                关闭
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">选择学科</label>
                <select
                  value={genSubject}
                  onChange={(e) => setGenSubject(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800"
                >
                  <option value="物理">物理</option>
                  <option value="数学">数学</option>
                  <option value="化学">化学</option>
                  <option value="生物">生物</option>
                  <option value="英语">英语</option>
                  <option value="语文">语文</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">学段 / 年级</label>
                <select
                  value={genGrade}
                  onChange={(e) => setGenGrade(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800"
                >
                  <option value="初二">初二</option>
                  <option value="初三/中考">初三 / 中考</option>
                  <option value="高一">高一</option>
                  <option value="高二">高二</option>
                  <option value="高三/高考">高三 / 高考</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">知识章节 / 核心考点</label>
                <input
                  type="text"
                  value={genTopic}
                  onChange={(e) => setGenTopic(e.target.value)}
                  placeholder="如：勾股定理与辅助线、动量守恒、氧化还原反应"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">生成题数</label>
                  <select
                    value={genCount}
                    onChange={(e) => setGenCount(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800"
                  >
                    <option value={2}>2 道</option>
                    <option value={3}>3 道</option>
                    <option value={5}>5 道</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">难度等级</label>
                  <select
                    value={genDifficulty}
                    onChange={(e) => setGenDifficulty(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800"
                  >
                    <option value="基础">基础巩固</option>
                    <option value="中等">中等进阶</option>
                    <option value="压轴">压轴拔高</option>
                  </select>
                </div>
              </div>
            </div>

            <button
              onClick={handleGenerateQuestions}
              disabled={isGenerating || !genTopic.trim()}
              className={`w-full py-3 rounded-xl text-xs font-bold text-white shadow-md transition-all flex items-center justify-center gap-2 ${
                isGenerating || !genTopic.trim()
                  ? 'bg-slate-300 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>AI 正在生成精准考题...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>立即生成并加入题库</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
