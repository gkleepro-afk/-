import React, { useState } from 'react';
import { Sparkles, Heart, Trophy, Quote, RefreshCw, Flame, Award, Lightbulb } from 'lucide-react';
import { UserProfile } from '../types';
import { UILanguage, TRANSLATIONS } from '../utils/translations';

interface EncouragementBannerProps {
  userProfile: UserProfile;
  streakDays: number;
  uiLang: UILanguage;
  onOpenSettings: () => void;
}

export const EncouragementBanner: React.FC<EncouragementBannerProps> = ({
  userProfile,
  streakDays,
  uiLang,
  onOpenSettings,
}) => {
  const t = (key: keyof typeof TRANSLATIONS) => TRANSLATIONS[key][uiLang] || TRANSLATIONS[key].bilingual;

  const [isGenerating, setIsGenerating] = useState(false);
  const [aiQuote, setAiQuote] = useState<{
    quote: string;
    message: string;
    badgeTitle: string;
  } | null>(null);

  // Default fallback quotes per tone
  const getFallbackQuotes = () => {
    if (uiLang === 'en') {
      switch (userProfile.encouragementTone) {
        case 'passionate':
          return {
            quote: userProfile.customMotto || 'Starlight doesn\'t ask the traveler, time never fails the hard worker! Aim high and conquer your dream target!',
            message: `Scholar [${userProfile.userName}], every mistake you resolve brings you one step closer to your [${userProfile.targetExam}] goal!`,
            badgeTitle: 'Passionate Scholar',
          };
        case 'gentle':
          return {
            quote: 'The best time to plant a tree was 10 years ago. The second best time is now. Move steadily forward.',
            message: `Dear [${userProfile.userName}], maintain your own study rhythm today. Small consistent efforts yield incredible growth.`,
            badgeTitle: 'Steady Pursuer',
          };
        case 'humorous':
          return {
            quote: 'Keep practicing, keep winning! Defeating tricky problems one by one!',
            message: `Hi [${userProfile.userName}], you\'ve conquered another wave of challenging problems today! The [${userProfile.targetExam}] trophy awaits you!`,
            badgeTitle: 'Master Problem Solver',
          };
        case 'academic':
        default:
          return {
            quote: 'Understanding core principles is the key to mastering any domain.',
            message: `Student [${userProfile.userName}], for [${userProfile.gradeLevel}], grasping underlying concepts builds a far stronger foundation than blind repetition.`,
            badgeTitle: 'Academic Pioneer',
          };
      }
    } else if (uiLang === 'bilingual') {
      switch (userProfile.encouragementTone) {
        case 'passionate':
          return {
            quote: userProfile.customMotto || '星光不问赶路人，岁月不负有心人！Starlight guides every dedicated learner!',
            message: `奋斗者【${userProfile.userName}】，针对【${userProfile.targetExam}】目标的每一道突破都是向梦想迈进！/ Step closer to your goal!`,
            badgeTitle: '提分战神 / High Performer',
          };
        case 'gentle':
          return {
            quote: '种一棵树最好的时间是十年前，其次就是现在。/ The second best time is now.',
            message: `【${userProfile.userName}】同学，稳步前行，你的每一滴汗水都在生根发芽。/ Move steadily forward!`,
            badgeTitle: '笃行不怠 / Steady Learner',
          };
        case 'humorous':
          return {
            quote: '题海无涯，AI 作舟！Keep practicing & winning!',
            message: `嗨【${userProfile.userName}】，今天又打败了难题小怪兽！【${userProfile.targetExam}】奖杯在等你！`,
            badgeTitle: '解题先锋 / Problem Solver',
          };
        case 'academic':
        default:
          return {
            quote: '知之者不如好之者，好之者不如乐之者。——《论语》',
            message: `【${userProfile.userName}】同学，针对【${userProfile.gradeLevel}】阶段，理解底层概念比盲目刷题更有效 / Grasping concepts is key.`,
            badgeTitle: '严谨治学 / Academic Pioneer',
          };
      }
    } else {
      switch (userProfile.encouragementTone) {
        case 'passionate':
          return {
            quote: userProfile.customMotto || '星光不问赶路人，岁月不负有心人！打牢基础，冲刺理想院校！',
            message: `奋斗者【${userProfile.userName}】，你选择的【${userProfile.targetExam}】之路线，每解决一道错题都是向梦想靠近一大步！`,
            badgeTitle: '霸气提分战神',
          };
        case 'gentle':
          return {
            quote: '种一棵树最好的时间是十年前，其次就是现在。慢慢来，稳步前行。',
            message: `【${userProfile.userName}】同学，今天也要照顾好自己的复习节奏，累了就稍作休息，你的汗水都在默默生根发芽。`,
            badgeTitle: '笃行不怠学子',
          };
        case 'humorous':
          return {
            quote: '题海无涯，AI 作舟！刷题一时爽，一直刷题一直爽！',
            message: `嗨【${userProfile.userName}】，今天又打败了无数道难题小怪兽！保持连胜，【${userProfile.targetExam}】通关奖杯在等你！`,
            badgeTitle: '解题梗王天花板',
          };
        case 'academic':
        default:
          return {
            quote: '知之者不如好之者，好之者不如乐之者。——《论语》',
            message: `【${userProfile.userName}】同学，针对【${userProfile.gradeLevel}】阶段，理解底层概念比盲目刷题更具效能。`,
            badgeTitle: '严谨治学先锋',
          };
      }
    }
  };

  const currentQuote = aiQuote || getFallbackQuotes();

  const handleRefreshMotivation = async () => {
    setIsGenerating(true);
    try {
      const res = await fetch('/api/generate-encouragement', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userName: userProfile.userName,
          gradeLevel: userProfile.gradeLevel,
          targetExam: userProfile.targetExam,
          tone: userProfile.encouragementTone,
          streakDays,
        }),
      });
      const data = await res.json();
      if (data.success && data.encouragement) {
        setAiQuote(data.encouragement);
      }
    } catch {
      // Keep existing quote on error
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-6 shadow-xl relative overflow-hidden border border-indigo-900/50 mb-6">
      {/* Background Decorative Rings */}
      <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute right-1/3 -top-10 w-36 h-36 bg-blue-500/10 rounded-full blur-xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        
        {/* Left Section: Personalized Welcome & Quote */}
        <div className="space-y-3 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-bold flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              {userProfile.gradeLevel} · {userProfile.semester || (uiLang === 'en' ? 'Term 1' : '上学期')} · {userProfile.educationSystem}
            </span>
            <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold flex items-center gap-1">
              <Trophy className="w-3.5 h-3.5" />
              {currentQuote.badgeTitle}
            </span>
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              {t('checkinDays')} {streakDays} {uiLang === 'en' ? 'Days' : '天'}
            </span>
          </div>

          {/* Inspirational Quote */}
          <div className="flex items-start gap-3 bg-white/5 border border-white/10 p-4 rounded-xl backdrop-blur-xs">
            <Quote className="w-6 h-6 text-indigo-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-base font-bold text-amber-200 tracking-wide leading-snug">
                “{currentQuote.quote}”
              </p>
              <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                {currentQuote.message}
              </p>
            </div>
          </div>
        </div>

        {/* Right Section: Actions & Settings Quick Link */}
        <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-3 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-white/10">
          <button
            onClick={handleRefreshMotivation}
            disabled={isGenerating}
            className="px-3.5 py-2 rounded-xl bg-indigo-600/80 hover:bg-indigo-600 text-white text-xs font-bold transition flex items-center gap-2 border border-indigo-400/30 shadow-xs cursor-pointer disabled:opacity-50"
            title={uiLang === 'en' ? 'Generate new AI encouragement quote' : '生成新的 AI 专属激励语'}
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
            <span>{t('refreshQuoteBtn')}</span>
          </button>

          <button
            onClick={onOpenSettings}
            className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 text-xs font-bold transition flex items-center gap-2 border border-white/15 cursor-pointer"
          >
            <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
            <span>{t('adjustProfileBtn')}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
