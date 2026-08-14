import React, { useState, useEffect } from 'react';
import { 
  X, 
  Sparkles, 
  ChevronRight, 
  ChevronLeft, 
  Check, 
  Calendar, 
  GraduationCap, 
  Camera, 
  BookOpen, 
  Languages, 
  Award, 
  Flame,
  HelpCircle,
  Play
} from 'lucide-react';
import { UILanguage } from '../utils/translations';

export interface TourStep {
  targetTab: string;
  badge: string;
  icon: React.ReactNode;
  titleZh: string;
  titleEn: string;
  descriptionZh: string;
  descriptionEn: string;
  tipZh: string;
  tipEn: string;
}

interface OnboardingTourProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTab: (tab: string) => void;
  onFinishTour: () => void;
  uiLang: UILanguage;
}

export const OnboardingTour: React.FC<OnboardingTourProps> = ({
  isOpen,
  onClose,
  onSelectTab,
  onFinishTour,
  uiLang,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const steps: TourStep[] = [
    {
      targetTab: 'roadmap',
      badge: uiLang === 'en' ? 'Step 1 / 6 · Daily Hub' : '第一步 · 每日任务主阵地',
      icon: <Calendar className="w-6 h-6 text-blue-600" />,
      titleZh: '每日学习规划 (Daily Roadmap)',
      titleEn: 'Daily Study Roadmap',
      descriptionZh: '这里是您的核心主页面！系统会根据您的年级考纲与学习节奏，每日自动生成个性化任务清单。每个任务都标有预估耗时与考点标签。',
      descriptionEn: 'This is your central command hub! Tasks are intelligently scheduled based on your exam syllabus, complete with estimated durations and concept tags.',
      tipZh: '💡 技巧：点击任务上的“开始番茄专注”即可进入沉浸式倒计时打卡！',
      tipEn: '💡 Tip: Click "Start Focus" on any task to trigger Pomodoro timer mode!',
    },
    {
      targetTab: 'generator',
      badge: uiLang === 'en' ? 'Step 2 / 6 · AI Generator' : '第二步 · 秒级智能生成',
      icon: <Sparkles className="w-6 h-6 text-amber-500" />,
      titleZh: 'AI 智能规划与讲义生成 (Plan Generator)',
      titleEn: 'AI Curriculum & Plan Generator',
      descriptionZh: '遇到新的大考或薄弱科目？只需输入科目、目标分数与复习天数，AI 即可在数秒内为您量身定制系统化大纲、配套闪卡与仿真随堂测验。',
      descriptionEn: 'Preparing for a new exam? Enter your target subject, goal score, and timeframe. AI generates the complete curriculum, flashcard deck, and quiz bundle in seconds.',
      tipZh: '💡 技巧：可点击预设的“新课标提分”、“冲刺满分”模版一键开练。',
      tipEn: '💡 Tip: Click one-click preset templates like "High Score Sprint" to get started instantly.',
    },
    {
      targetTab: 'classroom',
      badge: uiLang === 'en' ? 'Step 3 / 6 · AI Classroom' : '第三步 · 名师沉浸讲堂',
      icon: <GraduationCap className="w-6 h-6 text-indigo-600" />,
      titleZh: 'AI 模拟名师讲堂 (AI Classroom)',
      titleEn: 'AI Interactive Classroom',
      descriptionZh: '如同有一位顶级名师随时在黑板上为您板书推导！支持步骤式拆解重难点，随堂互动提问，随时向 AI 发问答疑。',
      descriptionEn: 'Experience dynamic blackboard derivations with an AI master teacher. Includes step-by-step explanations, checkpoints, and real-time concept clarifiers.',
      tipZh: '💡 技巧：点击公式或难点词汇，AI 会弹出白话图解与易错坑点剖析。',
      tipEn: '💡 Tip: Click any complex term to view an intuitive analogy and common mistake analysis.',
    },
    {
      targetTab: 'photosolve',
      badge: uiLang === 'en' ? 'Step 4 / 6 · Smart Vision' : '第四步 · 智能拍题搜题',
      icon: <Camera className="w-6 h-6 text-sky-600" />,
      titleZh: '拍题搜题与变式解构 (Photo Solve)',
      titleEn: 'Photo Solve & Variant Exercises',
      descriptionZh: '做作业遇到卡壳难题？拍照上传或粘贴题目，AI 不仅给出多解法详解，更提炼解题通法与考点溯源，避免“只抄答案不长记性”。',
      descriptionEn: 'Stuck on a tricky homework question? Snap a picture or paste the problem. AI provides multi-method derivations, core principles, and knowledge point tags.',
      tipZh: '💡 技巧：搜题后可一键加入“智能错题本”以便日后变式重刷！',
      tipEn: '💡 Tip: Add solved items to your Question Bank with one click for spaced review!',
    },
    {
      targetTab: 'qbank',
      badge: uiLang === 'en' ? 'Step 5 / 6 · Error Bank' : '第五步 · 错题举一反三',
      icon: <BookOpen className="w-6 h-6 text-orange-600" />,
      titleZh: '智能题库与精细错题本 (Question Bank)',
      titleEn: 'Smart Question & Error Bank',
      descriptionZh: '自动按错误原因分类（粗心/概念模糊/公式遗忘/计算失误）。支持“举一反三”，AI 自动生成同类型变式题，确保真正把漏洞补死。',
      descriptionEn: 'Categorizes mistakes by root cause. Click "Generate Variant" to practice parallel questions with modified numbers to ensure true mastery.',
      tipZh: '💡 技巧：考前使用“错因筛选”，专门重刷“概念模糊”的高频失分题。',
      tipEn: '💡 Tip: Filter by "Concept Gap" before midterms to quickly patch weak areas.',
    },
    {
      targetTab: 'userprofile',
      badge: uiLang === 'en' ? 'Step 6 / 6 · Achievements & Profile' : '第六步 · 成就勋章与个性化',
      icon: <Flame className="w-6 h-6 text-amber-500" />,
      titleZh: '连续学习打卡与成就勋章 (Achievements & Profile)',
      titleEn: 'Streak Achievements & Scholar Titles',
      descriptionZh: '坚持每天复习！当连续学习达到 3天、7天、14天、30天时，将触发炫酷礼炮特效弹窗，并解锁“自律新星”、“常胜战神”等专属头衔与经验值！',
      descriptionEn: 'Stay consistent! Hitting 3, 7, and 14-day study streaks triggers celebratory particle modals, reward XP, and unlocks prestigious scholar titles.',
      tipZh: '💡 技巧：点击左下角头像可随时进入“成就勋章馆”预览炫酷动效并佩戴头衔！',
      tipEn: '💡 Tip: Click your profile at bottom-left anytime to inspect all unlocked badges and titles!',
    },
  ];

  const currentStep = steps[currentStepIndex];

  // Auto switch tab when step changes so the user sees the real UI behind the tour
  useEffect(() => {
    if (isOpen && currentStep) {
      if (currentStep.targetTab !== 'userprofile') {
        onSelectTab(currentStep.targetTab);
      }
    }
  }, [isOpen, currentStepIndex]);

  if (!isOpen) return null;

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      handleFinish();
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  const handleFinish = () => {
    localStorage.setItem('zhixue_has_completed_tour_v1', 'true');
    onFinishTour();
    onClose();
  };

  const handleSkip = () => {
    localStorage.setItem('zhixue_has_completed_tour_v1', 'true');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      
      {/* Floating Card */}
      <div className="relative max-w-xl w-full bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border-2 border-blue-500/40 dark:border-blue-500/30 overflow-hidden text-slate-900 dark:text-slate-100 animate-in zoom-in-95 duration-200 transition-colors duration-200">
        
        {/* Top Header Strip */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white p-5 sm:p-6 relative">
          <button
            onClick={handleSkip}
            className="absolute top-4 right-4 text-xs text-slate-400 hover:text-white bg-white/10 hover:bg-white/20 px-2.5 py-1 rounded-lg transition cursor-pointer flex items-center gap-1"
          >
            <span>{uiLang === 'en' ? 'Skip Tour' : '跳过指引'}</span>
            <X className="w-3.5 h-3.5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
              {currentStep.icon}
            </div>
            <div>
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-blue-500/25 border border-blue-400/40 text-blue-300 text-[11px] font-black tracking-wide mb-1">
                {currentStep.badge}
              </span>
              <h3 className="text-lg sm:text-xl font-black text-white">
                {uiLang === 'en' ? currentStep.titleEn : currentStep.titleZh}
              </h3>
            </div>
          </div>

          {/* Step Progress Dots */}
          <div className="flex items-center gap-1.5 mt-4 pt-3 border-t border-slate-800">
            {steps.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentStepIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === currentStepIndex
                    ? 'w-8 bg-blue-400'
                    : idx < currentStepIndex
                    ? 'w-3 bg-blue-600/70'
                    : 'w-2 bg-slate-700'
                }`}
                title={`第 ${idx + 1} 步`}
              />
            ))}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-7 space-y-4">
          <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
            {uiLang === 'en' ? currentStep.descriptionEn : currentStep.descriptionZh}
          </p>

          {/* Pro Tip Box */}
          <div className="bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-700/60 rounded-2xl p-3.5 text-xs text-amber-900 dark:text-amber-200 font-semibold leading-relaxed">
            {uiLang === 'en' ? currentStep.tipEn : currentStep.tipZh}
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-850 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
          <div>
            {currentStepIndex > 0 ? (
              <button
                type="button"
                onClick={handlePrev}
                className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold transition flex items-center gap-1 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>{uiLang === 'en' ? 'Previous' : '上一步'}</span>
              </button>
            ) : (
              <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">
                {uiLang === 'en' ? 'Explore key features' : '带您熟悉核心提分模块'}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-black transition shadow-lg shadow-blue-500/25 flex items-center gap-1.5 cursor-pointer"
            >
              {currentStepIndex === steps.length - 1 ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>{uiLang === 'en' ? 'Complete Tour & Start Learning' : '完成指引，开启高效提分！'}</span>
                </>
              ) : (
                <>
                  <span>{uiLang === 'en' ? 'Next Feature' : '了解下一个功能'}</span>
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
