import React from 'react';
import { Sparkles, Flame, Clock, Brain, CheckCircle2, Plus } from 'lucide-react';
import { UserStats } from '../types';

interface HeaderProps {
  stats: UserStats;
  activeTab: string;
  onSelectTab: (tab: string) => void;
  onOpenPomodoro: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  stats,
  activeTab,
  onSelectTab,
  onOpenPomodoro,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 text-slate-100 px-4 lg:px-8 py-3 transition-all">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => onSelectTab('tasks')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-indigo-500/20 text-white font-bold text-xl">
            <Brain className="w-6 h-6 text-white animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-bold text-lg tracking-tight text-white font-sans">智学星</h1>
              <span className="text-[10px] uppercase font-semibold tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                AI 复习引擎
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">智能定制学习计划 · 每日高频复习 · 多语言卡片</p>
          </div>
        </div>

        {/* Stats & Quick Actions */}
        <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
          {/* Streak Counter */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs sm:text-sm font-medium">
            <Flame className="w-4 h-4 text-amber-400 fill-amber-400/30" />
            <span>连续 <strong className="text-amber-200 font-bold">{stats.streakDays}</strong> 天</span>
          </div>

          {/* Study Minutes */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 text-xs sm:text-sm font-medium">
            <Clock className="w-4 h-4 text-cyan-400" />
            <span>专注 <strong className="text-white">{stats.totalStudyMinutes}</strong> 分钟</span>
          </div>

          {/* Completed tasks badge */}
          <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs sm:text-sm font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>已完成 <strong className="text-emerald-200 font-bold">{stats.completedTasksCount}</strong> 任务</span>
          </div>

          {/* Pomodoro Focus Button */}
          <button
            onClick={onOpenPomodoro}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600/80 hover:bg-indigo-600 text-white text-xs sm:text-sm font-medium transition shadow-sm"
            title="开启 25 分钟专注番茄钟"
          >
            <Clock className="w-4 h-4 text-indigo-200 animate-spin" style={{ animationDuration: '8s' }} />
            <span className="hidden xs:inline">专注计时</span>
          </button>

          {/* Generate Plan Button */}
          <button
            onClick={() => onSelectTab('generator')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg font-medium text-xs sm:text-sm transition shadow-md ${
              activeTab === 'generator'
                ? 'bg-cyan-500 text-slate-950 font-semibold'
                : 'bg-gradient-to-r from-indigo-500 to-cyan-500 text-white hover:opacity-90'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>AI 生成计划</span>
          </button>
        </div>
      </div>
    </header>
  );
};
