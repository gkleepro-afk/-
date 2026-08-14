import React, { useState } from 'react';
import { 
  Calendar, 
  Sparkles, 
  Languages, 
  HelpCircle, 
  BarChart3, 
  BookOpen, 
  User, 
  Clock, 
  Brain,
  Flame,
  Globe,
  Camera,
  Compass,
  Award,
  GraduationCap,
  Settings,
  Sun,
  Moon,
  Laptop,
  Volume2,
  VolumeX,
  CloudRain,
  Radio,
  Waves
} from 'lucide-react';
import { UserStats, UserProfile } from '../types';
import { UILanguage, TRANSLATIONS } from '../utils/translations';
import { ThemeMode } from '../utils/storage';
import { soundEngine } from '../utils/audio';

interface SidebarProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  stats: UserStats;
  onOpenPomodoro: () => void;
  onOpenFeatureIntro?: () => void;
  onStartTour?: () => void;
  uiLang: UILanguage;
  onChangeLang: (lang: UILanguage) => void;
  userProfile?: UserProfile;
  onOpenProfileModal?: () => void;
  themeMode: ThemeMode;
  onChangeTheme: (mode: ThemeMode) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  stats,
  onOpenPomodoro,
  onOpenFeatureIntro,
  onStartTour,
  uiLang,
  onChangeLang,
  userProfile,
  onOpenProfileModal,
  themeMode,
  onChangeTheme,
}) => {
  const t = (key: keyof typeof TRANSLATIONS) => TRANSLATIONS[key][uiLang] || TRANSLATIONS[key].bilingual;
  const [activeAmbience, setActiveAmbience] = useState<'rain' | 'alpha' | 'waves' | null>(null);
  const [ambientVol, setAmbientVol] = useState<number>(0.3);

  const handleToggleAmbience = (type: 'rain' | 'alpha' | 'waves') => {
    if (activeAmbience === type) {
      soundEngine.stopAmbience();
      setActiveAmbience(null);
    } else {
      soundEngine.startAmbience(type, ambientVol);
      setActiveAmbience(type);
    }
  };

  const handleVolumeChange = (newVol: number) => {
    setAmbientVol(newVol);
    soundEngine.setAmbienceVolume(newVol);
  };

  // Logically structured learning navigation categories
  const navSections = [
    {
      title: uiLang === 'zh' ? '路线与规划' : uiLang === 'en' ? 'Roadmap & Plans' : '路线与规划 / Roadmap & Plans',
      items: [
        { id: 'roadmap', label: t('navRoadmap'), icon: Calendar, badge: `${stats.completedTasksCount}` },
        { id: 'generator', label: t('navGenerator'), icon: Sparkles, isHighlight: true },
      ]
    },
    {
      title: uiLang === 'zh' ? '授课与预习' : uiLang === 'en' ? 'Classroom & Pre-study' : '授课与预习 / Lectures & Preview',
      items: [
        { id: 'classroom', label: uiLang === 'zh' ? 'AI 模拟讲堂' : uiLang === 'en' ? 'AI Classroom' : 'AI 模拟讲堂 / Classroom', icon: GraduationCap, isNew: true },
        { id: 'preview', label: t('navCoursePreview'), icon: Compass },
      ]
    },
    {
      title: uiLang === 'zh' ? '刷题与考场' : uiLang === 'en' ? 'Practice & Exams' : '刷题与考场 / Practice & Exams',
      items: [
        { id: 'examcenter', label: t('navExamCenter'), icon: Award, isNew: true },
        { id: 'photosolve', label: t('navPhotoSolve'), icon: Camera },
        { id: 'qbank', label: t('navQuestionBank'), icon: BookOpen },
        { id: 'quiz', label: t('navQuiz'), icon: HelpCircle },
      ]
    },
    {
      title: uiLang === 'zh' ? '记忆与学情' : uiLang === 'en' ? 'Memory & Analytics' : '记忆与学情 / Memory & Analytics',
      items: [
        { id: 'flashcards', label: t('navFlashcards'), icon: Languages, badge: `${stats.reviewedCardsCount}` },
        { id: 'analytics', label: t('navAnalytics'), icon: BarChart3 },
      ]
    },
  ];

  return (
    <aside className="w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col p-5 h-screen sticky top-0 shrink-0 z-20 transition-colors duration-200">
      {/* Brand Logo */}
      <div className="flex items-center gap-3 mb-5 cursor-pointer" onClick={() => onSelectTab('roadmap')}>
        <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-md shadow-blue-500/20 text-white font-bold shrink-0">
          <Brain className="w-6 h-6 text-white" />
        </div>
        <div className="overflow-hidden">
          <div className="flex items-center gap-1.5">
            <h1 className="text-lg font-black tracking-tight text-slate-900 dark:text-white font-sans truncate">
              {t('appName')}
            </h1>
            <span className="text-[9px] font-black uppercase px-1.5 py-0.5 rounded bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-700/50">
              AI
            </span>
          </div>
          <p className="text-[10px] text-slate-400 dark:text-slate-400 font-medium truncate">{t('appTagline')}</p>
        </div>
      </div>

      {/* Language & Theme Controls */}
      <div className="mb-4 space-y-2">
        {/* Language Switcher */}
        <div className="p-1.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 rounded-xl">
          <div className="flex items-center justify-between text-[10px] font-bold text-slate-500 dark:text-slate-400 mb-1 px-1">
            <div className="flex items-center gap-1">
              <Globe className="w-3 h-3 text-blue-600 dark:text-blue-400" />
              <span>{t('languageSwitchLabel')}</span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-1 bg-slate-200/70 dark:bg-slate-900/80 p-0.5 rounded-lg text-xs font-semibold">
            <button
              onClick={() => onChangeLang('zh')}
              className={`py-1 rounded text-[11px] transition cursor-pointer ${
                uiLang === 'zh'
                  ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-xs font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              中文
            </button>
            <button
              onClick={() => onChangeLang('en')}
              className={`py-1 rounded text-[11px] transition cursor-pointer ${
                uiLang === 'en'
                  ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-xs font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => onChangeLang('bilingual')}
              className={`py-1 rounded text-[11px] transition cursor-pointer ${
                uiLang === 'bilingual'
                  ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-xs font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              双语
            </button>
          </div>
        </div>

        {/* Theme Mode Switcher */}
        <div className="p-1.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 rounded-xl">
          <div className="flex items-center justify-between text-[10px] font-bold text-slate-500 dark:text-slate-400 mb-1 px-1">
            <div className="flex items-center gap-1">
              {themeMode === 'dark' ? <Moon className="w-3 h-3 text-indigo-400" /> : <Sun className="w-3 h-3 text-amber-500" />}
              <span>{uiLang === 'en' ? 'Appearance' : '深浅护眼外观'}</span>
            </div>
            <span className="text-[9px] text-slate-400">{themeMode === 'dark' ? '深色' : themeMode === 'light' ? '浅色' : '自动'}</span>
          </div>
          <div className="grid grid-cols-3 gap-1 bg-slate-200/70 dark:bg-slate-900/80 p-0.5 rounded-lg text-xs font-semibold">
            <button
              onClick={() => onChangeTheme('light')}
              className={`py-1 rounded text-[11px] flex items-center justify-center gap-1 transition cursor-pointer ${
                themeMode === 'light'
                  ? 'bg-white dark:bg-slate-800 text-amber-600 dark:text-amber-400 shadow-xs font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
              title="亮色日间模式"
            >
              <Sun className="w-3 h-3" />
              <span>{uiLang === 'en' ? 'Light' : '浅色'}</span>
            </button>
            <button
              onClick={() => onChangeTheme('dark')}
              className={`py-1 rounded text-[11px] flex items-center justify-center gap-1 transition cursor-pointer ${
                themeMode === 'dark'
                  ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-xs font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
              title="夜间护眼深色模式"
            >
              <Moon className="w-3 h-3" />
              <span>{uiLang === 'en' ? 'Dark' : '暗黑'}</span>
            </button>
            <button
              onClick={() => onChangeTheme('system')}
              className={`py-1 rounded text-[11px] flex items-center justify-center gap-1 transition cursor-pointer ${
                themeMode === 'system'
                  ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-xs font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
              title="跟随操作系统自动切换"
            >
              <Laptop className="w-3 h-3" />
              <span>{uiLang === 'en' ? 'Auto' : '跟随'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-4 overflow-y-auto pr-1">
        {navSections.map((section, sIdx) => (
          <div key={sIdx} className="space-y-1">
            <p className="text-[10px] uppercase tracking-wider text-slate-400 dark:text-slate-500 font-bold px-2 py-0.5">
              {section.title}
            </p>
            <ul className="space-y-0.5">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => onSelectTab(item.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl font-medium text-sm transition-all duration-150 cursor-pointer ${
                        isActive
                          ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 font-bold shadow-xs border border-blue-200/50 dark:border-blue-800/60'
                          : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-blue-600 dark:bg-blue-400' : 'bg-transparent'}`} />
                        <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 dark:text-slate-400'}`} />
                        <span className="truncate text-[13px]">{item.label}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {item.isNew && (
                          <span className="text-[9px] font-extrabold px-1.5 py-0.2 rounded bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-300 shrink-0 uppercase tracking-tight">
                            NEW
                          </span>
                        )}
                        {item.badge && (
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 shrink-0">
                            {item.badge}
                          </span>
                        )}
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}

        {/* Focus Sound / White Noise Generator */}
        <div className="pt-1">
          <p className="text-[10px] uppercase tracking-wider text-slate-400 dark:text-slate-500 font-bold px-2 py-1 flex items-center justify-between">
            <span>{uiLang === 'en' ? 'Study Ambience' : '沉浸专注白噪音'}</span>
            {activeAmbience && <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />}
          </p>
          <div className="p-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 rounded-xl space-y-1.5">
            <div className="grid grid-cols-3 gap-1">
              <button
                type="button"
                onClick={() => handleToggleAmbience('rain')}
                className={`py-1.5 px-1 rounded-lg text-[10px] font-bold flex flex-col items-center gap-0.5 transition cursor-pointer ${
                  activeAmbience === 'rain'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white dark:bg-slate-700/70 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
                title="舒缓雨声白噪音"
              >
                <CloudRain className="w-3.5 h-3.5" />
                <span>雨声</span>
              </button>
              <button
                type="button"
                onClick={() => handleToggleAmbience('alpha')}
                className={`py-1.5 px-1 rounded-lg text-[10px] font-bold flex flex-col items-center gap-0.5 transition cursor-pointer ${
                  activeAmbience === 'alpha'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-white dark:bg-slate-700/70 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
                title="14Hz 脑波双耳节律专注音"
              >
                <Radio className="w-3.5 h-3.5" />
                <span>脑波</span>
              </button>
              <button
                type="button"
                onClick={() => handleToggleAmbience('waves')}
                className={`py-1.5 px-1 rounded-lg text-[10px] font-bold flex flex-col items-center gap-0.5 transition cursor-pointer ${
                  activeAmbience === 'waves'
                    ? 'bg-teal-600 text-white shadow-xs'
                    : 'bg-white dark:bg-slate-700/70 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
                title="海浪潮汐静心"
              >
                <Waves className="w-3.5 h-3.5" />
                <span>潮汐</span>
              </button>
            </div>

            {activeAmbience && (
              <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-200 dark:border-slate-700 text-[10px] text-slate-500 dark:text-slate-400">
                <Volume2 className="w-3 h-3 text-slate-400" />
                <input
                  type="range"
                  min="0.05"
                  max="0.8"
                  step="0.05"
                  value={ambientVol}
                  onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                  className="w-full h-1 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <button
                  type="button"
                  onClick={() => handleToggleAmbience(activeAmbience)}
                  className="text-rose-500 hover:text-rose-600 shrink-0 font-bold"
                  title="关闭白噪音"
                >
                  <VolumeX className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Quick Tools & Help */}
        <div className="pt-1">
          <p className="text-[10px] uppercase tracking-wider text-slate-400 dark:text-slate-500 font-bold px-2 py-1">
            {uiLang === 'zh' ? '学习工具与指引' : uiLang === 'en' ? 'Tools & Guides' : '学习工具与指引 / Tools & Guides'}
          </p>
          <ul className="space-y-1">
            <li>
              <button
                onClick={onOpenPomodoro}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white rounded-xl text-sm text-left transition cursor-pointer"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-transparent" />
                <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="text-[13px]">{t('navPomodoro')}</span>
              </button>
            </li>
            {onOpenFeatureIntro && (
              <li>
                <button
                  onClick={onOpenFeatureIntro}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50/70 dark:hover:bg-blue-950/40 rounded-xl text-sm text-left transition font-medium cursor-pointer"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  <HelpCircle className="w-4 h-4 text-blue-500 shrink-0" />
                  <span className="text-[13px]">{uiLang === 'en' ? 'Feature Overview' : '💡 新手功能全景指引'}</span>
                </button>
              </li>
            )}
            {onStartTour && (
              <li>
                <button
                  onClick={onStartTour}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50/70 dark:hover:bg-indigo-950/40 rounded-xl text-sm text-left transition font-medium cursor-pointer"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                  <Sparkles className="w-4 h-4 text-indigo-500 shrink-0" />
                  <span className="text-[13px]">{uiLang === 'en' ? 'Interactive Tour' : '🚀 核心模块分步漫游'}</span>
                </button>
              </li>
            )}
          </ul>
        </div>
      </nav>

      {/* Streak Mini Banner -> clickable to open achievements */}
      <div 
        onClick={() => {
          if (onOpenProfileModal) {
            onOpenProfileModal();
          } else {
            onSelectTab('userprofile');
          }
        }}
        className="mb-3 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/40 dark:to-orange-950/40 hover:from-amber-100 hover:to-orange-100 dark:hover:from-amber-900/50 dark:hover:to-orange-900/50 border border-amber-200/80 dark:border-amber-700/50 rounded-2xl p-3 flex items-center justify-between gap-3 cursor-pointer transition shadow-xs group"
        title="点击查看成就勋章与连续学习里程碑"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
            <Flame className="w-5 h-5 fill-white/20" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <p className="text-xs font-bold text-slate-900 dark:text-amber-200">
                {uiLang === 'zh'
                  ? `连续打卡 ${stats.streakDays} 天`
                  : uiLang === 'en'
                  ? `${stats.streakDays} Day Streak`
                  : `连续打卡 ${stats.streakDays} 天 / ${stats.streakDays}-Day Streak`}
              </p>
              <span className="text-[9px] font-black bg-amber-200 dark:bg-amber-800 text-amber-900 dark:text-amber-200 px-1 rounded">🏆 勋章</span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              {uiLang === 'zh' ? '连续3/7/14天解锁勋章' : uiLang === 'en' ? 'Unlock badges at 3/7/14 days' : '连续3/7/14天解锁勋章'}
            </p>
          </div>
        </div>
      </div>

      {/* User Profile (Bottom Left Direct Entry) */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
        <button
          onClick={() => {
            if (onOpenProfileModal) {
              onOpenProfileModal();
            } else {
              onSelectTab('userprofile');
            }
          }}
          className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-slate-100/80 dark:hover:bg-slate-800 transition cursor-pointer group text-left border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
          title="点击设置个人头像、昵称、年级与偏好"
        >
          <div className="flex items-center gap-2.5 overflow-hidden">
            {/* User Avatar */}
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold flex items-center justify-center border-2 border-white dark:border-slate-700 shadow-xs shrink-0 overflow-hidden">
              {userProfile?.avatarUrl ? (
                <img src={userProfile.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
              ) : userProfile?.avatarEmoji ? (
                <span className="text-base">{userProfile.avatarEmoji}</span>
              ) : (
                <User className="w-4 h-4 text-white" />
              )}
            </div>

            <div className="overflow-hidden">
              <p className="text-xs font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition truncate">
                {userProfile?.userName || '智学学子'}
              </p>
              <p className="text-[10px] text-slate-400 dark:text-slate-400 font-medium truncate">
                {userProfile?.gradeLevel || (uiLang === 'zh' ? '点击设置学程' : 'Click to Set Grade')}
              </p>
            </div>
          </div>

          <div className="w-7 h-7 rounded-lg bg-slate-50 dark:bg-slate-800 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/40 text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 flex items-center justify-center transition shrink-0">
            <Settings className="w-3.5 h-3.5" />
          </div>
        </button>
      </div>
    </aside>
  );
};


