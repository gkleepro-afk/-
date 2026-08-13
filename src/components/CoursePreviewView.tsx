import React, { useState } from 'react';
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
  FileText
} from 'lucide-react';
import { CoursePreviewGuide, UserProfile } from '../types';
import { UILanguage, TRANSLATIONS } from '../utils/translations';

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

  const activePreview = previews.find((p) => p.id === selectedPreviewId) || previews[0];

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
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">初高中学习预习课程</h2>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center gap-1">
                <Compass className="w-3.5 h-3.5" />
                Pre-Class Syllabus
              </span>
            </div>
            <p className="text-sm text-slate-500 mt-1">
              课前 15 分钟高效预习：打通衔接旧知、透视核心公式定理，带着高质量疑问听课。
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowGenModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>AI 智能生成新课预习案</span>
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
              选择预习章节 / 课程案
            </span>
            <span className="text-xs text-slate-400">共 {previews.length} 门预习课程</span>
          </div>

          <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
            {previews.map((p) => {
              const isActive = p.id === selectedPreviewId;
              return (
                <button
                  key={p.id}
                  onClick={() => {
                    setSelectedPreviewId(p.id);
                    setUserAnswers({});
                  }}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 text-left border ${
                    isActive
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                  }`}
                >
                  <p className="line-clamp-1">{p.title}</p>
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
                <span className="text-xs text-slate-400 ml-auto flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  预习建议时长：{activePreview.estimatedTimeMinutes || 20} 分钟
                </span>
              </div>

              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">{activePreview.title}</h1>
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
                  本节课核心预习目标
                </h3>
                <ul className="space-y-2">
                  {activePreview.learningObjectives.map((obj, i) => (
                    <li key={i} className="text-xs sm:text-sm text-slate-700 flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span className="leading-relaxed">{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Prerequisites */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                  <BookOpen className="w-4 h-4 text-blue-600" />
                  课前温故衔接（知识唤醒）
                </h3>
                <ul className="space-y-2">
                  {activePreview.prerequisites.map((pre, i) => (
                    <li key={i} className="text-xs sm:text-sm text-slate-700 flex items-start gap-2">
                      <span className="text-blue-500 font-bold mt-0.5">•</span>
                      <span className="leading-relaxed">{pre}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Core Definitions & Formulas */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                <Zap className="w-4 h-4 text-amber-500" />
                课本核心概念与公式剖析
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
                        className="text-[11px] text-emerald-600 hover:text-emerald-800 font-bold flex items-center gap-1"
                      >
                        <span>AI 深度精讲</span>
                        <HelpCircle className="w-3 h-3" />
                      </button>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">{def.explanation}</p>

                    {def.keyFormula && (
                      <div className="p-2.5 bg-white border border-slate-200 rounded-xl text-xs font-mono font-bold text-emerald-900 mt-2">
                        💡 公式/结论: {def.keyFormula}
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
                  预习效果自测 (课前小试)
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
                                className={`p-3 rounded-xl border text-xs text-left transition-all ${optStyle}`}
                              >
                                {opt}
                              </button>
                            );
                          })}
                        </div>

                        {hasAnswered && (
                          <div className="p-3 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-900 text-xs space-y-1">
                            <span className="font-bold block">解析与依据：</span>
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
                  带疑听课清单 (推荐在课堂上提问老师)
                </h3>
                <div className="space-y-2">
                  {activePreview.questionsToAskTeacher.map((q, i) => (
                    <div key={i} className="p-3 bg-emerald-950/60 border border-emerald-800/80 rounded-xl text-xs text-emerald-100 flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-md bg-emerald-800 text-emerald-200 font-bold text-xs flex items-center justify-center shrink-0">
                        ?
                      </span>
                      <span className="leading-relaxed">{q}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* AI Course Preview Generator Modal */}
      {showGenModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-lg p-6 space-y-5 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Compass className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-slate-900">AI 智能生成新课预习案</h3>
              </div>
              <button
                onClick={() => setShowGenModal(false)}
                className="text-slate-400 hover:text-slate-600 text-xs font-bold p-1 rounded-lg"
              >
                关闭
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">输入课程章节名称</label>
                <input
                  type="text"
                  value={genTitle}
                  onChange={(e) => setGenTitle(e.target.value)}
                  placeholder="如：人教版高中物理必修二 第五章 抛体运动的规律"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">学科</label>
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
                  <label className="text-xs font-bold text-slate-700 block mb-1">学段/年级</label>
                  <select
                    value={genGrade}
                    onChange={(e) => setGenGrade(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800"
                  >
                    <option value="初一">初一</option>
                    <option value="初二">初二</option>
                    <option value="初三">初三</option>
                    <option value="高一">高一</option>
                    <option value="高二">高二</option>
                    <option value="高三">高三</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">教材版本</label>
                  <input
                    type="text"
                    value={genPublisher}
                    onChange={(e) => setGenPublisher(e.target.value)}
                    placeholder="人教版"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={handleGeneratePreview}
              disabled={isGenerating || !genTitle.trim()}
              className={`w-full py-3 rounded-xl text-xs font-bold text-white shadow-md transition-all flex items-center justify-center gap-2 ${
                isGenerating || !genTitle.trim()
                  ? 'bg-slate-300 cursor-not-allowed'
                  : 'bg-emerald-600 hover:bg-emerald-700'
              }`}
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>AI 正在剖析教材并构建预习案...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>生成完整预习指南</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
