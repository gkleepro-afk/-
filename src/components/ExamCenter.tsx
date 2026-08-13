import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Clock, 
  Award, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Play, 
  History, 
  Plus, 
  Search, 
  Filter, 
  ChevronRight, 
  BookOpen, 
  RotateCcw,
  Check,
  Send,
  HelpCircle,
  BarChart3,
  Flame,
  Globe
} from 'lucide-react';
import { ExamPaperItem, ExamSubmission, QuestionBankItem, UserProfile } from '../types';
import { UILanguage, translations } from '../utils/translations';
import { matchGradeStrict } from '../utils/gradeMatcher';

interface ExamCenterProps {
  papers: ExamPaperItem[];
  submissions: ExamSubmission[];
  userProfile: UserProfile;
  onSavePaper: (paper: ExamPaperItem) => void;
  onSaveSubmission: (submission: ExamSubmission) => void;
  onAddQuestionToMistakes?: (question: QuestionBankItem) => void;
  uiLang: UILanguage;
}

export const ExamCenter: React.FC<ExamCenterProps> = ({
  papers,
  submissions,
  userProfile,
  onSavePaper,
  onSaveSubmission,
  onAddQuestionToMistakes,
  uiLang,
}) => {
  const t = (key: keyof typeof translations) => {
    return translations[key]?.[uiLang] || translations[key]?.['zh'] || key;
  };

  const getText = (zh?: string, en?: string) => {
    if (uiLang === 'en') return en || zh || '';
    if (uiLang === 'bilingual') return en ? `${zh} / ${en}` : zh || '';
    return zh || '';
  };

  const [activeTab, setActiveTab] = useState<'browse' | 'generate' | 'history'>('browse');

  // Filter states
  const [subjectFilter, setSubjectFilter] = useState('all');
  const [gradeFilter, setGradeFilter] = useState('match'); // 'match' or 'all'
  const [searchQuery, setSearchQuery] = useState('');

  // Active exam mode state
  const [activePaper, setActivePaper] = useState<ExamPaperItem | null>(null);
  const [userAnswers, setUserAnswers] = useState<Record<string, number | string>>({});
  const [timeRemainingSeconds, setTimeRemainingSeconds] = useState<number>(0);
  const [examStarted, setExamStarted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Selected Submission for Viewing Report
  const [selectedSubmission, setSelectedSubmission] = useState<ExamSubmission | null>(null);

  // AI Exam Generator Form State
  const [genSubject, setGenSubject] = useState('物理');
  const [genGrade, setGenGrade] = useState(userProfile.gradeLevel || '高三/高考');
  const [genSemester, setGenSemester] = useState(userProfile.semester || '上学期');
  const [genTopic, setGenTopic] = useState('');
  const [genCount, setGenCount] = useState(4);
  const [isGenerating, setIsGenerating] = useState(false);
  const [genError, setGenError] = useState('');

  // Timer countdown effect during active exam
  useEffect(() => {
    let interval: any = null;
    if (examStarted && timeRemainingSeconds > 0) {
      interval = setInterval(() => {
        setTimeRemainingSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            handleAutoSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [examStarted, timeRemainingSeconds]);

  // Start an Exam
  const handleStartExam = (paper: ExamPaperItem) => {
    setActivePaper(paper);
    setUserAnswers({});
    setTimeRemainingSeconds((paper.durationMinutes || 60) * 60);
    setExamStarted(true);
  };

  // Format countdown string (e.g., 59:45)
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Submit Exam Function
  const handleSubmitExam = async () => {
    if (!activePaper) return;
    setIsSubmitting(true);

    let earnedScore = 0;
    const perQuestionScore = Math.round(activePaper.totalScore / activePaper.questions.length);

    const wrongQuestions: QuestionBankItem[] = [];

    activePaper.questions.forEach((q) => {
      const userAns = userAnswers[q.id];
      if (q.questionType === 'choice') {
        if (typeof userAns === 'number' && userAns === q.correctIndex) {
          earnedScore += perQuestionScore;
        } else {
          wrongQuestions.push(q);
        }
      } else {
        // Fill or Solution
        if (typeof userAns === 'string' && userAns.trim().length > 0) {
          // Grant score for completed text entries in mock
          earnedScore += perQuestionScore;
        } else {
          wrongQuestions.push(q);
        }
      }
    });

    // Automatically add missed questions to mistakes log if callback provided
    if (onAddQuestionToMistakes) {
      wrongQuestions.forEach((q) => onAddQuestionToMistakes(q));
    }

    const timeSpent = (activePaper.durationMinutes * 60) - timeRemainingSeconds;

    const newSubmission: ExamSubmission = {
      id: `sub-${Date.now()}`,
      paperId: activePaper.id,
      paperTitle: activePaper.title,
      submittedAt: new Date().toISOString(),
      score: Math.min(activePaper.totalScore, earnedScore),
      totalScore: activePaper.totalScore,
      timeSpentSeconds: Math.max(10, timeSpent),
      userAnswers,
      aiEvaluation: {
        summary: earnedScore >= activePaper.passingScore 
          ? `表现优秀！掌握了 ${activePaper.subject} 核心考点，逻辑清晰。`
          : `需继续加强巩固！在部分重点计算与概念理解上仍有提升空间。`,
        strengths: [`完成了 ${activePaper.questions.length - wrongQuestions.length} 道核心考点题目`],
        weaknesses: wrongQuestions.map(wq => wq.topic || '综合知识点应用'),
        studyAdvice: [
          `复习建议：重点针对 ${wrongQuestions.map(w => w.topic).join('、') || '错误题目'} 结合知识卡片重新温习。`,
          `已将 ${wrongQuestions.length} 道错题同步至【初高中全科题库】错题本，方便后续强化打卡！`
        ]
      }
    };

    onSaveSubmission(newSubmission);
    setSelectedSubmission(newSubmission);

    setExamStarted(false);
    setActivePaper(null);
    setIsSubmitting(false);
  };

  const handleAutoSubmit = () => {
    alert('考试时间到！系统已自动为您提交答卷。');
    handleSubmitExam();
  };

  // Generate Exam via AI
  const handleGenerateExam = async (e: React.FormEvent) => {
    e.preventDefault();
    setGenError('');
    setIsGenerating(true);

    try {
      const res = await fetch('/api/generate-exam-paper', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject: genSubject,
          gradeLevel: genGrade,
          semester: genSemester,
          countryRegion: userProfile.countryRegion,
          educationSystem: userProfile.educationSystem,
          topic: genTopic || '全真综合模拟特训',
          questionCount: genCount,
        }),
      });

      const data = await res.json();
      if (data.success && data.paper) {
        onSavePaper(data.paper);
        setActiveTab('browse');
        handleStartExam(data.paper);
      } else {
        throw new Error(data.error || 'AI 组卷失败');
      }
    } catch (err: any) {
      setGenError(err.message || '生成组卷失败，请重试');
    } finally {
      setIsGenerating(false);
    }
  };

  // Filter papers list strictly by user profile grade
  const filteredPapers = papers.filter((p) => {
    if (subjectFilter !== 'all' && !p.subject.includes(subjectFilter)) return false;
    if (!matchGradeStrict(p.gradeLevel, userProfile.gradeLevel)) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.subject.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="flex-1 flex flex-col h-full bg-[#F8FAFC] overflow-y-auto">
      
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-8 py-6 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                {t('examCenterTitle')}
              </h2>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-100">
                Exam & Test Center
              </span>
            </div>
            <p className="text-sm text-slate-500 mt-1">
              {t('examCenterSubtitle')}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('browse')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'browse'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{t('mockPapersTab')} ({papers.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('generate')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'generate'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>{t('aiGenPaperTab')}</span>
            </button>

            <button
              onClick={() => setActiveTab('history')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'history'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <History className="w-3.5 h-3.5" />
              <span>{t('scoreReportsTab')} ({submissions.length})</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="p-8 max-w-7xl mx-auto w-full">

        {/* TAB 1: Browse Papers */}
        {activeTab === 'browse' && (
          <div className="space-y-6">
            
            {/* Filter Bar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3 flex-1">
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={uiLang === 'en' ? 'Search exam title or topic...' : '搜索试卷标题或核心考点...'}
                    className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-500">{uiLang === 'en' ? 'Subject' : '学科'}:</span>
                  {['all', '物理', '数学', '英语', '化学', '生物'].map((sub) => (
                    <button
                      key={sub}
                      onClick={() => setSubjectFilter(sub)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                        subjectFilter === sub
                          ? 'bg-slate-900 text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {sub === 'all'
                        ? uiLang === 'en' ? 'All' : '全部全科'
                        : sub === '物理' ? (uiLang === 'en' ? 'Physics' : '物理')
                        : sub === '数学' ? (uiLang === 'en' ? 'Math' : '数学')
                        : sub === '英语' ? (uiLang === 'en' ? 'English' : '英语')
                        : sub === '化学' ? (uiLang === 'en' ? 'Chemistry' : '化学')
                        : sub === '生物' ? (uiLang === 'en' ? 'Biology' : '生物')
                        : sub}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 border-l border-slate-200 pl-4">
                <span className="px-3 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold rounded-lg flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>
                    {uiLang === 'en'
                      ? `Grade Lock: 【${userProfile.gradeLevel || 'Selected'}】 Papers Only`
                      : uiLang === 'bilingual'
                      ? `年级锁：【${userProfile.gradeLevel || '选定'}】试卷 / Grade Lock`
                      : `全屏年级锁：仅【${userProfile.gradeLevel || '选定年级'}】试卷`}
                  </span>
                </span>
              </div>
            </div>

            {/* Papers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPapers.map((paper) => (
                <div
                  key={paper.id}
                  className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:shadow-lg hover:border-blue-300 transition flex flex-col justify-between group relative overflow-hidden"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-blue-50 text-blue-600 border border-blue-100 uppercase">
                        {paper.subject} · {paper.gradeLevel}
                      </span>
                      <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        {paper.durationMinutes} {uiLang === 'en' ? 'Mins' : '分钟'}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition leading-snug">
                      {getText(paper.title, paper.titleEn)}
                    </h3>

                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {getText(paper.description, paper.descriptionEn)}
                    </p>
                  </div>

                  <div className="pt-5 border-t border-slate-100 mt-5 flex items-center justify-between">
                    <div className="text-xs text-slate-500">
                      <span>{t('containsQuestions')}: <strong className="text-slate-800 font-bold">{paper.questions.length}</strong> {uiLang === 'en' ? 'items' : '题'}</span>
                      <span className="mx-2">·</span>
                      <span>{t('totalPoints')}: <strong className="text-slate-800 font-bold">{paper.totalScore}</strong> {uiLang === 'en' ? 'pts' : '分'}</span>
                    </div>

                    <button
                      onClick={() => handleStartExam(paper)}
                      className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-md shadow-blue-500/20 cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5 fill-white" />
                      <span>{t('startExamBtn')}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredPapers.length === 0 && (
              <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8">
                <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <p className="text-base font-bold text-slate-700">暂无匹配的模拟试卷</p>
                <p className="text-xs text-slate-400 mt-1 mb-4">您可以切换“全部年级”或者使用【AI 智能组卷】功能现场生成试卷</p>
                <button
                  onClick={() => setActiveTab('generate')}
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-bold shadow-md shadow-indigo-500/20 cursor-pointer"
                >
                  前往 AI 智能组卷
                </button>
              </div>
            )}

          </div>
        )}

        {/* TAB 2: AI Exam Paper Generator */}
        {activeTab === 'generate' && (
          <div className="max-w-3xl mx-auto bg-slate-900 text-white p-8 rounded-2xl shadow-xl border border-slate-800 space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">
                  {uiLang === 'en' ? 'AI Precision Exam Generator System' : 'AI 智能精准组卷系统'}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  {uiLang === 'en'
                    ? 'Input target subject and topics, AI will generate customized practice exam paper'
                    : '输入想要考核的知识考点与学科，AI 将为您实时生成定制冲刺套卷'}
                </p>
              </div>
            </div>

            <form onSubmit={handleGenerateExam} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                    {uiLang === 'en' ? 'Subject' : '考查学科'}
                  </label>
                  <select
                    value={genSubject}
                    onChange={(e) => setGenSubject(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="物理">物理 (Physics)</option>
                    <option value="数学">数学 (Mathematics)</option>
                    <option value="化学">化学 (Chemistry)</option>
                    <option value="英语">英语 (English)</option>
                    <option value="生物">生物 (Biology)</option>
                    <option value="语文">语文 (Chinese)</option>
                    <option value="历史">历史 (History)</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                    {uiLang === 'en' ? 'Target Grade / Exam' : '适用年级 / 考试'}
                  </label>
                  <input
                    type="text"
                    value={genGrade}
                    onChange={(e) => setGenGrade(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                    {uiLang === 'en' ? 'Semester' : '学期阶段'}
                  </label>
                  <select
                    value={genSemester}
                    onChange={(e) => setGenSemester(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="上学期">{uiLang === 'en' ? '1st Semester (Fall)' : '上学期 (秋季)'}</option>
                    <option value="下学期">{uiLang === 'en' ? '2nd Semester (Spring)' : '下学期 (春季)'}</option>
                    <option value="全学年/中高考复习">{uiLang === 'en' ? 'Full Year / Graduation Prep' : '全学年 / 毕业考复习'}</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                  {uiLang === 'en' ? 'Key Topic / Chapter Title' : '考核专项考点 / 章节标题'}
                </label>
                <input
                  type="text"
                  placeholder={uiLang === 'en' ? 'e.g. Momentum Conservation, Quadratic Functions...' : '如：动量守恒与碰撞、二次函数压轴题、雅思学术阅读理解...'}
                  value={genTopic}
                  onChange={(e) => setGenTopic(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl p-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                  {uiLang === 'en' ? 'Question Count' : '题目题量 (题)'}
                </label>
                <select
                  value={genCount}
                  onChange={(e) => setGenCount(Number(e.target.value))}
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl p-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value={3}>{uiLang === 'en' ? '3 Selected Key Questions' : '3 道精选压轴精练题'}</option>
                  <option value={4}>{uiLang === 'en' ? '4 Standard Practice Questions' : '4 道标准微套卷 (推荐)'}</option>
                  <option value={6}>{uiLang === 'en' ? '6 Comprehensive Paper Questions' : '6 道综合高强组卷'}</option>
                </select>
              </div>

              {genError && (
                <p className="text-xs text-rose-400 bg-rose-500/10 border border-rose-500/20 p-3 rounded-lg">
                  {genError}
                </p>
              )}

              <button
                type="submit"
                disabled={isGenerating}
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-4 rounded-xl font-bold transition text-sm shadow-lg shadow-indigo-900/30 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <Sparkles className="w-4 h-4 animate-spin" />
                    <span>{uiLang === 'en' ? 'AI Assembling Paper...' : 'AI 正在为您组卷分析中...'}</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>{uiLang === 'en' ? 'Generate & Start Exam' : '生成并开启全真考场测试'}</span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        {/* TAB 3: Exam Submissions History & Report */}
        {activeTab === 'history' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
              <h3 className="text-base font-bold text-slate-900 mb-4 pb-3 border-b border-slate-100 flex items-center justify-between">
                <span>{uiLang === 'en' ? 'Exam History & AI Diagnostics' : '考试成绩与 AI 阅卷记录'}</span>
                <span className="text-xs text-slate-500 font-normal">
                  {uiLang === 'en' ? `Total ${submissions.length} tests` : `共 ${submissions.length} 次测验`}
                </span>
              </h3>

              <div className="space-y-4">
                {submissions.map((sub) => (
                  <div
                    key={sub.id}
                    onClick={() => setSelectedSubmission(sub)}
                    className="p-4 rounded-xl border border-slate-200 hover:border-blue-400 bg-slate-50 hover:bg-blue-50/20 transition cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-700">
                          {uiLang === 'en' ? 'Score' : '成绩得分'}
                        </span>
                        <span className="text-xs text-slate-400">
                          {new Date(sub.submittedAt).toLocaleDateString()}
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-slate-900">
                        {sub.paperTitle}
                      </h4>
                      <p className="text-xs text-slate-500 mt-1">
                        {uiLang === 'en' ? 'Time Spent' : '用时'}: {Math.floor(sub.timeSpentSeconds / 60)} {uiLang === 'en' ? 'm' : '分'} {sub.timeSpentSeconds % 60} {uiLang === 'en' ? 's' : '秒'}
                      </p>
                    </div>

                    <div className="flex items-center gap-4 shrink-0">
                      <div className="text-right">
                        <span className={`text-2xl font-black ${
                          sub.score >= sub.totalScore * 0.8 ? 'text-emerald-600' : 'text-amber-600'
                        }`}>
                          {sub.score}
                        </span>
                        <span className="text-xs font-bold text-slate-400"> / {sub.totalScore}{uiLang === 'en' ? 'pts' : '分'}</span>
                      </div>

                      <button className="px-3.5 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-bold shadow-xs cursor-pointer">
                        {uiLang === 'en' ? 'View Report' : '查看完整诊断报告'}
                      </button>
                    </div>
                  </div>
                ))}

                {submissions.length === 0 && (
                  <p className="text-sm text-slate-400 text-center py-8">
                    {uiLang === 'en' ? 'No exam history yet. Try taking a mock test!' : '暂无已完成的试卷考场记录，快去“真题模拟卷”做一次测试吧！'}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

      </div>

      {/* FULLSCREEN EXAM SESSION MODAL */}
      {examStarted && activePaper && (
        <div className="fixed inset-0 bg-slate-900/95 backdrop-blur-md z-50 flex flex-col text-white">
          
          {/* Exam Header */}
          <header className="bg-slate-900 border-b border-slate-800 px-8 py-4 flex items-center justify-between shrink-0">
            <div>
              <span className="text-xs font-bold px-2.5 py-1 rounded bg-blue-600 text-white uppercase">
                {activePaper.subject} {uiLang === 'en' ? 'Mock Exam Room' : '全真模拟考场'}
              </span>
              <h3 className="text-lg font-bold text-white mt-1">{getText(activePaper.title, activePaper.titleEn)}</h3>
            </div>

            <div className="flex items-center gap-6">
              {/* Countdown Timer */}
              <div className="flex items-center gap-2 bg-slate-800 border border-slate-700 px-4 py-2 rounded-xl text-amber-400 font-mono font-bold text-lg">
                <Clock className="w-5 h-5 text-amber-400 animate-pulse" />
                <span>{t('countdown')}: {formatTime(timeRemainingSeconds)}</span>
              </div>

              <button
                onClick={handleSubmitExam}
                disabled={isSubmitting}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold transition shadow-lg shadow-emerald-900/40 flex items-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>{t('submitExamBtn')}</span>
              </button>
            </div>
          </header>

          {/* Exam Content Area */}
          <div className="flex-1 flex overflow-hidden">
            
            {/* Left Question List */}
            <div className="flex-1 overflow-y-auto p-8 max-w-4xl mx-auto space-y-8">
              {activePaper.questions.map((q, idx) => {
                const userAns = userAnswers[q.id];
                const qText = getText(q.question, q.questionEn);
                
                let qOpts = q.options || [];
                if (uiLang === 'en' && q.optionsEn && q.optionsEn.length > 0) {
                  qOpts = q.optionsEn;
                } else if (uiLang === 'bilingual' && q.optionsEn && q.optionsEn.length === q.options?.length) {
                  qOpts = q.options.map((opt, i) => `${opt} / ${q.optionsEn![i]}`);
                }

                return (
                  <div key={q.id} className="bg-slate-800/80 border border-slate-700 p-6 rounded-2xl space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <span className="w-7 h-7 rounded-lg bg-blue-600 text-white font-bold flex items-center justify-center shrink-0 text-sm">
                        {idx + 1}
                      </span>
                      <div className="flex-1">
                        <p className="text-base font-semibold text-slate-100 leading-relaxed">
                          {qText}
                        </p>
                      </div>
                    </div>

                    {/* Choice Question Options */}
                    {qOpts && qOpts.length > 0 && (
                      <div className="grid grid-cols-1 gap-2.5 pl-11">
                        {qOpts.map((opt, oIdx) => {
                          const isSelected = userAns === oIdx;
                          return (
                            <button
                              key={oIdx}
                              onClick={() => setUserAnswers({ ...userAnswers, [q.id]: oIdx })}
                              className={`p-3.5 rounded-xl text-left text-sm font-medium transition cursor-pointer border flex items-center gap-3 ${
                                isSelected
                                  ? 'bg-blue-600/30 border-blue-500 text-white font-bold'
                                  : 'bg-slate-900/60 border-slate-700 text-slate-300 hover:bg-slate-700/50'
                              }`}
                            >
                              <span className={`w-6 h-6 rounded-full border flex items-center justify-center text-xs font-bold ${
                                isSelected ? 'bg-blue-600 border-blue-400 text-white' : 'border-slate-600 text-slate-400'
                              }`}>
                                {String.fromCharCode(65 + oIdx)}
                              </span>
                              <span>{opt}</span>
                            </button>
                          );
                        })}
                      </div>
                    )}

                    {/* Fill or Solution Input */}
                    {(!qOpts || qOpts.length === 0) && (
                      <div className="pl-11">
                        <textarea
                          rows={3}
                          value={typeof userAns === 'string' ? userAns : ''}
                          onChange={(e) => setUserAnswers({ ...userAnswers, [q.id]: e.target.value })}
                          placeholder={uiLang === 'en' ? 'Enter your solution steps or answer...' : '请输入您的推导步骤与最终答案...'}
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Right Floating Answer Navigator / 答题卡 */}
            <div className="w-72 bg-slate-900 border-l border-slate-800 p-6 hidden lg:block shrink-0">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 pb-2 border-b border-slate-800">
                {t('answerCardTitle')}
              </h4>

              <div className="grid grid-cols-4 gap-2.5">
                {activePaper.questions.map((q, idx) => {
                  const answered = userAnswers[q.id] !== undefined;
                  return (
                    <div
                      key={q.id}
                      className={`h-10 rounded-xl border font-bold text-xs flex items-center justify-center transition ${
                        answered
                          ? 'bg-emerald-600/20 border-emerald-500 text-emerald-400'
                          : 'bg-slate-800 border-slate-700 text-slate-400'
                      }`}
                    >
                      {idx + 1}
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 space-y-2 text-xs text-slate-400 pt-4 border-t border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span>{uiLang === 'en' ? 'Answered' : '已完成作答'} ({Object.keys(userAnswers).length})</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-slate-700" />
                  <span>{uiLang === 'en' ? 'Unanswered' : '未作答'} ({activePaper.questions.length - Object.keys(userAnswers).length})</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* SUBMISSION REPORT MODAL */}
      {selectedSubmission && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-8 shadow-2xl border border-slate-200 space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold px-2.5 py-1 rounded bg-blue-50 text-blue-600 border border-blue-100">
                  {t('examReportTitle')}
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-1">{selectedSubmission.paperTitle}</h3>
              </div>
              <button
                onClick={() => setSelectedSubmission(null)}
                className="text-slate-400 hover:text-slate-600 font-bold p-1"
              >
                ✕
              </button>
            </div>

            {/* Score Ring */}
            <div className="bg-slate-900 text-white p-6 rounded-2xl flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-400">{uiLang === 'en' ? 'Report Score' : '考场得分 Report Score'}</p>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-4xl font-black text-amber-400">{selectedSubmission.score}</span>
                  <span className="text-slate-400 text-sm">/ {selectedSubmission.totalScore} {uiLang === 'en' ? 'pts' : '分'}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-400">{uiLang === 'en' ? 'Time Taken' : '做题耗时'}</p>
                <p className="text-sm font-bold text-white mt-1">
                  {Math.floor(selectedSubmission.timeSpentSeconds / 60)} {uiLang === 'en' ? 'm' : '分'} {selectedSubmission.timeSpentSeconds % 60} {uiLang === 'en' ? 's' : '秒'}
                </p>
              </div>
            </div>

            {/* AI Evaluation Breakdown */}
            {selectedSubmission.aiEvaluation && (
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-900 space-y-2">
                  <p className="font-bold text-sm text-blue-900">💡 {uiLang === 'en' ? 'AI Evaluation Summary:' : 'AI 导师诊断评语：'}</p>
                  <p>{selectedSubmission.aiEvaluation.summary}</p>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    {uiLang === 'en' ? 'Topics Needing Improvement:' : '需强化补强考点：'}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedSubmission.aiEvaluation.weaknesses.map((w, idx) => (
                      <span key={idx} className="px-3 py-1 rounded-full bg-rose-50 text-rose-600 border border-rose-200 text-xs font-bold">
                        {w}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
              <button
                onClick={() => setSelectedSubmission(null)}
                className="px-6 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs shadow-md shadow-blue-500/20 cursor-pointer"
              >
                {t('confirmStudyAdvice')}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
