import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  Sparkles, 
  Plus, 
  BookOpen, 
  Tag, 
  ChevronRight, 
  Search,
  Filter,
  Brain
} from 'lucide-react';
import { StudyTask, UserStats } from '../types';
import { UILanguage, TRANSLATIONS } from '../utils/translations';

interface DailyRoadmapProps {
  tasks: StudyTask[];
  onToggleTask: (taskId: string) => void;
  onAddTask: (task: Omit<StudyTask, 'id'>) => void;
  onExplainConcept: (term: string) => void;
  onNavigateToGenerator: () => void;
  stats: UserStats;
  uiLang: UILanguage;
}

export const DailyRoadmap: React.FC<DailyRoadmapProps> = ({
  tasks,
  onToggleTask,
  onAddTask,
  onExplainConcept,
  onNavigateToGenerator,
  stats,
  uiLang,
}) => {
  const t = (key: keyof typeof TRANSLATIONS) => TRANSLATIONS[key][uiLang] || TRANSLATIONS[key].bilingual;

  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskSubject, setNewTaskSubject] = useState(uiLang === 'en' ? 'General' : '通用学习');
  const [newTaskDuration, setNewTaskDuration] = useState(30);

  const todayStr = new Date().toISOString().split('T')[0];

  // Filter tasks
  const filteredTasks = tasks.filter((t) => {
    if (selectedSubject === 'all') return true;
    return t.subject.toLowerCase() === selectedSubject.toLowerCase();
  });

  const completedCount = filteredTasks.filter((t) => t.completed).length;
  const totalCount = filteredTasks.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  // Unique subjects for filter
  const subjects = Array.from(new Set(tasks.map((t) => t.subject)));

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    onAddTask({
      title: newTaskTitle.trim(),
      description: uiLang === 'en' ? 'Custom created daily study task' : '手动新建的每日复习与练习任务',
      subject: newTaskSubject,
      category: 'general',
      durationMinutes: Number(newTaskDuration) || 25,
      taskType: 'concept',
      difficulty: 'medium',
      dueDate: todayStr,
      completed: false,
      keyPoints: [newTaskTitle.trim()],
    });

    setNewTaskTitle('');
    setShowAddModal(false);
  };

  const getTaskBadgeStyle = (completed: boolean, difficulty: string) => {
    if (completed) {
      return 'bg-emerald-50 text-emerald-600 border border-emerald-200';
    }
    if (difficulty === 'hard') {
      return 'bg-amber-50 text-amber-700 border border-amber-200';
    }
    return 'bg-blue-50 text-blue-600 border border-blue-200';
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#F8FAFC] overflow-y-auto">
      {/* Geometric Balance Top Header */}
      <header className="bg-white border-b border-slate-200 px-8 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sticky top-0 z-10">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">{t('todayRoadmap')}</h2>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-100">
              Roadmap
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            {new Date().toLocaleDateString(uiLang === 'en' ? 'en-US' : 'zh-CN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            {' • '}
            <span className="font-semibold text-slate-700">
              {totalCount - completedCount} {t('remainingTasks')}
            </span>
          </p>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex flex-col items-end">
            <div className="flex items-baseline gap-2">
              <p className="text-sm font-bold text-blue-600">{progressPercent}% {t('progress')}</p>
              <span className="text-xs text-slate-400">({completedCount}/{totalCount})</span>
            </div>
            <div className="w-36 bg-slate-100 h-2 rounded-full overflow-hidden mt-1.5 border border-slate-200">
              <div 
                className="bg-blue-600 h-full rounded-full transition-all duration-500" 
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              {t('weeklyTarget')}: {stats.totalStudyMinutes}/180 {uiLang === 'en' ? 'mins' : '分钟'}
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl font-bold text-sm transition shadow-sm shadow-blue-600/20"
          >
            <Plus className="w-4 h-4" />
            <span>{t('addTask')}</span>
          </button>
        </div>
      </header>

      {/* Main Roadmap Content Area */}
      <div className="p-8 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Tasks List (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          
          {/* Subject Filter Bar */}
          <div className="flex items-center justify-between gap-2 overflow-x-auto pb-2">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-400" />
              <button
                onClick={() => setSelectedSubject('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  selectedSubject === 'all'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {t('allSubjects')} ({tasks.length})
              </button>
              {subjects.map((sub) => (
                <button
                  key={sub}
                  onClick={() => setSelectedSubject(sub)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition whitespace-nowrap ${
                    selectedSubject === sub
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {sub}
                </button>
              ))}
            </div>
          </div>

          {/* Tasks Grid */}
          <div className="space-y-4">
            {filteredTasks.length === 0 ? (
              <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
                <Brain className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-slate-800">
                  {uiLang === 'zh' ? '暂无该分类的复习任务' : uiLang === 'en' ? 'No study tasks for this category' : '暂无该分类复习任务 / No tasks'}
                </h3>
                <p className="text-xs text-slate-500 mt-1 mb-4">
                  {uiLang === 'zh' ? '输入你的学习内容与年级，AI 即可为你一键生成全套复习任务' : uiLang === 'en' ? 'Enter your subject and grade level to auto-generate study tasks' : '输入学习内容与年级，AI 即可一键生成全套复习任务'}
                </p>
                <button
                  onClick={onNavigateToGenerator}
                  className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-xs font-bold shadow-xs hover:bg-blue-700 transition"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{t('generatePlanBtn')}</span>
                </button>
              </div>
            ) : (
              filteredTasks.map((task) => (
                <div
                  key={task.id}
                  className={`bg-white p-6 rounded-xl border border-slate-200 shadow-xs transition hover:shadow-md relative overflow-hidden ${
                    !task.completed ? 'border-l-4 border-l-blue-600' : 'opacity-85'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3.5 flex-1">
                      {/* Completion Checkbox */}
                      <button
                        onClick={() => onToggleTask(task.id)}
                        className="mt-1 transition hover:scale-110 text-slate-400 hover:text-blue-600 shrink-0"
                      >
                        {task.completed ? (
                          <CheckCircle2 className="w-6 h-6 text-emerald-500 fill-emerald-50" />
                        ) : (
                          <Circle className="w-6 h-6 text-slate-300 hover:text-blue-600" />
                        )}
                      </button>

                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span
                            className={`px-2 py-0.5 text-[10px] font-bold rounded uppercase tracking-wide ${getTaskBadgeStyle(
                              task.completed,
                              task.difficulty
                            )}`}
                          >
                            {task.completed ? 'COMPLETED' : task.taskType.toUpperCase()}
                          </span>
                          <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                            {task.subject}
                          </span>
                          <span className="text-xs text-slate-400 flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {task.durationMinutes} {uiLang === 'en' ? 'mins' : '分钟'}
                          </span>
                        </div>

                        <h3 className={`text-base font-bold text-slate-900 ${task.completed ? 'line-through text-slate-400' : ''}`}>
                          {task.title}
                        </h3>

                        <p className="text-xs text-slate-500 leading-relaxed">
                          {task.description}
                        </p>

                        {/* Key points chips */}
                        {task.keyPoints && task.keyPoints.length > 0 && (
                          <div className="flex items-center gap-1.5 flex-wrap pt-1">
                            {task.keyPoints.map((kp, idx) => (
                              <button
                                key={idx}
                                onClick={() => onExplainConcept(kp)}
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-50 border border-slate-200 text-[11px] text-slate-600 hover:border-blue-300 hover:text-blue-600 transition"
                                title="AI 概念精讲 / AI Concept Breakdown"
                              >
                                <span>{kp}</span>
                                <Sparkles className="w-3 h-3 text-blue-500" />
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Column: Scheduled Timeline & AI Plan Promo (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {/* AI Plan Banner */}
          <div className="bg-slate-900 text-white p-7 rounded-2xl shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
            
            <div className="flex items-center gap-2 text-blue-400 mb-2">
              <Sparkles className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-wider">{t('planGeneratorTitle')}</span>
            </div>

            <h3 className="text-lg font-bold text-white mb-2">
              {uiLang === 'zh' ? '定制专属复习 Roadmap' : uiLang === 'en' ? 'Create Custom Study Roadmap' : '定制复习 Roadmap / Custom Plan'}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-5">
              {uiLang === 'zh'
                ? '输入您的学科科目、学段与复习目标，智学星 AI 将根据认知规律自动编排每日任务与核心翻卡。'
                : uiLang === 'en'
                ? 'Enter your subject, level, and goals. AI auto-schedules your daily tasks and flashcards according to cognitive retention.'
                : '输入学科科目与目标，AI 将根据认知规律自动编排每日任务与翻卡 / Auto-schedule daily tasks & flashcards.'}
            </p>

            <button
              onClick={onNavigateToGenerator}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl font-bold transition text-sm shadow-md shadow-blue-900/30 flex items-center justify-center gap-2"
            >
              <span>{t('generatePlanBtn')}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Scheduled Sessions Box */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-6">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                {t('scheduledTimeline')}
              </h4>
              <span className="text-xs font-semibold text-blue-600">Ebbinghaus Spaced</span>
            </div>

            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <div className="text-right w-12 shrink-0">
                  <p className="text-sm font-bold text-slate-900">09:00</p>
                  <p className="text-[10px] text-slate-400 font-semibold">AM</p>
                </div>
                <div className="w-px h-10 bg-slate-200" />
                <div className="p-3.5 bg-slate-50 rounded-lg flex-1 border border-slate-200/80">
                  <p className="text-xs font-bold text-slate-800">
                    {uiLang === 'en' ? 'Physics: Mechanics & Newton\'s Laws' : '高中物理：受力分析与牛顿定律'}
                  </p>
                  <p className="text-[11px] text-slate-500">
                    {uiLang === 'en' ? 'Concept Review • 30 mins' : '概念复习 • 30 分钟'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right w-12 shrink-0">
                  <p className="text-sm font-bold text-slate-900">14:00</p>
                  <p className="text-[10px] text-slate-400 font-semibold">PM</p>
                </div>
                <div className="w-px h-10 bg-slate-200" />
                <div className="p-3.5 bg-blue-50 rounded-lg flex-1 border border-blue-100">
                  <p className="text-xs font-bold text-blue-900">IELTS Academic Vocab Flashcards</p>
                  <p className="text-[11px] text-blue-600">
                    {uiLang === 'en' ? 'Bilingual Flashcards • 15 mins' : '多语言翻卡 • 15 分钟'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right w-12 shrink-0">
                  <p className="text-sm font-bold text-slate-900">16:30</p>
                  <p className="text-[10px] text-slate-400 font-semibold">PM</p>
                </div>
                <div className="w-px h-10 bg-slate-200" />
                <div className="p-3.5 bg-slate-50 rounded-lg flex-1 border border-slate-200/80">
                  <p className="text-xs font-bold text-slate-800">
                    {uiLang === 'en' ? 'Japanese N2 Grammar & Voice Audio' : '日本語 N2 核心句型 5 选巩固'}
                  </p>
                  <p className="text-[11px] text-slate-500">
                    {uiLang === 'en' ? 'Grammar & Audio • 25 mins' : '语法与发音 • 25 分钟'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Memory Retention Box */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 relative overflow-hidden">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              {t('memoryRetention')}
            </h4>
            <div className="flex justify-between items-end mb-2">
              <p className="text-xs font-semibold text-slate-600">Retention Rate</p>
              <p className="text-2xl font-black text-slate-900">92%</p>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-3 border border-slate-200">
              <div className="bg-blue-600 h-full w-[92%]" />
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              {uiLang === 'zh'
                ? '根据间隔重复曲线分析，多语言声学朗读与翻卡复习使你的短时记忆转化为长期记忆效果提升了 14%。'
                : uiLang === 'en'
                ? 'Spaced repetition combined with read-aloud audio review improves long-term memory retention by 14%.'
                : '间隔重复曲线与声学朗读结合，显著提升长期记忆转化效果 / Spaced repetition improves retention.'}
            </p>
          </div>

        </div>
      </div>

      {/* Manual Task Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-4">{t('addTask')}</h3>
            <form onSubmit={handleCreateTask} className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase text-slate-500 block mb-1">
                  {uiLang === 'zh' ? '任务名称 / 内容' : uiLang === 'en' ? 'Task Title / Details' : '任务名称 / Task Title'}
                </label>
                <input
                  type="text"
                  required
                  placeholder={uiLang === 'en' ? 'e.g., Review Calculus derivatives, Study 20 IELTS words' : '如：复习微积分求导公式、背诵 20 个雅思词汇'}
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold uppercase text-slate-500 block mb-1">
                    {uiLang === 'zh' ? '所属科目' : uiLang === 'en' ? 'Subject' : '所属科目 / Subject'}
                  </label>
                  <input
                    type="text"
                    value={newTaskSubject}
                    onChange={(e) => setNewTaskSubject(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase text-slate-500 block mb-1">
                    {uiLang === 'zh' ? '预计时长 (分钟)' : uiLang === 'en' ? 'Duration (mins)' : '预计时长 / Duration'}
                  </label>
                  <input
                    type="number"
                    min={5}
                    max={180}
                    value={newTaskDuration}
                    onChange={(e) => setNewTaskDuration(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-lg text-xs font-bold text-slate-500 hover:bg-slate-100"
                >
                  {uiLang === 'en' ? 'Cancel' : '取消'}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg text-xs font-bold bg-blue-600 text-white hover:bg-blue-700 shadow-xs"
                >
                  {uiLang === 'en' ? 'Create Task' : '创建任务'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

