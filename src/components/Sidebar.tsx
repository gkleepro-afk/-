import React from 'react';
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
  Settings
} from 'lucide-react';
import { UserStats, UserProfile } from '../types';
import { UILanguage, TRANSLATIONS } from '../utils/translations';

interface SidebarProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  stats: UserStats;
  onOpenPomodoro: () => void;
  uiLang: UILanguage;
  onChangeLang: (lang: UILanguage) => void;
  userProfile?: UserProfile;
  onOpenProfileModal?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  stats,
  onOpenPomodoro,
  uiLang,
  onChangeLang,
  userProfile,
  onOpenProfileModal,
}) => {
  const t = (key: keyof typeof TRANSLATIONS) => TRANSLATIONS[key][uiLang] || TRANSLATIONS[key].bilingual;

  const navItems = [
    { id: 'roadmap', label: t('navRoadmap'), icon: Calendar, badge: `${stats.completedTasksCount}` },
    { id: 'classroom', label: uiLang === 'zh' ? 'AI 模拟讲堂' : uiLang === 'en' ? 'AI Classroom' : 'AI 模拟讲堂 / Classroom', icon: GraduationCap, isNew: true },
    { id: 'generator', label: t('navGenerator'), icon: Sparkles, isHighlight: true },
    { id: 'examcenter', label: t('navExamCenter'), icon: Award, isNew: true },
    { id: 'photosolve', label: t('navPhotoSolve'), icon: Camera },
    { id: 'qbank', label: t('navQuestionBank'), icon: BookOpen },
    { id: 'preview', label: t('navCoursePreview'), icon: Compass },
    { id: 'flashcards', label: t('navFlashcards'), icon: Languages, badge: `${stats.reviewedCardsCount}` },
    { id: 'quiz', label: t('navQuiz'), icon: HelpCircle },
    { id: 'analytics', label: t('navAnalytics'), icon: BarChart3 },
    { id: 'userprofile', label: t('navUserProfile'), icon: Settings },
  ];


  return (
    <aside className="w-72 bg-white border-r border-slate-200 flex flex-col p-6 h-screen sticky top-0 shrink-0 z-20">
      {/* Brand Logo */}
      <div className="flex items-center gap-3 mb-6 cursor-pointer" onClick={() => onSelectTab('roadmap')}>
        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-md shadow-blue-500/20 text-white font-bold">
          <Brain className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 font-sans">
            {t('appName')}
          </h1>
          <p className="text-[11px] text-slate-400 font-medium">{t('appTagline')}</p>
        </div>
      </div>

      {/* Language Switcher */}
      <div className="mb-6 p-2 bg-slate-50 border border-slate-200 rounded-xl">
        <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 mb-1.5 px-1">
          <Globe className="w-3.5 h-3.5 text-blue-600" />
          <span>{t('languageSwitchLabel')}</span>
        </div>
        <div className="grid grid-cols-3 gap-1 bg-slate-200/60 p-1 rounded-lg text-xs font-semibold">
          <button
            onClick={() => onChangeLang('zh')}
            className={`py-1 rounded text-[11px] transition ${
              uiLang === 'zh'
                ? 'bg-white text-blue-600 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            中文
          </button>
          <button
            onClick={() => onChangeLang('en')}
            className={`py-1 rounded text-[11px] transition ${
              uiLang === 'en'
                ? 'bg-white text-blue-600 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            EN
          </button>
          <button
            onClick={() => onChangeLang('bilingual')}
            className={`py-1 rounded text-[11px] transition ${
              uiLang === 'bilingual'
                ? 'bg-white text-blue-600 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            中英双语
          </button>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-6 overflow-y-auto pr-1">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-3">
            {uiLang === 'zh' ? '智学导航' : uiLang === 'en' ? 'Study Navigation' : '智学导航 / Study Navigation'}
          </p>
          <ul className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => onSelectTab(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg font-medium text-sm transition-all duration-150 ${
                      isActive
                        ? 'text-blue-600 bg-blue-50 font-semibold shadow-xs'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-blue-600' : 'bg-transparent'}`} />
                      <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                      <span className="truncate">{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-500 shrink-0">
                        {item.badge}
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Quick Tools */}
        <div>
          <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-3">
            {uiLang === 'zh' ? '学习工具' : uiLang === 'en' ? 'Tools' : '学习工具 / Tools'}
          </p>
          <ul className="space-y-1.5">
            <li>
              <button
                onClick={onOpenPomodoro}
                className="w-full flex items-center gap-3 px-3 py-2 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-lg text-sm text-left transition"
              >
                <Clock className="w-4 h-4 text-slate-400" />
                <span>{t('navPomodoro')}</span>
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Streak Mini Banner */}
      <div className="mb-4 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/80 rounded-xl p-3 flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-sm">
          <Flame className="w-5 h-5 fill-white/20" />
        </div>
        <div>
          <p className="text-xs font-bold text-slate-900">
            {uiLang === 'zh'
              ? `连续复习 ${stats.streakDays} 天`
              : uiLang === 'en'
              ? `${stats.streakDays} Day Streak`
              : `连续复习 ${stats.streakDays} 天 / ${stats.streakDays}-Day Streak`}
          </p>
          <p className="text-[11px] text-slate-500">
            {uiLang === 'zh' ? '记忆保留率达 92%' : uiLang === 'en' ? '92% Retention Rate' : '记忆保留率 92% / 92% Retention'}
          </p>
        </div>
      </div>

      {/* User Profile (Bottom Left Direct Entry) */}
      <div className="pt-4 border-t border-slate-100">
        <button
          onClick={() => {
            if (onOpenProfileModal) {
              onOpenProfileModal();
            } else {
              onSelectTab('userprofile');
            }
          }}
          className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-slate-100/80 transition cursor-pointer group text-left border border-transparent hover:border-slate-200"
          title="点击设置个人头像、昵称、年级与偏好"
        >
          <div className="flex items-center gap-3 overflow-hidden">
            {/* User Avatar */}
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold flex items-center justify-center border-2 border-white shadow-xs shrink-0 overflow-hidden">
              {userProfile?.avatarUrl ? (
                <img src={userProfile.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
              ) : userProfile?.avatarEmoji ? (
                <span className="text-lg">{userProfile.avatarEmoji}</span>
              ) : (
                <User className="w-5 h-5 text-white" />
              )}
            </div>

            <div className="overflow-hidden">
              <p className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition truncate">
                {userProfile?.userName || '智学学子'}
              </p>
              <p className="text-[11px] text-slate-400 font-medium truncate">
                {userProfile?.gradeLevel || (uiLang === 'zh' ? '点击设置学程' : 'Click to Set Grade')}
              </p>
            </div>
          </div>

          <div className="w-8 h-8 rounded-lg bg-slate-50 group-hover:bg-blue-50 text-slate-400 group-hover:text-blue-600 flex items-center justify-center transition shrink-0">
            <Settings className="w-4 h-4" />
          </div>
        </button>
      </div>
    </aside>
  );
};

