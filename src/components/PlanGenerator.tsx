import React, { useState } from 'react';
import { 
  Sparkles, 
  CheckCircle, 
  Calendar, 
  Clock, 
  BookOpen, 
  ArrowRight, 
  Layers, 
  HelpCircle,
  FileText,
  Flame,
  Check
} from 'lucide-react';
import { GeneratedStudyPlan, UserProfile } from '../types';
import { UILanguage, TRANSLATIONS } from '../utils/translations';
import { matchGradeStrict } from '../utils/gradeMatcher';

interface PlanGeneratorProps {
  onPlanGenerated: (plan: GeneratedStudyPlan) => void;
  existingPlans: GeneratedStudyPlan[];
  onSelectExistingPlan: (plan: GeneratedStudyPlan) => void;
  uiLang: UILanguage;
  userProfile?: UserProfile;
}

export const PlanGenerator: React.FC<PlanGeneratorProps> = ({
  onPlanGenerated,
  existingPlans,
  onSelectExistingPlan,
  uiLang,
  userProfile,
}) => {
  const t = (key: keyof typeof TRANSLATIONS) => TRANSLATIONS[key][uiLang] || TRANSLATIONS[key].bilingual;

  const [subject, setSubject] = useState('');
  const [gradeLevel, setGradeLevel] = useState(userProfile?.gradeLevel || '高二');
  const [semester, setSemester] = useState(userProfile?.semester || '上学期');
  const [educationSystem, setEducationSystem] = useState(userProfile?.educationSystem || '人教版');
  const [targetGoal, setTargetGoal] = useState('');
  const [timeMinutesPerDay, setTimeMinutesPerDay] = useState(userProfile?.dailyGoalMinutes || 30);
  const [language, setLanguage] = useState(uiLang === 'en' ? 'en' : 'zh');
  const [isGenerating, setIsGenerating] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Preset suggestions
  const presetTemplates = [
    {
      subject: uiLang === 'en' ? 'High School Physics: Mechanics' : '高中物理：力学与动量',
      grade: uiLang === 'en' ? 'Grade 11 / High School' : '高中二年级',
      goal: uiLang === 'en' ? 'Master Momentum Conservation & Newton\'s Second Law' : '重点攻克动量守恒定理与牛顿第二定律综合题型',
      lang: 'zh',
    },
    {
      subject: 'IELTS Academic Vocab 7.0',
      grade: 'College / Advanced (C1)',
      goal: 'Master Task 2 Academic vocabulary and clause rewriting',
      lang: 'en',
    },
    {
      subject: 'JLPT N2 Japanese Grammar',
      grade: 'Intermediate / Test Prep',
      goal: 'Master 20 key sentence patterns and listening audio cards',
      lang: 'ja',
    },
    {
      subject: 'Python Algorithms & Data Structures',
      grade: 'University / Beginner',
      goal: 'Binary Tree, Two Pointers, Dynamic Programming basics',
      lang: 'zh',
    },
  ];

  const handleApplyPreset = (preset: typeof presetTemplates[0]) => {
    setSubject(preset.subject);
    setGradeLevel(preset.grade);
    setTargetGoal(preset.goal);
    setLanguage(preset.lang);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim()) {
      setErrorMessage(uiLang === 'en' ? 'Please enter a subject or topic' : '请输入您要学习或复习的科目与内容');
      return;
    }

    setErrorMessage('');
    setIsGenerating(true);

    try {
      const response = await fetch('/api/generate-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject: subject.trim(),
          gradeLevel,
          semester,
          countryRegion: userProfile?.countryRegion || '中国大陆',
          educationSystem,
          targetGoal: targetGoal.trim() || '精准符合当前年级学期考纲，建立系统知识框架并进行高效强化复习',
          timeMinutesPerDay,
          language,
        }),
      });

      const data = await response.json();

      if (data.success && data.plan) {
        onPlanGenerated(data.plan);
      } else {
        throw new Error(data.error || '生成失败');
      }
    } catch (err: any) {
      console.warn('Backend API failed or unavailable, falling back to local intelligent plan synthesis:', err);
      // Fallback local plan synthesis
      const fallbackPlan: GeneratedStudyPlan = {
        id: `plan-gen-${Date.now()}`,
        title: `${subject}: Custom AI Study & Review Plan`,
        subject: subject,
        gradeLevel: gradeLevel,
        targetGoal: targetGoal || 'Master core concepts, practice key problems',
        language: language,
        createdAt: new Date().toISOString(),
        overview: `Plan tailored for [${subject}] (${gradeLevel}). Built around Ebbinghaus spaced repetition for optimal memory retention.`,
        estimatedDays: 7,
        keyTopics: [
          `${subject} Core Concepts & Definitions`,
          `High-frequency Problem Solving & Analysis`,
          `Interactive Active Recall Flashcards`,
          `Diagnostic Quiz & Weak Points Analysis`,
        ],
        dailyTasks: [
          {
            dayOffset: 0,
            title: `${subject} - Core Concept Foundation & Analysis`,
            description: `Review fundamental definitions and formulas for ${subject} with card repetition.`,
            subject: subject,
            category: 'general',
            durationMinutes: timeMinutesPerDay,
            taskType: 'concept',
            difficulty: 'easy',
            keyPoints: ['Core Principles', 'Key Terms'],
          },
          {
            dayOffset: 1,
            title: `${subject} - Classic Problem Solving & Application`,
            description: `Work through 3-5 typical practice problems and review explanations.`,
            subject: subject,
            category: 'general',
            durationMinutes: timeMinutesPerDay,
            taskType: 'practice',
            difficulty: 'medium',
            keyPoints: ['Step-by-step logic', 'Common errors'],
          },
          {
            dayOffset: 2,
            title: `${subject} - Spaced Repetition & Flashcards Review`,
            description: `Test memory recall using auto-generated flashcards and TTS read-aloud.`,
            subject: subject,
            category: 'general',
            durationMinutes: timeMinutesPerDay,
            taskType: 'flashcard',
            difficulty: 'medium',
            keyPoints: ['Active Recall', 'Spaced Review'],
          },
          {
            dayOffset: 3,
            title: `${subject} - Milestone Quiz & AI Diagnostic Breakdown`,
            description: `Take a mini quiz and read AI concept breakdowns for incorrect questions.`,
            subject: subject,
            category: 'general',
            durationMinutes: timeMinutesPerDay,
            taskType: 'quiz',
            difficulty: 'hard',
            keyPoints: ['Weak Spot Diagnostic', 'Targeted Reinforcement'],
          },
        ],
        flashcards: [
          {
            front: `${subject} Essential Term 1`,
            back: `[Definition & Usage]: Key rules and practical examples for ${subject}.`,
            language: language,
            tags: [subject, 'Essential'],
          },
          {
            front: `${subject} High-frequency Concept 2`,
            back: `[Key Takeaway]: Memory mnemonic and formula application.`,
            language: language,
            tags: [subject, 'Review'],
          },
        ],
        quizQuestions: [
          {
            question: `Which of the following statements about [${subject}] is most accurate?`,
            options: ['Concept is logical and clearly structured', 'Can be mastered instantly without study', 'Only applies to rare edge cases', 'Has no practical relevance'],
            correctIndex: 0,
            explanation: `Understanding exact definitions and scope for ${subject} is essential for accurate problem solving.`,
          },
        ],
      };

      onPlanGenerated(fallbackPlan);
    } finally {
      setIsGenerating(false);
    }
  };

  // Filter plans strictly by user profile grade
  const filteredPlans = existingPlans.filter((p) =>
    matchGradeStrict(p.gradeLevel, userProfile?.gradeLevel)
  );

  return (
    <div className="flex-1 flex flex-col h-full bg-[#F8FAFC] overflow-y-auto">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-8 py-6 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">{t('planGeneratorTitle')}</h2>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-100">
              Logos Generator
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            {t('planGeneratorDesc')}
          </p>
        </div>
      </header>

      {/* Main Container */}
      <div className="p-8 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Generator Form Panel */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-xl relative overflow-hidden">
            <div className="flex items-center gap-2 mb-6 border-b border-slate-800 pb-4">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">
                  {uiLang === 'zh' ? '生成个性化复习计划' : uiLang === 'en' ? 'Create Custom AI Study Plan' : '生成个性化复习计划 / Create Plan'}
                </h3>
                <p className="text-xs text-slate-400">
                  {uiLang === 'en' ? 'Based on Ebbinghaus memory curve & active recall' : '基于认知规律与间隔重复原理'}
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Subject Input */}
              <div>
                <label className="text-[11px] uppercase font-bold tracking-wider text-slate-400 block mb-1.5">
                  {t('subjectInputLabel')} <span className="text-blue-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder={t('subjectPlaceholder')}
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 text-white placeholder-slate-500 rounded-xl p-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>

              {/* Grade Level, Semester & System */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-[11px] uppercase font-bold tracking-wider text-slate-400 block mb-1.5">
                    {t('gradeLevelLabel')}
                  </label>
                  <select
                    value={gradeLevel}
                    onChange={(e) => setGradeLevel(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl p-3 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="初一">初一 (Grade 7)</option>
                    <option value="初二">初二 (Grade 8)</option>
                    <option value="初三/中考">初三 / 中考冲刺</option>
                    <option value="高一">高一 (Grade 10)</option>
                    <option value="高二">高二 (Grade 11)</option>
                    <option value="高三/高考">高三 / 高考冲刺</option>
                    <option value="国际高中 (AP/A-Level)">国际高中 (AP/A-Level)</option>
                    <option value="大学/研究生/自学">大学 / 进阶考研</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] uppercase font-bold tracking-wider text-slate-400 block mb-1.5">
                    学期阶段
                  </label>
                  <select
                    value={semester}
                    onChange={(e) => setSemester(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl p-3 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="上学期">上学期 (秋季)</option>
                    <option value="下学期">下学期 (春季)</option>
                    <option value="全学年/中高考复习">全学年总复习</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] uppercase font-bold tracking-wider text-slate-400 block mb-1.5">
                    {t('dailyTimeLabel')}
                  </label>
                  <select
                    value={timeMinutesPerDay}
                    onChange={(e) => setTimeMinutesPerDay(Number(e.target.value))}
                    className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl p-3 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value={15}>15 {uiLang === 'en' ? 'mins' : '分钟'}</option>
                    <option value={30}>30 {uiLang === 'en' ? 'mins' : '分钟'}</option>
                    <option value={45}>45 {uiLang === 'en' ? 'mins' : '分钟'}</option>
                    <option value={60}>60 {uiLang === 'en' ? 'mins' : '分钟'}</option>
                  </select>
                </div>
              </div>

              {/* Specific Goal */}
              <div>
                <label className="text-[11px] uppercase font-bold tracking-wider text-slate-400 block mb-1.5">
                  {t('goalLabel')}
                </label>
                <textarea
                  rows={2}
                  placeholder={uiLang === 'en' ? 'e.g., Master Newton\'s laws, learn 200 IELTS vocab words...' : '例如：攻克受力分析、搞懂动量守恒定理；背熟核心动词...'}
                  value={targetGoal}
                  onChange={(e) => setTargetGoal(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 text-white placeholder-slate-500 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Language Selection */}
              <div>
                <label className="text-[11px] uppercase font-bold tracking-wider text-slate-400 block mb-1.5">
                  {t('cardLangLabel')}
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { code: 'zh', label: '中文 (CN)' },
                    { code: 'en', label: 'English (EN)' },
                    { code: 'ja', label: '日本語 (JA)' },
                    { code: 'fr', label: 'Français (FR)' },
                  ].map((langItem) => (
                    <button
                      key={langItem.code}
                      type="button"
                      onClick={() => setLanguage(langItem.code)}
                      className={`py-2 px-1 rounded-lg text-xs font-bold transition text-center ${
                        language === langItem.code
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'bg-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {langItem.label}
                    </button>
                  ))}
                </div>
              </div>

              {errorMessage && (
                <p className="text-xs font-semibold text-rose-400 bg-rose-500/10 border border-rose-500/20 p-3 rounded-lg">
                  {errorMessage}
                </p>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isGenerating}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3.5 rounded-xl font-bold transition text-sm shadow-lg shadow-blue-900/30 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <Sparkles className="w-4 h-4 animate-spin" />
                    <span>AI Generating Plan...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>{t('createPlanBtn')}</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Quick Presets */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              {uiLang === 'en' ? 'Presets & Templates (Click to apply)' : '预设推荐案例 (点击快速填入)'}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {presetTemplates.map((pt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleApplyPreset(pt)}
                  className="p-3 bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 rounded-xl text-left transition group"
                >
                  <p className="text-xs font-bold text-slate-800 group-hover:text-blue-600">{pt.subject}</p>
                  <p className="text-[11px] text-slate-500 mt-1 truncate">{pt.goal}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Saved Plans List */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex-1">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">
                {uiLang === 'zh' ? '已生成的计划库' : uiLang === 'en' ? 'Generated Plans' : '已生成的计划库 / Generated Plans'}
              </h3>
              <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                {filteredPlans.length} {uiLang === 'en' ? 'plans' : '套方案'}
              </span>
            </div>

            <div className="space-y-4">
              {filteredPlans.map((plan) => (
                <div
                  key={plan.id}
                  onClick={() => onSelectExistingPlan(plan)}
                  className="p-5 rounded-xl border border-slate-200 hover:border-blue-500 bg-white hover:bg-blue-50/30 transition cursor-pointer group relative overflow-hidden"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-blue-50 text-blue-600 uppercase">
                          {plan.subject}
                        </span>
                        <span className="text-[11px] text-slate-400 font-medium">
                          {plan.gradeLevel}
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition">
                        {plan.title}
                      </h4>
                    </div>

                    <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-1 transition shrink-0 mt-1" />
                  </div>

                  <p className="text-xs text-slate-500 line-clamp-2 mt-2 leading-relaxed">
                    {plan.overview}
                  </p>

                  <div className="flex items-center gap-4 mt-4 text-[11px] text-slate-400 font-medium pt-3 border-t border-slate-100">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-blue-500" />
                      {plan.dailyTasks.length} {uiLang === 'en' ? 'Days' : '天路线'}
                    </span>
                    <span className="flex items-center gap-1">
                      <Layers className="w-3.5 h-3.5 text-cyan-500" />
                      {plan.flashcards.length} {uiLang === 'en' ? 'Cards' : '张卡片'}
                    </span>
                    <span className="flex items-center gap-1">
                      <HelpCircle className="w-3.5 h-3.5 text-emerald-500" />
                      {plan.quizQuestions.length} {uiLang === 'en' ? 'Quizzes' : '道测试'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

