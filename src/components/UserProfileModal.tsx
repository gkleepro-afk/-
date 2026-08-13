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
  Layers
} from 'lucide-react';
import { UserProfile } from '../types';
import { UILanguage } from '../utils/translations';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfile;
  onSaveProfile: (profile: UserProfile) => void;
  uiLang: UILanguage;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  userProfile,
  onSaveProfile,
  uiLang,
}) => {
  if (!isOpen) return null;

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

  const [savedSuccess, setSavedSuccess] = useState(false);

  const PRESET_AVATARS = [
    { emoji: '🎓', name: '学霸帽子' },
    { emoji: '🚀', name: '冲刺火箭' },
    { emoji: '🦊', name: '敏捷灵狐' },
    { emoji: '🦉', name: '睿智猫头鹰' },
    { emoji: '⚡', name: '闪电提分' },
    { emoji: '🌸', name: '温情樱花' },
    { emoji: '🦁', name: '霸气雄狮' },
    { emoji: '📚', name: '万卷书狂' },
    { emoji: '🎨', name: '创意灵感' },
    { emoji: '🏆', name: '夺冠金杯' },
  ];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: UserProfile = {
      userName: userName.trim() || '智学学子',
      avatarEmoji,
      avatarUrl: avatarUrl.trim(),
      gradeLevel,
      semester,
      countryRegion,
      educationSystem,
      targetLanguage,
      targetExam: targetExam.trim() || '备考冲刺',
      dailyGoalMinutes,
      encouragementTone,
      customMotto: customMotto.trim(),
    };
    onSaveProfile(updated);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden my-8">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/30">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">学情偏好与个性化设置</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                定制您的年级、考纲与鼓励风格，AI 题目推荐与预习案将随之智能适配
              </p>
            </div>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSave} className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Section 1: Basic & Avatar */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-2 flex items-center gap-1.5">
              <User className="w-4 h-4 text-blue-600" />
              个人形象与称呼设置
            </h4>

            {/* Avatar Selector Block */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
              <label className="text-xs font-bold text-slate-700 block">
                选择专属学习头像 / 图标
              </label>

              <div className="flex flex-wrap items-center gap-3">
                {/* Preview Avatar */}
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-2xl shadow-md border-2 border-white shrink-0 overflow-hidden">
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
                          : 'bg-white border-slate-200 hover:bg-slate-100 text-slate-700'
                      }`}
                    >
                      {item.emoji}
                    </button>
                  ))}
                </div>
              </div>

              {/* Optional Custom Image URL */}
              <div className="pt-2 border-t border-slate-200/60">
                <input
                  type="text"
                  value={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                  placeholder="或粘贴网络自定义头像图片 URL 地址 (可选)"
                  className="w-full bg-white border border-slate-200 text-slate-900 rounded-xl p-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  学生昵称 / 称呼
                </label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="如：张同学、智学学子"
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  当前年级 / 学段
                </label>
                <select
                  value={gradeLevel}
                  onChange={(e) => setGradeLevel(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="初一">初一 / 基础建立 (Grade 7)</option>
                  <option value="初二">初二 / 知识巩固 (Grade 8)</option>
                  <option value="初三/中考">初三 / 中考冲刺 (Grade 9)</option>
                  <option value="高一">高一 / 学科衔接 (Grade 10)</option>
                  <option value="高二">高二 / 难点突破 (Grade 11)</option>
                  <option value="高三/高考">高三 / 高考冲刺 (Grade 12)</option>
                  <option value="国际高中 (AP/A-Level)">国际高中 (AP/A-Level/IB)</option>
                  <option value="大学/研究生/自学">大学 / 进阶考研 / 技能自学</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1 flex items-center justify-between">
                  <span>学期 / 进度阶段</span>
                  <span className="text-[10px] text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded font-semibold">精准匹配考纲</span>
                </label>
                <select
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                >
                  <option value="上学期">秋季 · 上学期 (1st Semester)</option>
                  <option value="下学期">春季 · 下学期 (2nd Semester)</option>
                  <option value="全学年/中高考复习">全学年 / 毕业考中高考总复习</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 2: Country, System & Exam Goal */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-2 flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-emerald-600" />
              地区、教材体制与目标考试
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  国家 / 地区
                </label>
                <select
                  value={countryRegion}
                  onChange={(e) => setCountryRegion(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  教材版本 / 考纲体制
                </label>
                <select
                  value={educationSystem}
                  onChange={(e) => setEducationSystem(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  主要学习/外语方向
                </label>
                <select
                  value={targetLanguage}
                  onChange={(e) => setTargetLanguage(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  目标考试与节点
                </label>
                <input
                  type="text"
                  value={targetExam}
                  onChange={(e) => setTargetExam(e.target.value)}
                  placeholder="如：2026年全国高考、中考、雅思7.0"
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Daily Goal & Encouragement Style */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-2 flex items-center gap-1.5">
              <Heart className="w-4 h-4 text-rose-500" />
              人性化陪伴与每日目标
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-blue-500" />
                  每日期望复习时长 (分钟)
                </label>
                <select
                  value={dailyGoalMinutes}
                  onChange={(e) => setDailyGoalMinutes(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value={15}>15 分钟 (轻量微学习)</option>
                  <option value={30}>30 分钟 (标准高效模式)</option>
                  <option value={45}>45 分钟 (深度提分模式)</option>
                  <option value={60}>60 分钟 (高强冲刺模式)</option>
                  <option value={90}>90 分钟 (学霸爆刷模式)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  鼓励语/元气风格偏好
                </label>
                <select
                  value={encouragementTone}
                  onChange={(e) => setEncouragementTone(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="passionate">🔥 激情霸气型 (冲刺高分，热血沸腾)</option>
                  <option value="gentle">🌸 温柔陪伴型 (贴心温暖，润物无声)</option>
                  <option value="humorous">😄 幽默风趣型 (轻松解压，梗图提分)</option>
                  <option value="academic">📖 严谨学术型 (名言金句，名师指点)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                自订备考格言 / 座右铭
              </label>
              <textarea
                rows={2}
                value={customMotto}
                onChange={(e) => setCustomMotto(e.target.value)}
                placeholder="如：星光不问赶路人，岁月不负有心人！"
                className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Live Dynamic Preview Card */}
          <div className="bg-gradient-to-r from-blue-50 via-slate-50 to-indigo-50 border border-blue-200/60 p-4 rounded-xl">
            <h5 className="text-xs font-bold text-blue-900 flex items-center gap-1.5 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              适配效果实时预览
            </h5>
            <div className="text-xs text-slate-600 space-y-1">
              <p>🎯 <strong className="text-slate-800">题目推荐：</strong>将自动优先推送符合【{countryRegion} · {gradeLevel} · {educationSystem}】的考点。</p>
              <p>⚡ <strong className="text-slate-800">试卷中心：</strong>匹配【{targetExam}】的全真真题卷与 AI 组卷试题。</p>
            </div>
          </div>

          {/* Submit */}
          <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-sm font-bold transition cursor-pointer"
            >
              取消
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold transition shadow-lg shadow-blue-500/20 flex items-center gap-2 cursor-pointer"
            >
              {savedSuccess ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300 animate-bounce" />
                  <span>已保存更新！</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>保存设置并生效</span>
                </>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
