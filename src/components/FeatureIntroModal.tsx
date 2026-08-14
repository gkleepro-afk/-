import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Calendar, 
  GraduationCap, 
  Compass, 
  Award, 
  Camera, 
  BookOpen, 
  Languages, 
  BarChart3, 
  Flame, 
  HelpCircle, 
  CheckCircle2, 
  ArrowRight,
  Zap,
  PlayCircle,
  Lightbulb
} from 'lucide-react';
import { UILanguage } from '../utils/translations';

interface FeatureIntroModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectFeature?: (featureId: string) => void;
  onStartInteractiveTour?: () => void;
  uiLang: UILanguage;
}

export const FeatureIntroModal: React.FC<FeatureIntroModalProps> = ({
  isOpen,
  onClose,
  onSelectFeature,
  onStartInteractiveTour,
  uiLang,
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'plan' | 'classroom' | 'practice' | 'memory'>('all');

  if (!isOpen) return null;

  const features = [
    {
      id: 'roadmap',
      category: 'plan',
      icon: <Calendar className="w-5 h-5 text-blue-600" />,
      tag: uiLang === 'en' ? 'Core Hub' : '核心规划',
      title: uiLang === 'en' ? 'Daily Study Roadmap' : '每日学习规划与任务打卡',
      desc: uiLang === 'en'
        ? 'Visualize your personalized learning plan with estimated durations, priority tags, and direct Pomodoro focus integration.'
        : '按天科学排布学习任务，支持难度标签、番茄专注计时打卡与完成度实时反馈，告别盲目复习。',
      highlight: uiLang === 'en' ? 'Smart sequencing & task completion tracker' : '智能时间估算 · 艾宾浩斯复习节奏',
    },
    {
      id: 'generator',
      category: 'plan',
      icon: <Sparkles className="w-5 h-5 text-amber-500" />,
      tag: uiLang === 'en' ? 'AI Power' : '秒级生成',
      title: uiLang === 'en' ? 'AI Plan & Materials Generator' : 'AI 智能规划与讲义生成',
      desc: uiLang === 'en'
        ? 'Generate full curriculum roadmaps, tailored flashcard decks, and custom quizzes in seconds for any subject or exam.'
        : '输入任何科目、目标考纲或薄弱环节，AI 自动生成从基础到冲刺的系统化规划、记忆闪卡与测验集。',
      highlight: uiLang === 'en' ? 'One-click curriculum & quiz generation' : '考纲知识点秒级对齐 · 一键全套生成',
    },
    {
      id: 'classroom',
      category: 'classroom',
      icon: <GraduationCap className="w-5 h-5 text-indigo-600" />,
      tag: uiLang === 'en' ? 'Interactive' : '沉浸课堂',
      title: uiLang === 'en' ? 'AI Classroom Simulator' : 'AI 模拟名师讲堂',
      desc: uiLang === 'en'
        ? 'Experience dynamic step-by-step whiteboard lectures, interactive Q&A checkpoints, and instant concept clarifiers.'
        : '采用黑板板书 + 启发式互动教学，带你步步推导演算、随堂即时答疑与微考查，攻克复杂难点。',
      highlight: uiLang === 'en' ? 'Interactive step-by-step whiteboard pedagogy' : '启发式推导演算 · 随堂概念即时答疑',
    },
    {
      id: 'preview',
      category: 'classroom',
      icon: <Compass className="w-5 h-5 text-teal-600" />,
      tag: uiLang === 'en' ? 'Pre-study' : '高效预习',
      title: uiLang === 'en' ? 'Course Preview & Study Guides' : '新课前瞻与重点预习导学',
      desc: uiLang === 'en'
        ? 'Target key syllabus requirements, high-frequency exam pitfalls, and essential formula mind maps before class.'
        : '新课前提前掌握章节知识树、高频易错坑点与考查形式，让课堂听讲事半功倍。',
      highlight: uiLang === 'en' ? 'Curriculum standards & pitfall radar' : '中高考命题方向 · 易错警示导学',
    },
    {
      id: 'examcenter',
      category: 'practice',
      icon: <Award className="w-5 h-5 text-rose-600" />,
      tag: uiLang === 'en' ? 'Simulation' : '真题实战',
      title: uiLang === 'en' ? 'Standard Exam Center' : '全真模拟与真题考场',
      desc: uiLang === 'en'
        ? 'Take real-time simulated exams with countdowns, auto-grading, and comprehensive AI diagnostic scorecards.'
        : '严格按照中高考/期末考试倒计时全真模考，支持自动判卷、知识点得分率诊断与名师解析。',
      highlight: uiLang === 'en' ? 'Timer pressure & full rubric diagnostics' : '标准答题卡计时 · 试卷薄弱点雷达',
    },
    {
      id: 'photosolve',
      category: 'practice',
      icon: <Camera className="w-5 h-5 text-sky-600" />,
      tag: uiLang === 'en' ? 'AI Vision' : '拍照搜题',
      title: uiLang === 'en' ? 'Smart Photo Question Solver' : '拍题搜题与变式解构',
      desc: uiLang === 'en'
        ? 'Snap or upload homework questions for instant OCR recognition, step-by-step derivation, and knowledge tagging.'
        : '拍照或上传手写/印刷体题目，秒级识别题干并输出多解法步骤、解题灵感与考点溯源。',
      highlight: uiLang === 'en' ? 'Multi-method solving & instant OCR' : '智能 OCR 识别 · 一题多解与易错分析',
    },
    {
      id: 'qbank',
      category: 'practice',
      icon: <BookOpen className="w-5 h-5 text-orange-600" />,
      tag: uiLang === 'en' ? 'Question Bank' : '智能错题',
      title: uiLang === 'en' ? 'Smart Question & Error Bank' : '智能题库与精细错题本',
      desc: uiLang === 'en'
        ? 'Auto-classify solved and missed questions, trace root causes, and generate custom parallel drill sets.'
        : '错题自动归类、智能分析错因（粗心/概念模糊/公式不熟），并支持举一反三生成变式练习。',
      highlight: uiLang === 'en' ? 'Root cause diagnosis & parallel practice' : '错因智能打标 · 举一反三变式重刷',
    },
    {
      id: 'flashcards',
      category: 'memory',
      icon: <Languages className="w-5 h-5 text-violet-600" />,
      tag: uiLang === 'en' ? 'Spaced Repetition' : '科学记忆',
      title: uiLang === 'en' ? 'Spaced Repetition Flashcards' : '艾宾浩斯双语记忆闪卡',
      desc: uiLang === 'en'
        ? 'Utilize the SM-2 algorithm to review vocabulary, formulas, and definitions at optimal memory decay points.'
        : '基于 SM-2 记忆算法，精准在遗忘临界点推送复习，内置双语例句、发音与公式背诵。',
      highlight: uiLang === 'en' ? 'SM-2 decay curve algorithm' : '遗忘曲线算法 · 双语发音与例句解析',
    },
    {
      id: 'analytics',
      category: 'memory',
      icon: <BarChart3 className="w-5 h-5 text-emerald-600" />,
      tag: uiLang === 'en' ? 'Analytics' : '学情雷达',
      title: uiLang === 'en' ? 'Multi-dimensional Analytics' : '多维学情与掌握度看板',
      desc: uiLang === 'en'
        ? 'Track study streak, daily focus minutes, quiz performance curves, and subject mastery radar charts.'
        : '全方位统计专注时长、连续学习打卡、学科掌握度热力图与知识图谱演进。',
      highlight: uiLang === 'en' ? 'Visual mastery radar & streak logs' : '学科雷达分析 · 学习专注效率统计',
    },
    {
      id: 'achievements',
      category: 'memory',
      icon: <Flame className="w-5 h-5 text-amber-500" />,
      tag: uiLang === 'en' ? 'Rewards' : '成就激励',
      title: uiLang === 'en' ? 'Achievement & Streak Milestones' : '连续学习打卡成就勋章系统',
      desc: uiLang === 'en'
        ? 'Hit 3-day, 7-day, 14-day study streaks to trigger flashy celebration modals, unlock titles, and gain EXP rewards.'
        : '连续坚持学习达到 3天、7天、14天、30天将触发全屏酷炫粒子礼炮弹窗，解锁专属勋章与头衔。',
      highlight: uiLang === 'en' ? 'Flashy animations & wearable scholar titles' : '炫酷粒子庆贺 · 佩戴学霸专属头衔',
    },
  ];

  const filtered = activeCategory === 'all' 
    ? features 
    : features.filter(f => f.category === activeCategory);

  const handleNavigate = (id: string) => {
    if (onSelectFeature) {
      if (id === 'achievements') {
        onSelectFeature('userprofile');
      } else {
        onSelectFeature(id);
      }
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-4xl w-full shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200 text-slate-900 dark:text-slate-100 transition-colors duration-200">
        
        {/* Header Hero */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white p-6 sm:p-8 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-black uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{uiLang === 'en' ? 'Complete User Guide' : '新用户功能全景指南'}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {uiLang === 'en' ? 'Explore ZhiXue AI Learning Suite' : '智学 AI 提分系统 · 全功能使用指引'}
            </h3>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">
              {uiLang === 'en'
                ? 'Discover how our AI-driven curriculum, classroom simulation, question solver, and spaced repetition engine power your study efficiency.'
                : '从每日智能规划、AI 名师讲堂、拍题答疑到错题变式重刷与考场模考，一站式搞定全学科备考。'}
            </p>

            {/* Quick Tour Start Button */}
            {onStartInteractiveTour && (
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onStartInteractiveTour();
                  }}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 text-white text-xs font-black transition shadow-lg shadow-blue-500/30 flex items-center gap-2 cursor-pointer"
                >
                  <PlayCircle className="w-4 h-4" />
                  <span>{uiLang === 'en' ? 'Start Interactive Tour (Step-by-Step)' : '开启分步实操气泡指引 (新手必看)'}</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Category Filters */}
        <div className="px-6 sm:px-8 pt-4 pb-2 border-b border-slate-100 dark:border-slate-800 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
              activeCategory === 'all'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {uiLang === 'en' ? 'All Features (10)' : '全部功能 (10项)'}
          </button>
          <button
            onClick={() => setActiveCategory('plan')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
              activeCategory === 'plan'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {uiLang === 'en' ? 'Roadmap & Generator' : '规划与生成'}
          </button>
          <button
            onClick={() => setActiveCategory('classroom')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
              activeCategory === 'classroom'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {uiLang === 'en' ? 'Classroom & Pre-study' : '讲堂与预习'}
          </button>
          <button
            onClick={() => setActiveCategory('practice')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
              activeCategory === 'practice'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {uiLang === 'en' ? 'Exams & Question Bank' : '刷题、拍题与考场'}
          </button>
          <button
            onClick={() => setActiveCategory('memory')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
              activeCategory === 'memory'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {uiLang === 'en' ? 'Memory & Analytics' : '闪卡、学情与成就'}
          </button>
        </div>

        {/* Feature Grid List */}
        <div className="p-6 sm:p-8 max-h-[60vh] overflow-y-auto space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.map((feat) => (
              <div
                key={feat.id}
                className="group bg-slate-50 dark:bg-slate-850 hover:bg-blue-50/40 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700/60 rounded-2xl p-4 sm:p-5 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  {/* Top line: Icon & Tag */}
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 group-hover:border-blue-300 dark:group-hover:border-blue-600 flex items-center justify-center shadow-xs transition">
                        {feat.icon}
                      </div>
                      <div>
                        <h4 className="text-sm font-black text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
                          {feat.title}
                        </h4>
                        <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500">
                          {feat.tag}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                    {feat.desc}
                  </p>

                  {/* Highlight pill */}
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-[11px] font-medium text-slate-700 dark:text-slate-300 mb-4">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>{feat.highlight}</span>
                  </div>
                </div>

                {/* Direct Action Button */}
                <div className="pt-2 border-t border-slate-200/60 dark:border-slate-750 flex justify-end">
                  <button
                    type="button"
                    onClick={() => handleNavigate(feat.id)}
                    className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 group-hover:translate-x-0.5 transition-transform flex items-center gap-1 cursor-pointer"
                  >
                    <span>{uiLang === 'en' ? 'Open this module' : '前往使用该功能'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-6 bg-slate-50 dark:bg-slate-850 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <Lightbulb className="w-4 h-4 text-amber-500" />
            <span>{uiLang === 'en' ? 'Tip: You can re-open this guide anytime from the top bar or sidebar.' : '提示：随时可在顶部或侧边栏点击“新手功能指南”再次查阅。'}</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-slate-900 dark:bg-blue-600 hover:bg-slate-800 dark:hover:bg-blue-500 text-white text-xs font-bold transition shadow-xs cursor-pointer"
          >
            {uiLang === 'en' ? 'Got It, Start Learning' : '我知道了，开启高效学习'}
          </button>
        </div>

      </div>
    </div>
  );
};
