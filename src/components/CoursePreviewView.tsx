import React, { useState, useEffect } from 'react';
import {
  Compass,
  Sparkles,
  BookOpen,
  CheckCircle2,
  HelpCircle,
  Clock,
  Layers,
  Zap,
  RefreshCw,
  Plus,
  MessageSquare,
  ArrowRight,
  FileText,
  Volume2,
  Square,
  Check
} from 'lucide-react';
import { CoursePreviewGuide, UserProfile } from '../types';
import { UILanguage, TRANSLATIONS } from '../utils/translations';
import { matchGradeStrict } from '../utils/gradeMatcher';

interface CoursePreviewViewProps {
  previews: CoursePreviewGuide[];
  uiLang: UILanguage;
  userProfile?: UserProfile;
  onUpdatePreviews: (updated: CoursePreviewGuide[]) => void;
  onExplainConcept: (term: string) => void;
}

export const CoursePreviewView: React.FC<CoursePreviewViewProps> = ({
  previews,
  uiLang,
  userProfile,
  onUpdatePreviews,
  onExplainConcept,
}) => {
  const t = (key: keyof typeof TRANSLATIONS) => TRANSLATIONS[key][uiLang] || TRANSLATIONS[key].bilingual;

  const [selectedPreviewId, setSelectedPreviewId] = useState<string>(
    previews[0]?.id || ''
  );

  const getPreviewText = (zh: string, _en?: string) => zh;

  // Audio Speech state for Preview
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Self-check Quiz Answer state: questionIdx -> selectedOption
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});

  // AI Generator Modal
  const [showGenModal, setShowGenModal] = useState(false);
  const [genTitle, setGenTitle] = useState('人教版高中化学：氧化还原反应与电子转移');
  const [genSubject, setGenSubject] = useState('化学');
  const [genGrade, setGenGrade] = useState(userProfile?.gradeLevel || '高一');
  const [genSemester, setGenSemester] = useState(userProfile?.semester || '上学期');
  const [genPublisher, setGenPublisher] = useState(userProfile?.educationSystem || '人教版');
  const [isGenerating, setIsGenerating] = useState(false);

  // Filter option: 'matched' or 'all'
  const [filterMode, setFilterMode] = useState<'matched' | 'all'>('matched');

  const currentGrade = userProfile?.gradeLevel || '高一';

  // Filter previews strictly by grade level
  const matchedGradePreviews = previews.filter((p) =>
    matchGradeStrict(p.gradeLevel, currentGrade)
  );

  const filteredPreviews = filterMode === 'matched'
    ? (matchedGradePreviews.length > 0 ? matchedGradePreviews : previews)
    : previews;

  const activePreview =
    filteredPreviews.find((p) => p.id === selectedPreviewId) ||
    previews.find((p) => p.id === selectedPreviewId) ||
    filteredPreviews[0] ||
    previews[0] ||
    null;

  // Cleanup speech on unmount
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleSpeakText = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    if (!text) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'zh-CN';
    utterance.rate = 1.0;

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  const handleStopSpeech = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  };

  // AI Generator Submit
  const handleGeneratePreview = async () => {
    if (!genTitle.trim()) return;
    setIsGenerating(true);

    try {
      const res = await fetch('/api/generate-course-preview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chapterTitle: genTitle,
          subject: genSubject,
          gradeLevel: genGrade,
          semester: genSemester,
          publisher: genPublisher,
          countryRegion: userProfile?.countryRegion || '中国大陆',
        }),
      });

      const data = await res.json();
      if (data.success && data.previewGuide) {
        const newGuide: CoursePreviewGuide = {
          id: `preview-ai-${Date.now()}`,
          subject: genSubject,
          gradeLevel: genGrade,
          publisher: genPublisher,
          ...data.previewGuide,
        };

        const updated = [newGuide, ...previews];
        onUpdatePreviews(updated);
        setSelectedPreviewId(newGuide.id);
        setShowGenModal(false);
        setUserAnswers({});
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 pb-16">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 sm:px-8 py-6 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                {uiLang === 'en' ? 'Pre-Class Study Courses' : '初高中学习预习课程'}
              </h2>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center gap-1">
                <Compass className="w-3.5 h-3.5" />
                Pre-Class Syllabus
              </span>
            </div>
            <p className="text-sm text-slate-500 mt-1">
              {uiLang === 'en'
                ? 'High-efficiency 15-min preview: connect prerequisites, grasp core theorems, and prepare quality questions.'
                : '课前 15 分钟高效预习：打通衔接旧知、透视核心公式定理，带着高质量疑问听课。'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowGenModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>{uiLang === 'en' ? 'AI Generate Preview Guide' : 'AI 智能生成新课预习案'}</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-8 space-y-8">
        {/* Course Previews Selector Tabs */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-emerald-600" />
              {uiLang === 'en' ? 'Select Chapter / Lesson' : '选择预习章节 / 课程案'}
            </span>
            <div className="flex items-center gap-2">
              <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs">
                <button
                  type="button"
                  onClick={() => setFilterMode('matched')}
                  className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                    filterMode === 'matched'
                      ? 'bg-white text-emerald-700 shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {uiLang === 'en' ? `Grade: ${currentGrade}` : `【${currentGrade}】(${matchedGradePreviews.length})`}
                </button>
                <button
                  type="button"
                  onClick={() => setFilterMode('all')}
                  className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                    filterMode === 'all'
                      ? 'bg-white text-emerald-700 shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {uiLang === 'en' ? `All (${previews.length})` : `全部预习案 (${previews.length})`}
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
            {filteredPreviews.map((p) => {
              const isActive = p.id === activePreview?.id;
              const pTitle = getPreviewText(p.title, p.titleEn);
              return (
                <button
                  key={p.id}
                  onClick={() => {
                    handleStopSpeech();
                    setSelectedPreviewId(p.id);
                    setUserAnswers({});
                  }}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 text-left border cursor-pointer ${
                    isActive
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                  }`}
                >
                  <p className="line-clamp-1">{pTitle}</p>
                  <span className={`text-[10px] block mt-0.5 ${isActive ? 'text-emerald-100' : 'text-slate-400'}`}>
                    {p.subject} · {p.gradeLevel}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Preview Content */}
        {activePreview && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Overview Banner */}
            <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-2xl shadow-lg relative overflow-hidden space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-lg text-xs font-bold border border-emerald-500/30">
                    {activePreview.subject}
                  </span>
                  <span className="px-3 py-1 bg-slate-800 text-slate-300 rounded-lg text-xs font-medium border border-slate-700">
                    {activePreview.gradeLevel}
                  </span>
                  {activePreview.publisher && (
                    <span className="px-3 py-1 bg-slate-800 text-slate-300 rounded-lg text-xs font-medium border border-slate-700">
                      {activePreview.publisher}
                    </span>
                  )}
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {uiLang === 'en' ? 'Estimated:' : '预习建议时长：'}{activePreview.estimatedTimeMinutes || 20} {uiLang === 'en' ? 'mins' : '分钟'}
                  </span>
                </div>

                {/* Read Overview Audio */}
                <div className="flex items-center gap-2">
                  {!isSpeaking ? (
                    <button
                      onClick={() => {
                        const text = `${activePreview.title}。预习导读：${activePreview.overview}`;
                        handleSpeakText(text);
                      }}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 transition cursor-pointer"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>{uiLang === 'en' ? 'Read Aloud' : '语音导读'}</span>
                    </button>
                  ) : (
                    <button
                      onClick={handleStopSpeech}
                      className="px-3 py-1.5 bg-red-600/90 hover:bg-red-600 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 transition cursor-pointer"
                    >
                      <Square className="w-3.5 h-3.5 fill-white" />
                      <span>{uiLang === 'en' ? 'Stop Audio' : '停止朗读'}</span>
                    </button>
                  )}
                </div>
              </div>

              <div>
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                  {activePreview.title}
                </h1>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-4xl">
                {activePreview.overview}
              </p>
            </div>

            {/* Learning Objectives & Prerequisites Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Objectives */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  {uiLang === 'en' ? 'Core Learning Objectives' : '本节课核心预习目标'}
                </h3>
                <ul className="space-y-3">
                  {activePreview.learningObjectives.map((obj, i) => (
                    <li key={i} className="text-xs sm:text-sm text-slate-700 flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <div className="leading-relaxed">
                        <span>{obj}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Prerequisites */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                  <BookOpen className="w-4 h-4 text-blue-600" />
                  {uiLang === 'en' ? 'Prerequisite Knowledge Recall' : '课前温故衔接（知识唤醒）'}
                </h3>
                <ul className="space-y-3">
                  {activePreview.prerequisites.map((pre, i) => (
                    <li key={i} className="text-xs sm:text-sm text-slate-700 flex items-start gap-2">
                      <span className="text-blue-500 font-bold mt-0.5">•</span>
                      <div className="leading-relaxed">
                        <span>{pre}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Core Definitions & Formulas */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                <Zap className="w-4 h-4 text-amber-500" />
                {uiLang === 'en' ? 'Core Concepts & Formula Breakdown' : '课本核心概念与公式剖析'}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activePreview.coreDefinitions.map((def, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        {def.name}
                      </h4>
                      <button
                        onClick={() => onExplainConcept(def.name)}
                        className="text-[11px] text-emerald-600 hover:text-emerald-800 font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <span>{uiLang === 'en' ? 'AI Explain' : 'AI 深度精讲'}</span>
                        <HelpCircle className="w-3 h-3" />
                      </button>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">{def.explanation}</p>

                    {def.keyFormula && (
                      <div className="p-2.5 bg-white border border-slate-200 rounded-xl text-xs font-mono font-bold text-emerald-900 mt-2">
                        💡 {uiLang === 'en' ? 'Formula/Takeaway:' : '公式/结论:'} {def.keyFormula}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Pre-class Self-check Quiz */}
            {activePreview.selfCheckQuiz && activePreview.selfCheckQuiz.length > 0 && (
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                  {uiLang === 'en' ? 'Pre-class Self-check Quiz' : '预习效果自测 (课前小试)'}
                </h3>

                <div className="space-y-6">
                  {activePreview.selfCheckQuiz.map((q, qIdx) => {
                    const selectedOpt = userAnswers[qIdx];
                    const hasAnswered = selectedOpt !== undefined;

                    return (
                      <div key={qIdx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                        <p className="text-xs sm:text-sm font-bold text-slate-800">
                          {qIdx + 1}. {q.question}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {q.options.map((opt, optIdx) => {
                            const isSelected = selectedOpt === optIdx;
                            const isCorrect = optIdx === q.correctIndex;

                            let optStyle = 'bg-white border-slate-200 hover:border-emerald-400 text-slate-800';
                            if (hasAnswered) {
                              if (isCorrect) optStyle = 'bg-emerald-50 border-emerald-300 text-emerald-900 font-bold';
                              else if (isSelected && !isCorrect) optStyle = 'bg-rose-50 border-rose-300 text-rose-900 font-bold';
                              else optStyle = 'bg-white border-slate-200 opacity-60 text-slate-400';
                            }

                            return (
                              <button
                                key={optIdx}
                                onClick={() => setUserAnswers({ ...userAnswers, [qIdx]: optIdx })}
                                className={`p-3 rounded-xl border text-xs text-left transition-all cursor-pointer ${optStyle}`}
                              >
                                {opt}
                              </button>
                            );
                          })}
                        </div>

                        {hasAnswered && (
                          <div className="p-3 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-900 text-xs space-y-1">
                            <span className="font-bold block">{uiLang === 'en' ? 'Explanation & Key:' : '解析与依据：'}</span>
                            <p>{q.explanation}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Questions to Bring to Class */}
            {activePreview.questionsToAskTeacher && activePreview.questionsToAskTeacher.length > 0 && (
              <div className="bg-emerald-900 text-emerald-50 p-6 rounded-2xl shadow-md space-y-3">
                <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-emerald-800 pb-3">
                  <MessageSquare className="w-4 h-4 text-emerald-300" />
                  {uiLang === 'en' ? 'Questions to Bring to Class (Ask Teacher)' : '带疑听课清单 (推荐在课堂上提问老师)'}
                </h3>
                <div className="space-y-2">
                  {activePreview.questionsToAskTeacher.map((q, i) => (
                    <div key={i} className="p-3 bg-emerald-950/60 border border-emerald-800/80 rounded-xl text-xs text-emerald-100 flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-md bg-emerald-800 text-emerald-200 font-bold text-xs flex items-center justify-center shrink-0">
                        ?
                      </span>
                      <div className="leading-relaxed">
                        <span>{q}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* AI Generate Preview Guide Modal */}
      {showGenModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-150">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  {uiLang === 'en' ? 'AI Generate Preview Guide' : 'AI 智能生成预习导学案'}
                </h3>
                <p className="text-xs text-slate-500">
                  {uiLang === 'en'
                    ? `Strictly matches 【${userProfile?.gradeLevel || '高一'} · ${userProfile?.semester || '上学期'}】 textbook`
                    : `严格匹配【${userProfile?.gradeLevel || '高一'} · ${userProfile?.semester || '上学期'}】教材大纲与考点`}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">
                  {uiLang === 'en' ? 'Subject & Topic' : '预习学科与课题名称'}
                </label>
                <input
                  type="text"
                  value={genTitle}
                  onChange={(e) => setGenTitle(e.target.value)}
                  placeholder="例如：人教版高中物理：匀变速直线运动的位移与时间关系"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">
                    {uiLang === 'en' ? 'Subject' : '科目'}
                  </label>
                  <select
                    value={genSubject}
                    onChange={(e) => setGenSubject(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-900 focus:outline-none"
                  >
                    {['数学', '物理', '化学', '生物', '英语', '语文', '历史', '地理', '政治'].map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">
                    {uiLang === 'en' ? 'Textbook' : '教材版本'}
                  </label>
                  <input
                    type="text"
                    value={genPublisher}
                    onChange={(e) => setGenPublisher(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-900 focus:outline-none"
                  />
                </div>
              </div>

              <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl text-xs text-emerald-800">
                🔒 考纲锁定：将以【{currentGrade}】学生当前的知识体系为基础，不超纲、不跨年级，自动生成包含中英双语的预习导学案。
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowGenModal(false)}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition cursor-pointer"
              >
                {t('cancelBtn')}
              </button>
              <button
                type="button"
                onClick={handleGeneratePreview}
                disabled={isGenerating || !genTitle.trim()}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition shadow-xs cursor-pointer"
              >
                {isGenerating && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
                <span>{isGenerating ? (uiLang === 'en' ? 'Generating...' : '正在生成中...') : (uiLang === 'en' ? 'Generate Guide' : '开始智能生成')}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
