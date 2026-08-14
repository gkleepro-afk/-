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
  onOpenFeatureIntro?: () => void;
  onStartTour?: () => void;
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
  onOpenFeatureIntro,
  onStartTour,
  uiLang,
  onChangeLang,
  userProfile,
  onOpenProfileModal,
}) => {
  const t = (key: keyof typeof TRANSLATIONS) => TRANSLATIONS[key][uiLang] || TRANSLATIONS[key].bilingual;

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
      <nav className="flex-1 space-y-5 overflow-y-auto pr-1">
        {navSections.map((section, sIdx) => (
          <div key={sIdx} className="space-y-1">
            <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold px-2 py-1">
              {section.title}
            </p>
            <ul className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => onSelectTab(item.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg font-medium text-sm transition-all duration-150 ${
                        isActive
                          ? 'text-blue-600 bg-blue-50 font-semibold shadow-xs'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-blue-600' : 'bg-transparent'}`} />
                        <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                        <span className="truncate text-[13px]">{item.label}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {item.isNew && (
                          <span className="text-[9px] font-extrabold px-1.5 py-0.2 rounded bg-amber-100 text-amber-700 shrink-0 uppercase tracking-tight">
                            NEW
                          </span>
                        )}
                        {item.badge && (
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 shrink-0">
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

        {/* Quick Tools & Help */}
        <div className="pt-1">
          <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold px-2 py-1">
            {uiLang === 'zh' ? '学习工具与指引' : uiLang === 'en' ? 'Tools & Guides' : '学习工具与指引 / Tools & Guides'}
          </p>
          <ul className="space-y-1">
            <li>
              <button
                onClick={onOpenPomodoro}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-lg text-sm text-left transition cursor-pointer"
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
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-blue-600 hover:bg-blue-50/70 rounded-lg text-sm text-left transition font-medium cursor-pointer"
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
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-indigo-600 hover:bg-indigo-50/70 rounded-lg text-sm text-left transition font-medium cursor-pointer"
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
        className="mb-4 bg-gradient-to-r from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100 border border-amber-200/80 rounded-xl p-3 flex items-center justify-between gap-3 cursor-pointer transition shadow-xs group"
        title="点击查看成就勋章与连续学习里程碑"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
            <Flame className="w-5 h-5 fill-white/20" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <p className="text-xs font-bold text-slate-900">
                {uiLang === 'zh'
                  ? `连续打卡 ${stats.streakDays} 天`
                  : uiLang === 'en'
                  ? `${stats.streakDays} Day Streak`
                  : `连续打卡 ${stats.streakDays} 天 / ${stats.streakDays}-Day Streak`}
              </p>
              <span className="text-[9px] font-black bg-amber-200 text-amber-900 px-1 rounded">🏆 勋章</span>
            </div>
            <p className="text-[11px] text-slate-500">
              {uiLang === 'zh' ? '连续3/7/14天解锁勋章' : uiLang === 'en' ? 'Unlock badges at 3/7/14 days' : '连续3/7/14天解锁勋章'}
            </p>
          </div>
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

