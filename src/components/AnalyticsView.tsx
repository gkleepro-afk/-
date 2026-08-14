import React from 'react';
import { 
  BarChart3, 
  Flame, 
  Clock, 
  CheckCircle2, 
  Award, 
  TrendingUp, 
  Zap, 
  Brain,
  BookOpen
} from 'lucide-react';
import { UserStats } from '../types';
import { UILanguage, TRANSLATIONS } from '../utils/translations';

interface AnalyticsViewProps {
  stats: UserStats;
  uiLang: UILanguage;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({ stats, uiLang }) => {
  const t = (key: keyof typeof TRANSLATIONS) => TRANSLATIONS[key][uiLang] || TRANSLATIONS[key].bilingual;
  const subjectList = Object.entries(stats.subjectProgress || {});

  return (
    <div className="flex-1 flex flex-col h-full bg-[#F8FAFC] dark:bg-slate-950 text-slate-800 dark:text-slate-100 overflow-y-auto transition-colors duration-200">
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-8 py-6 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">{t('analyticsTitle')}</h2>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800">
              Recall Statistics
            </span>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {t('analyticsDesc')}
          </p>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-8 max-w-7xl mx-auto w-full space-y-8">
        
        {/* Stat Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                {uiLang === 'en' ? 'Review Streak' : '连续复习天数'}
              </span>
              <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <Flame className="w-4 h-4 fill-amber-500/20" />
              </div>
            </div>
            <p className="text-3xl font-black text-slate-900 dark:text-white">{stats.streakDays} {uiLang === 'en' ? 'Days' : '天'}</p>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">{uiLang === 'en' ? 'Keep up active recall' : '打卡不断，记忆犹新'}</p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                {uiLang === 'en' ? 'Total Study Time' : '累计专注时长'}
              </span>
              <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <p className="text-3xl font-black text-slate-900 dark:text-white">{stats.totalStudyMinutes} {uiLang === 'en' ? 'mins' : '分钟'}</p>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">
              {uiLang === 'en' ? `Equal to ${(stats.totalStudyMinutes / 60).toFixed(1)} hrs` : `折合 ${(stats.totalStudyMinutes / 60).toFixed(1)} 小时高效复习`}
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                {uiLang === 'en' ? 'Completed Tasks' : '完成复习任务'}
              </span>
              <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <p className="text-3xl font-black text-slate-900 dark:text-white">{stats.completedTasksCount} {uiLang === 'en' ? 'tasks' : '项'}</p>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">
              {uiLang === 'en' ? `Reviewed ${stats.reviewedCardsCount} flashcards` : `已翻看 ${stats.reviewedCardsCount} 张高频知识卡片`}
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                {uiLang === 'en' ? 'Quiz Accuracy' : '测验平均正确率'}
              </span>
              <div className="w-8 h-8 rounded-lg bg-cyan-50 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400 flex items-center justify-center">
                <Award className="w-4 h-4" />
              </div>
            </div>
            <p className="text-3xl font-black text-slate-900 dark:text-white">{stats.averageQuizScore}%</p>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">
              {uiLang === 'en' ? `Completed ${stats.quizzesTakenCount} quizzes` : `已完成 ${stats.quizzesTakenCount} 次小测巩固`}
            </p>
          </div>
        </div>

        {/* Detailed Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Subject Progress Bars */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">各学科掌握度 (Subject Mastery)</h3>
              <span className="text-xs text-slate-400 dark:text-slate-500">动态分析</span>
            </div>

            <div className="space-y-5">
              {subjectList.map(([subName, percent]) => (
                <div key={subName} className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs font-bold">
                    <span className="text-slate-800 dark:text-slate-200">{subName}</span>
                    <span className="text-blue-600 dark:text-blue-400">{percent}% 掌握度</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden border border-slate-200/80 dark:border-slate-700">
                    <div 
                      className="bg-blue-600 dark:bg-blue-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Cognitive Insights */}
          <div className="lg:col-span-5 bg-slate-900 dark:bg-slate-900 text-white p-7 rounded-2xl shadow-lg border border-slate-800 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-blue-400">
                <Brain className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-wider">认知科学洞察</span>
              </div>

              <h3 className="text-lg font-bold text-white">记忆曲线与朗读增强</h3>

              <div className="p-4 bg-slate-800/90 rounded-xl border border-slate-700/80 space-y-2 text-xs text-slate-300">
                <p className="font-semibold text-white">高频主动回忆 (Active Recall)</p>
                <p className="leading-relaxed">
                  你的《英语雅思》与《高中物理》翻卡频率良好，连续 4 天复习使关键知识遗忘速率降低 65%。
                </p>
              </div>

              <div className="p-4 bg-slate-800/90 rounded-xl border border-slate-700/80 space-y-2 text-xs text-slate-300">
                <p className="font-semibold text-white">多语言发音反馈</p>
                <p className="leading-relaxed">
                  在《日本語 N2》与英语例句学习中，配合真人语音朗读能强化听觉神经联系，提升阅读理解速度。
                </p>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 mt-6 italic">
              Logos Memory Palace Engine • 艾宾浩斯智能调度
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};
