import React, { useState } from 'react';
import { 
  X, 
  User, 
  GraduationCap, 
  Globe, 
  BookOpen, 
  Target, 
  Clock, 
  Sparkles, 
  Check, 
  Smile, 
  Heart, 
  Zap, 
  Award,
  Layers,
  Flame,
  Crown,
  Star,
  ShieldCheck,
  Trophy
} from 'lucide-react';
import { UserProfile, UserStats, Achievement } from '../types';
import { UILanguage, TRANSLATIONS } from '../utils/translations';
import { SYSTEM_ACHIEVEMENTS, getAchievementsWithProgress } from '../data/achievements';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfile;
  userStats?: UserStats;
  onSaveProfile: (profile: UserProfile) => void;
  onPreviewAchievement?: (achievement: Achievement) => void;
  uiLang: UILanguage;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  userProfile,
  userStats,
  onSaveProfile,
  onPreviewAchievement,
  uiLang,
}) => {
  if (!isOpen) return null;

  const t = (key: keyof typeof TRANSLATIONS) => TRANSLATIONS[key][uiLang] || TRANSLATIONS[key].bilingual;

  const [activeModalTab, setActiveModalTab] = useState<'profile' | 'achievements'>('profile');

  const [userName, setUserName] = useState(userProfile.userName);
  const [avatarEmoji, setAvatarEmoji] = useState(userProfile.avatarEmoji || '🎓');
  const [avatarUrl, setAvatarUrl] = useState(userProfile.avatarUrl || '');
  const [gradeLevel, setGradeLevel] = useState(userProfile.gradeLevel);
  const [semester, setSemester] = useState(userProfile.semester || '上学期');
  const [countryRegion, setCountryRegion] = useState(userProfile.countryRegion);
  const [educationSystem, setEducationSystem] = useState(userProfile.educationSystem);
  const [targetLanguage, setTargetLanguage] = useState(userProfile.targetLanguage);
  const [targetExam, setTargetExam] = useState(userProfile.targetExam);
  const [dailyGoalMinutes, setDailyGoalMinutes] = useState(userProfile.dailyGoalMinutes);
  const [encouragementTone, setEncouragementTone] = useState(userProfile.encouragementTone);
  const [customMotto, setCustomMotto] = useState(userProfile.customMotto);
  const [activeTitle, setActiveTitle] = useState(userProfile.activeTitle || '自律新星');

  const [savedSuccess, setSavedSuccess] = useState(false);

  const statsFallback: UserStats = userStats || {
    totalStudyMinutes: 135,
    streakDays: 4,
    lastStudyDate: new Date().toISOString().split('T')[0],
    completedTasksCount: 12,
    reviewedCardsCount: 38,
    quizzesTakenCount: 5,
    averageQuizScore: 88,
    subjectProgress: {},
    unlockedAchievements: ['ach-streak-3'],
    totalExp: 450,
  };

  const achievementList = getAchievementsWithProgress(statsFallback);
  const unlockedCount = achievementList.filter(a => a.unlocked).length;
  const totalExp = statsFallback.totalExp || (statsFallback.streakDays * 50 + statsFallback.completedTasksCount * 20);

  const PRESET_AVATARS = [
    { emoji: '🎓', name: uiLang === 'en' ? 'Scholar Cap' : '学霸帽子' },
    { emoji: '🚀', name: uiLang === 'en' ? 'Rocket' : '冲刺火箭' },
    { emoji: '🦊', name: uiLang === 'en' ? 'Agile Fox' : '敏捷灵狐' },
    { emoji: '🦉', name: uiLang === 'en' ? 'Wise Owl' : '睿智猫头鹰' },
    { emoji: '⚡', name: uiLang === 'en' ? 'Lightning' : '闪电提分' },
    { emoji: '🌸', name: uiLang === 'en' ? 'Sakura' : '温情樱花' },
    { emoji: '🦁', name: uiLang === 'en' ? 'Brave Lion' : '霸气雄狮' },
    { emoji: '📚', name: uiLang === 'en' ? 'Book Lover' : '万卷书狂' },
    { emoji: '🎨', name: uiLang === 'en' ? 'Creative' : '创意灵感' },
    { emoji: '🏆', name: uiLang === 'en' ? 'Trophy' : '夺冠金杯' },
  ];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: UserProfile = {
      userName: userName.trim() || (uiLang === 'en' ? 'AI Scholar' : '智学学子'),
      avatarEmoji,
      avatarUrl: avatarUrl.trim(),
      gradeLevel,
      semester,
      countryRegion,
      educationSystem,
      targetLanguage,
      targetExam: targetExam.trim() || (uiLang === 'en' ? 'Exam Prep' : '备考冲刺'),
      dailyGoalMinutes,
      encouragementTone,
      customMotto: customMotto.trim(),
      activeTitle,
    };
    onSaveProfile(updated);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 800);
  };

  const handleEquipTitle = (title: string) => {
    setActiveTitle(title);
    const updated: UserProfile = {
      ...userProfile,
      activeTitle: title,
    };
    onSaveProfile(updated);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-8 text-slate-900 dark:text-slate-100 transition-colors duration-200">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/30">
              <User className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-white">{t('profileModalTitle')}</h3>
                {activeTitle && (
                  <span className="px-2 py-0.5 rounded-full bg-amber-400/20 border border-amber-400/50 text-amber-300 text-[10px] font-black tracking-wider flex items-center gap-1">
                    <Crown className="w-3 h-3 text-amber-400" />
                    {activeTitle}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {t('profileModalDesc')}
              </p>
            </div>
          </div>

          {/* Modal Sub Tabs */}
          <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={() => setActiveModalTab('profile')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                activeModalTab === 'profile'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>{uiLang === 'en' ? 'Profile Settings' : '基础资料与学情'}</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveModalTab('achievements')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                activeModalTab === 'achievements'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black shadow-md'
                  : 'bg-slate-800 text-amber-400 hover:text-amber-300'
              }`}
            >
              <Trophy className="w-3.5 h-3.5" />
              <span>{uiLang === 'en' ? `Achievements (${unlockedCount}/${achievementList.length})` : `🏆 成就勋章馆 (${unlockedCount}/${achievementList.length})`}</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Profile Settings Form */}
        {activeModalTab === 'profile' ? (
          <form onSubmit={handleSave} className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
            
            {/* Section 1: Basic & Avatar */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 border-b border-slate-100 dark:border-slate-800 pb-2 flex items-center gap-1.5">
                <User className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                {t('avatarHeader')}
              </h4>

              {/* Avatar Selector Block */}
              <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 space-y-3">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                  {t('chooseAvatarLabel')}
                </label>

                <div className="flex flex-wrap items-center gap-3">
                  {/* Preview Avatar */}
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-2xl shadow-md border-2 border-white dark:border-slate-700 shrink-0 overflow-hidden">
                    {avatarUrl ? (
                      <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <span>{avatarEmoji}</span>
                    )}
                  </div>

                  {/* Preset Emoji Picker */}
                  <div className="flex-1 flex flex-wrap gap-2">
                    {PRESET_AVATARS.map((item) => (
                      <button
                        key={item.emoji}
                        type="button"
                        onClick={() => {
                          setAvatarEmoji(item.emoji);
                          setAvatarUrl('');
                        }}
                        title={item.name}
                        className={`w-9 h-9 rounded-xl text-lg flex items-center justify-center transition cursor-pointer border ${
                          !avatarUrl && avatarEmoji === item.emoji
                            ? 'bg-blue-600 border-blue-600 text-white shadow-md scale-110'
                            : 'bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-650 text-slate-700 dark:text-slate-200'
                        }`}
                      >
                        {item.emoji}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Optional Custom Image URL */}
                <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700">
                  <input
                    type="text"
                    value={avatarUrl}
                    onChange={(e) => setAvatarUrl(e.target.value)}
                    placeholder={uiLang === 'en' ? 'Or paste custom Avatar Image URL (optional)' : '或粘贴网络自定义头像图片 URL 地址 (可选)'}
                    className="w-full bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white rounded-xl p-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    {t('userNameLabel')}
                  </label>
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder={uiLang === 'en' ? 'e.g. Alex, Scholar' : '如：张同学、智学学子'}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    {t('gradeSelectLabel')}
                  </label>
                  <select
                    value={gradeLevel}
                    onChange={(e) => setGradeLevel(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="初一">{uiLang === 'en' ? 'Grade 7 / Middle School 1' : '初一 / 基础建立 (Grade 7)'}</option>
                    <option value="初二">{uiLang === 'en' ? 'Grade 8 / Middle School 2' : '初二 / 知识巩固 (Grade 8)'}</option>
                    <option value="初三/中考">{uiLang === 'en' ? 'Grade 9 / Senior High Entrance Exam' : '初三 / 中考冲刺 (Grade 9)'}</option>
                    <option value="高一">{uiLang === 'en' ? 'Grade 10 / High School 1' : '高一 / 学科衔接 (Grade 10)'}</option>
                    <option value="高二">{uiLang === 'en' ? 'Grade 11 / High School 2' : '高二 / 难点突破 (Grade 11)'}</option>
                    <option value="高三/高考">{uiLang === 'en' ? 'Grade 12 / College Entrance Exam' : '高三 / 高考冲刺 (Grade 12)'}</option>
                    <option value="国际高中 (AP/A-Level)">{uiLang === 'en' ? 'Intl High School (AP/A-Level/IB)' : '国际高中 (AP/A-Level/IB)'}</option>
                    <option value="大学/研究生/自学">{uiLang === 'en' ? 'University / Self-Study' : '大学 / 进阶考研 / 技能自学'}</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1 flex items-center justify-between">
                    <span>{t('semesterSelectLabel')}</span>
                    <span className="text-[10px] text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/40 px-1.5 py-0.5 rounded font-semibold border border-blue-100 dark:border-blue-800">
                      {uiLang === 'en' ? 'Aligned' : '精准匹配考纲'}
                    </span>
                  </label>
                  <select
                    value={semester}
                    onChange={(e) => setSemester(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                  >
                    <option value="上学期">{uiLang === 'en' ? 'Term 1 / Fall Semester' : '秋季 · 上学期 (1st Semester)'}</option>
                    <option value="下学期">{uiLang === 'en' ? 'Term 2 / Spring Semester' : '春季 · 下学期 (2nd Semester)'}</option>
                    <option value="全学年/中高考复习">{uiLang === 'en' ? 'Full Year / Comprehensive Review' : '全学年 / 毕业考中高考总复习'}</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Section 2: Country, System & Exam Goal */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 border-b border-slate-100 dark:border-slate-800 pb-2 flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                {t('gradeHeader')}
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    {t('countrySelectLabel')}
                  </label>
                  <select
                    value={countryRegion}
                    onChange={(e) => setCountryRegion(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="中国大陆">中国大陆 (Mainland China)</option>
                    <option value="中国香港">中国香港 (Hong Kong DSE)</option>
                    <option value="中国台湾">中国台湾 (Taiwan GSAT)</option>
                    <option value="美国">美国 (USA AP/SAT/ACT)</option>
                    <option value="英国">英国 (UK IGCSE/A-Level)</option>
                    <option value="新加坡">新加坡 (Singapore O/A Level)</option>
                    <option value="其他地区">其他国际体制 (International)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    {t('eduSystemLabel')}
                  </label>
                  <select
                    value={educationSystem}
                    onChange={(e) => setEducationSystem(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="人教版 (新高考新教材)">人教版 (新高考/新中考)</option>
                    <option value="粤教版 / 广东卷">粤教版 / 广东省卷</option>
                    <option value="苏教版 / 江苏卷">苏教版 / 江苏卷</option>
                    <option value="沪教版 / 上海卷">沪教版 / 上海卷</option>
                    <option value="浙教版 / 浙江卷">浙教版 / 浙江卷</option>
                    <option value="鲁教版 / 山东卷">鲁教版 / 山东卷</option>
                    <option value="全国卷通用">全国卷通用教材</option>
                    <option value="AP/SAT/IB 体系">AP / SAT / IB 国际体系</option>
                    <option value="IGCSE / A-Level 体系">IGCSE / A-Level 体系</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    {t('cardLangLabel')}
                  </label>
                  <select
                    value={targetLanguage}
                    onChange={(e) => setTargetLanguage(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="英语">英语 (English)</option>
                    <option value="日语">日语 (Japanese JLPT)</option>
                    <option value="法语">法语 (French)</option>
                    <option value="德语">德语 (German)</option>
                    <option value="西班牙语">西班牙语 (Spanish)</option>
                    <option value="中文">中文 (Chinese)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    {t('targetExamLabel')}
                  </label>
                  <input
                    type="text"
                    value={targetExam}
                    onChange={(e) => setTargetExam(e.target.value)}
                    placeholder={uiLang === 'en' ? 'e.g., College Prep, IELTS 7.0, Midterm' : '如：2026年全国高考、中考、雅思7.0'}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Section 3: Daily Goal & Encouragement Style */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 border-b border-slate-100 dark:border-slate-800 pb-2 flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-rose-500" />
                {t('goalHeader')}
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-blue-500" />
                    {t('dailyGoalLabel')}
                  </label>
                  <select
                    value={dailyGoalMinutes}
                    onChange={(e) => setDailyGoalMinutes(Number(e.target.value))}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value={15}>15 {uiLang === 'en' ? 'Mins (Micro Study)' : '分钟 (轻量微学习)'}</option>
                    <option value={30}>30 {uiLang === 'en' ? 'Mins (Standard Mode)' : '分钟 (标准高效模式)'}</option>
                    <option value={45}>45 {uiLang === 'en' ? 'Mins (Deep Focus)' : '分钟 (深度提分模式)'}</option>
                    <option value={60}>60 {uiLang === 'en' ? 'Mins (Sprint Mode)' : '分钟 (高强冲刺模式)'}</option>
                    <option value={90}>90 {uiLang === 'en' ? 'Mins (Intensive Study)' : '分钟 (学霸爆刷模式)'}</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    {t('encouragementToneLabel')}
                  </label>
                  <select
                    value={encouragementTone}
                    onChange={(e) => setEncouragementTone(e.target.value as any)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="passionate">🔥 {uiLang === 'en' ? 'Passionate & High Score' : '激情霸气型 (冲刺高分，热血沸腾)'}</option>
                    <option value="gentle">🌸 {uiLang === 'en' ? 'Gentle & Encouraging' : '温柔陪伴型 (贴心温暖，润物无声)'}</option>
                    <option value="humorous">😄 {uiLang === 'en' ? 'Humorous & Fun' : '幽默风趣型 (轻松解压，梗图提分)'}</option>
                    <option value="academic">📖 {uiLang === 'en' ? 'Academic & Rigorous' : '严谨学术型 (名言金句，名师指点)'}</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  {t('customMottoLabel')}
                </label>
                <textarea
                  rows={2}
                  value={customMotto}
                  onChange={(e) => setCustomMotto(e.target.value)}
                  placeholder={uiLang === 'en' ? 'e.g. Aim for the moon. Even if you miss, you\'ll land among the stars!' : '如：星光不问赶路人，岁月不负有心人！'}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Live Dynamic Preview Card */}
            <div className="bg-gradient-to-r from-blue-50 via-slate-50 to-indigo-50 dark:from-slate-800/80 dark:via-slate-800/50 dark:to-indigo-950/40 border border-blue-200/60 dark:border-slate-700 p-4 rounded-xl">
              <h5 className="text-xs font-bold text-blue-900 dark:text-blue-300 flex items-center gap-1.5 mb-2">
                <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                {uiLang === 'en' ? 'Real-time Adaptation Preview' : '适配效果实时预览'}
              </h5>
              <div className="text-xs text-slate-600 dark:text-slate-300 space-y-1">
                <p>🎯 <strong className="text-slate-800 dark:text-white">{uiLang === 'en' ? 'Questions & Roadmap:' : '题目推荐：'}</strong> {uiLang === 'en' ? `Automatically aligned with [${countryRegion} · ${gradeLevel} · ${educationSystem}].` : `将自动优先推送符合【${countryRegion} · ${gradeLevel} · ${educationSystem}】的考点。`}</p>
                <p>⚡ <strong className="text-slate-800 dark:text-white">{uiLang === 'en' ? 'Exam Center:' : '试卷中心：'}</strong> {uiLang === 'en' ? `Strictly matched with target exams for [${gradeLevel}].` : `匹配【${targetExam}】的全真真题卷与 AI 组卷试题。`}</p>
              </div>
            </div>

            {/* Submit */}
            <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 text-sm font-bold transition cursor-pointer"
              >
                {uiLang === 'en' ? 'Cancel' : '取消'}
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold transition shadow-lg shadow-blue-500/20 flex items-center gap-2 cursor-pointer"
              >
                {savedSuccess ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-300 animate-bounce" />
                    <span>{uiLang === 'en' ? 'Saved Successfully!' : '已保存更新！'}</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>{t('saveProfileBtn')}</span>
                  </>
                )}
              </button>
            </div>

          </form>
        ) : (
          /* Tab 2: Achievements Hall */
          <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
            
            {/* Top Summary Banner */}
            <div className="bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-purple-500/15 border border-amber-300/40 dark:border-amber-500/30 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-3xl shadow-lg shadow-amber-500/30 text-white">
                  🏆
                </div>
                <div>
                  <h4 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                    <span>{uiLang === 'en' ? 'Achievement Showcase' : '智学成就勋章馆'}</span>
                    <span className="px-2 py-0.5 bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 text-[11px] font-black rounded-full border border-amber-200 dark:border-amber-800">
                      {unlockedCount} / {achievementList.length} {uiLang === 'en' ? 'Unlocked' : '已解锁'}
                    </span>
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {uiLang === 'en'
                      ? 'Reach 3, 7, and 14 days of study streak to unlock exclusive shiny badges!'
                      : '连续学习达成 3天、7天、14天等里程碑，将触发酷炫成就奖励动画！'}
                  </p>
                </div>
              </div>

              {/* Total EXP Box */}
              <div className="bg-white dark:bg-slate-800 border border-amber-200 dark:border-amber-900/50 rounded-xl px-4 py-2.5 shadow-xs text-center shrink-0 w-full sm:w-auto">
                <div className="text-[10px] uppercase tracking-wider text-slate-400 dark:text-slate-400 font-bold">{uiLang === 'en' ? 'Total EXP' : '累计经验'}</div>
                <div className="text-xl font-black text-amber-600 dark:text-amber-400 flex items-center justify-center gap-1">
                  <span>⚡ {totalExp}</span>
                  <span className="text-xs font-bold text-slate-400">EXP</span>
                </div>
              </div>
            </div>

            {/* Streak Milestones Highlight Grid */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h5 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-amber-500" />
                  <span>{uiLang === 'en' ? 'Streak Milestones (3 / 7 / 14 / 30 Days)' : '核心连续学习打卡里程碑 (3 / 7 / 14 / 30 天)'}</span>
                </h5>
                <span className="text-xs font-bold text-amber-600 dark:text-amber-400">
                  {uiLang === 'en' ? `Current Streak: ${statsFallback.streakDays} Days` : `当前连击：${statsFallback.streakDays} 天 🔥`}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {achievementList.filter(a => a.category === 'streak').map((ach) => {
                  const isCurrentUnlocked = ach.unlocked;
                  return (
                    <div
                      key={ach.id}
                      className={`relative p-4 rounded-2xl border transition-all duration-200 overflow-hidden ${
                        isCurrentUnlocked
                          ? 'bg-gradient-to-br from-amber-50/80 via-white to-orange-50/50 dark:from-amber-950/20 dark:via-slate-850 dark:to-orange-950/20 border-amber-300 dark:border-amber-700/60 shadow-sm'
                          : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200/80 dark:border-slate-700 opacity-80'
                      }`}
                    >
                      {/* Top Row: Icon & Status */}
                      <div className="flex items-start justify-between gap-3 mb-2.5">
                        <div className="flex items-center gap-3">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-xs border ${
                            isCurrentUnlocked
                              ? 'bg-gradient-to-b from-amber-100 to-amber-200 dark:from-amber-900/60 dark:to-amber-800/60 border-amber-300 dark:border-amber-600'
                              : 'bg-slate-200 dark:bg-slate-700 border-slate-300 dark:border-slate-600 grayscale'
                          }`}>
                            {ach.icon}
                          </div>
                          <div>
                            <h6 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                              {uiLang === 'en' && ach.titleEn ? ach.titleEn : ach.title}
                            </h6>
                            <div className="text-[11px] text-amber-700 dark:text-amber-400 font-semibold mt-0.5 flex items-center gap-1">
                              <span>👑 {ach.rewardTitle}</span>
                              <span className="text-slate-400">·</span>
                              <span>+{ach.rewardExp} EXP</span>
                            </div>
                          </div>
                        </div>

                        {/* Unlocked / Locked Tag */}
                        {isCurrentUnlocked ? (
                          <span className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-[10px] font-black rounded-full flex items-center gap-1 shrink-0 border border-emerald-200 dark:border-emerald-800">
                            <Check className="w-3 h-3" />
                            {uiLang === 'en' ? 'Unlocked' : '已解锁'}
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-[10px] font-bold rounded-full shrink-0">
                            {ach.progress}/{ach.progressMax} {uiLang === 'en' ? 'Days' : '天'}
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                        {uiLang === 'en' && ach.descriptionEn ? ach.descriptionEn : ach.description}
                      </p>

                      {/* Progress Bar */}
                      <div className="w-full bg-slate-200/80 dark:bg-slate-700 rounded-full h-2 mb-3 overflow-hidden">
                        <div
                          className={`h-full transition-all duration-500 ${
                            isCurrentUnlocked
                              ? 'bg-gradient-to-r from-amber-500 to-orange-500'
                              : 'bg-blue-500'
                          }`}
                          style={{ width: `${Math.min(100, (ach.progress / ach.progressMax) * 100)}%` }}
                        />
                      </div>

                      {/* Action buttons on Card */}
                      <div className="flex items-center justify-between pt-1 border-t border-slate-100 dark:border-slate-750">
                        {isCurrentUnlocked && (
                          <button
                            type="button"
                            onClick={() => handleEquipTitle(ach.rewardTitle)}
                            className={`text-xs font-bold px-2.5 py-1 rounded-lg transition cursor-pointer ${
                              activeTitle === ach.rewardTitle
                                ? 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-700'
                                : 'bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200'
                            }`}
                          >
                            {activeTitle === ach.rewardTitle ? '✓ 已佩戴此头衔' : '佩戴此头衔'}
                          </button>
                        )}
                        
                        {/* Interactive Animation Preview Trigger */}
                        {onPreviewAchievement && (
                          <button
                            type="button"
                            onClick={() => onPreviewAchievement(ach)}
                            className="text-xs font-bold text-amber-700 dark:text-amber-300 hover:text-amber-800 bg-amber-100/70 dark:bg-amber-950/60 hover:bg-amber-100 px-2.5 py-1 rounded-lg transition flex items-center gap-1 cursor-pointer ml-auto border border-amber-200/80 dark:border-amber-800"
                          >
                            <Sparkles className="w-3 h-3 text-amber-600 dark:text-amber-400 animate-spin" />
                            <span>{uiLang === 'en' ? 'Preview Pop-up Effect' : '预览酷炫动效'}</span>
                          </button>
                        )}
                      </div>

                    </div>
                  );
                })}
              </div>
            </div>

            {/* Other Achievement Categories */}
            <div className="space-y-3">
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Star className="w-4 h-4 text-purple-500" />
                <span>{uiLang === 'en' ? 'Learning & Exam Achievements' : '学习行动与考场成就'}</span>
              </h5>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {achievementList.filter(a => a.category !== 'streak').map((ach) => {
                  const isCurrentUnlocked = ach.unlocked;
                  return (
                    <div
                      key={ach.id}
                      className={`relative p-4 rounded-2xl border transition-all duration-200 overflow-hidden ${
                        isCurrentUnlocked
                          ? 'bg-gradient-to-br from-purple-50/60 via-white to-blue-50/50 dark:from-purple-950/20 dark:via-slate-850 dark:to-blue-950/20 border-purple-200 dark:border-purple-800 shadow-sm'
                          : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200/80 dark:border-slate-700 opacity-80'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="flex items-center gap-3">
                          <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl shadow-xs border ${
                            isCurrentUnlocked
                              ? 'bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300 border-purple-200 dark:border-purple-800'
                              : 'bg-slate-200 dark:bg-slate-700 border-slate-300 dark:border-slate-600 grayscale'
                          }`}>
                            {ach.icon}
                          </div>
                          <div>
                            <h6 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                              {uiLang === 'en' && ach.titleEn ? ach.titleEn : ach.title}
                            </h6>
                            <div className="text-[11px] text-purple-700 dark:text-purple-400 font-semibold mt-0.5">
                              +{ach.rewardExp} EXP · {ach.rewardTitle}
                            </div>
                          </div>
                        </div>

                        {isCurrentUnlocked ? (
                          <span className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-[10px] font-black rounded-full flex items-center gap-1 shrink-0 border border-emerald-200 dark:border-emerald-800">
                            <Check className="w-3 h-3" />
                            {uiLang === 'en' ? 'Unlocked' : '已达成'}
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-[10px] font-bold rounded-full shrink-0">
                            {ach.progress}/{ach.progressMax}
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-2.5">
                        {uiLang === 'en' && ach.descriptionEn ? ach.descriptionEn : ach.description}
                      </p>

                      {onPreviewAchievement && (
                        <div className="flex justify-end pt-1">
                          <button
                            type="button"
                            onClick={() => onPreviewAchievement(ach)}
                            className="text-xs font-bold text-purple-700 dark:text-purple-300 hover:text-purple-800 bg-purple-100/70 dark:bg-purple-950/60 hover:bg-purple-100 px-2.5 py-1 rounded-lg transition flex items-center gap-1 cursor-pointer border border-purple-200/80 dark:border-purple-800"
                          >
                            <Sparkles className="w-3 h-3 text-purple-600 dark:text-purple-400" />
                            <span>{uiLang === 'en' ? 'Test Pop-up' : '测试解锁弹窗'}</span>
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Close */}
            <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-slate-900 dark:bg-blue-600 hover:bg-slate-800 dark:hover:bg-blue-500 text-white text-sm font-bold transition shadow-md cursor-pointer"
              >
                {uiLang === 'en' ? 'Close Showcase' : '关闭成就馆'}
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
