import React, { useEffect, useState } from 'react';
import { 
  X, 
  Sparkles, 
  Flame, 
  Award, 
  Crown, 
  Zap, 
  Check, 
  Share2, 
  ArrowRight,
  ShieldCheck,
  Star
} from 'lucide-react';
import { Achievement } from '../types';
import { UILanguage } from '../utils/translations';
import { soundEngine } from '../utils/audio';

interface AchievementCelebrationModalProps {
  isOpen: boolean;
  achievement: Achievement | null;
  onClose: () => void;
  onClaimReward?: (achievement: Achievement) => void;
  uiLang: UILanguage;
}

export const AchievementCelebrationModal: React.FC<AchievementCelebrationModalProps> = ({
  isOpen,
  achievement,
  onClose,
  onClaimReward,
  uiLang,
}) => {
  const [claimed, setClaimed] = useState(false);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; color: string; delay: number; duration: number }>>([]);

  useEffect(() => {
    if (isOpen && achievement) {
      setClaimed(achievement.claimed || false);
      soundEngine.playChime('achievement');
      // Generate celebratory particles
      const colors = ['#f59e0b', '#fbbf24', '#3b82f6', '#8b5cf6', '#ec4899', '#10b981'];
      const newParticles = Array.from({ length: 32 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 0.5,
        duration: Math.random() * 2 + 2,
      }));
      setParticles(newParticles);
    }
  }, [isOpen, achievement]);

  if (!isOpen || !achievement) return null;

  const handleClaim = () => {
    setClaimed(true);
    soundEngine.playChime('achievement');
    if (onClaimReward) {
      onClaimReward(achievement);
    }
    setTimeout(() => {
      onClose();
    }, 900);
  };

  const getStreakIcon = () => {
    if (achievement.milestoneType === 'streak_3') return <Flame className="w-14 h-14 text-amber-400 fill-amber-400 animate-bounce" />;
    if (achievement.milestoneType === 'streak_7') return <Zap className="w-14 h-14 text-yellow-300 fill-yellow-300 animate-pulse" />;
    if (achievement.milestoneType === 'streak_14') return <Crown className="w-14 h-14 text-amber-300 fill-amber-300 animate-bounce" />;
    return <span className="text-5xl select-none">{achievement.icon}</span>;
  };

  return (
    <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md flex items-center justify-center z-50 p-4 overflow-hidden animate-in fade-in duration-300">
      
      {/* Floating Fireworks & Sparkles Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full opacity-80 animate-ping"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              backgroundColor: p.color,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Main Card Container */}
      <div className="relative max-w-md w-full bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-2 border-amber-400/60 rounded-3xl shadow-2xl shadow-amber-500/20 text-white overflow-hidden p-6 sm:p-8 text-center my-auto transform transition-all animate-in zoom-in-95 duration-300">
        
        {/* Ambient Top Glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-64 bg-gradient-to-b from-amber-400/30 via-orange-500/20 to-transparent rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition cursor-pointer z-10"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header Ribbon */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 via-amber-400/30 to-amber-500/20 border border-amber-400/50 text-amber-300 text-xs font-black tracking-widest uppercase mb-6 shadow-inner">
          <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" />
          <span>
            {uiLang === 'en'
              ? '🎉 ACHIEVEMENT UNLOCKED!'
              : uiLang === 'bilingual'
              ? '🎉 达成新成就 / ACHIEVEMENT UNLOCKED'
              : '🎉 恭喜解锁新成就！'}
          </span>
          <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" />
        </div>

        {/* Glowing Badge Emblem */}
        <div className="relative mx-auto w-32 h-32 mb-6 flex items-center justify-center">
          {/* Pulsing Back Glow Rings */}
          <div className="absolute inset-0 rounded-full bg-amber-500/20 animate-ping opacity-75" />
          <div className="absolute -inset-2 rounded-full bg-gradient-to-tr from-amber-500 via-yellow-400 to-orange-500 opacity-80 blur-md animate-pulse" />
          
          {/* Center Badge Surface */}
          <div className="relative w-28 h-28 rounded-full bg-gradient-to-b from-slate-800 to-slate-900 border-4 border-amber-300 shadow-2xl flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(#fbbf24_1px,transparent_1px)] [background-size:8px_8px] opacity-30" />
            <div className="relative z-10 transform scale-110 drop-shadow-[0_0_12px_rgba(251,191,36,0.6)]">
              {getStreakIcon()}
            </div>
          </div>

          {/* Star Accents */}
          <div className="absolute -top-1 -right-1 bg-amber-400 text-slate-950 p-1.5 rounded-full shadow-lg border border-white animate-bounce">
            <Star className="w-4 h-4 fill-slate-950" />
          </div>
        </div>

        {/* Achievement Title & Description */}
        <h3 className="text-2xl font-black tracking-tight text-white mb-2 drop-shadow-md">
          {uiLang === 'en' && achievement.titleEn ? achievement.titleEn : achievement.title}
        </h3>
        
        <p className="text-sm text-slate-300 leading-relaxed mb-6 px-2">
          {uiLang === 'en' && achievement.descriptionEn ? achievement.descriptionEn : achievement.description}
        </p>

        {/* Reward Showcase Box */}
        <div className="bg-slate-800/80 border border-amber-400/30 rounded-2xl p-4 mb-6 text-left space-y-3 shadow-inner">
          <p className="text-[11px] font-bold text-amber-300/90 uppercase tracking-wider flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            {uiLang === 'en' ? 'Unlocked Rewards & Titles' : '本次成就解锁专属奖励'}
          </p>

          <div className="grid grid-cols-2 gap-2.5">
            {/* EXP Reward */}
            <div className="bg-slate-900/90 border border-slate-700/80 rounded-xl p-2.5 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 font-bold shrink-0">
                ⚡
              </div>
              <div className="overflow-hidden">
                <div className="text-[10px] text-slate-400 font-medium">{uiLang === 'en' ? 'Study EXP' : '学习经验值'}</div>
                <div className="text-sm font-black text-amber-300">+{achievement.rewardExp} EXP</div>
              </div>
            </div>

            {/* Title Reward */}
            <div className="bg-slate-900/90 border border-slate-700/80 rounded-xl p-2.5 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-purple-500/20 border border-purple-400/40 flex items-center justify-center text-purple-300 font-bold shrink-0">
                👑
              </div>
              <div className="overflow-hidden">
                <div className="text-[10px] text-slate-400 font-medium">{uiLang === 'en' ? 'Badge Title' : '专属头衔'}</div>
                <div className="text-xs font-black text-purple-300 truncate">
                  {uiLang === 'en' && achievement.rewardTitleEn ? achievement.rewardTitleEn : achievement.rewardTitle}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={handleClaim}
            disabled={claimed}
            className={`w-full flex-1 py-3 px-5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg cursor-pointer ${
              claimed
                ? 'bg-emerald-600 text-white shadow-emerald-600/30'
                : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black shadow-amber-500/30 hover:scale-[1.02]'
            }`}
          >
            {claimed ? (
              <>
                <Check className="w-4 h-4" />
                <span>{uiLang === 'en' ? 'Reward Claimed!' : '已成功领取 & 佩戴'}</span>
              </>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4 text-slate-950" />
                <span>{uiLang === 'en' ? 'Claim & Equip Title' : '领取奖励并佩戴头衔'}</span>
              </>
            )}
          </button>

          <button
            onClick={onClose}
            className="w-full sm:w-auto py-3 px-4 rounded-xl font-medium text-xs text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-800 border border-slate-700 transition"
          >
            {uiLang === 'en' ? 'Close' : '暂存关闭'}
          </button>
        </div>

      </div>
    </div>
  );
};
