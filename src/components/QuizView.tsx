import React, { useState } from 'react';
import { 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  Award, 
  RotateCw, 
  Sparkles, 
  BookOpen, 
  ArrowRight,
  Brain
} from 'lucide-react';
import { QuizQuestion } from '../types';
import { UILanguage, TRANSLATIONS } from '../utils/translations';

interface QuizViewProps {
  quizzes: QuizQuestion[];
  onCompleteQuiz: (scorePercent: number) => void;
  onExplainConcept: (term: string) => void;
  uiLang: UILanguage;
}

export const QuizView: React.FC<QuizViewProps> = ({
  quizzes,
  onCompleteQuiz,
  onExplainConcept,
  uiLang,
}) => {
  const t = (key: keyof typeof TRANSLATIONS) => TRANSLATIONS[key][uiLang] || TRANSLATIONS[key].bilingual;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion = quizzes[currentIndex] || quizzes[0];

  const handleSelectOption = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);

    if (index === currentQuestion.correctIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < quizzes.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
      const finalPercent = Math.round(((score + (selectedOption === currentQuestion.correctIndex ? 1 : 0)) / quizzes.length) * 100);
      onCompleteQuiz(finalPercent);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setIsFinished(false);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#F8FAFC] overflow-y-auto">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-8 py-6 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">{t('quizzesTitle')}</h2>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-100">
                Quiz & Diagnostics
              </span>
            </div>
            <p className="text-sm text-slate-500 mt-1">
              {t('quizzesDesc')}
            </p>
          </div>

          {!isFinished && quizzes.length > 0 && (
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg">
                {uiLang === 'en' ? 'Progress' : '进度'} {currentIndex + 1} / {quizzes.length}
              </span>
            </div>
          )}
        </div>
      </header>

      {/* Main Container */}
      <div className="p-8 max-w-3xl mx-auto w-full flex-1 flex flex-col justify-center">
        {quizzes.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
            <HelpCircle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">暂无测验题目</h3>
            <p className="text-xs text-slate-500 mt-1">请使用 AI 生成复习计划，系统将为您自动生成专属测试题。</p>
          </div>
        ) : isFinished ? (
          /* Finished Screen */
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm text-center space-y-6">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
              <Award className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-2xl font-extrabold text-slate-900">巩固测试已完成！</h3>
              <p className="text-sm text-slate-500 mt-1">本次复习测验表现汇总</p>
            </div>

            <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 max-w-xs mx-auto">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">准确率得分</p>
              <p className="text-4xl font-black text-blue-600 my-1">
                {Math.round((score / quizzes.length) * 100)}%
              </p>
              <p className="text-xs text-slate-500 font-medium">答对 {score} 题 / 共 {quizzes.length} 题</p>
            </div>

            <div className="flex items-center justify-center gap-4">
              <button
                onClick={handleRestart}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-xs transition"
              >
                <RotateCw className="w-4 h-4" />
                <span>重新测试</span>
              </button>
            </div>
          </div>
        ) : (
          /* Question Box */
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <span className="text-xs font-bold uppercase bg-blue-50 text-blue-600 px-2.5 py-1 rounded">
                {currentQuestion.subject || '综合测验'}
              </span>
              <span className="text-xs font-semibold text-slate-400">
                第 {currentIndex + 1} 题
              </span>
            </div>

            <h3 className="text-lg font-bold text-slate-900 leading-snug">
              {currentQuestion.question}
            </h3>

            {/* Options */}
            <div className="space-y-3">
              {currentQuestion.options.map((opt, idx) => {
                let optStyle = 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100';

                if (isAnswered) {
                  if (idx === currentQuestion.correctIndex) {
                    optStyle = 'bg-emerald-50 border-emerald-300 text-emerald-900 font-bold';
                  } else if (idx === selectedOption) {
                    optStyle = 'bg-rose-50 border-rose-300 text-rose-900 font-bold';
                  } else {
                    optStyle = 'bg-slate-50 border-slate-100 text-slate-400 opacity-60';
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={isAnswered}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full text-left p-4 rounded-xl border text-sm font-medium transition flex items-center justify-between gap-3 ${optStyle}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-slate-200/60 text-slate-700 font-bold text-xs flex items-center justify-center shrink-0">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{opt}</span>
                    </div>

                    {isAnswered && idx === currentQuestion.correctIndex && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    )}
                    {isAnswered && idx === selectedOption && idx !== currentQuestion.correctIndex && (
                      <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Answer Explanation Box */}
            {isAnswered && (
              <div className="p-5 bg-blue-50/60 rounded-xl border border-blue-100 space-y-3 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold uppercase text-blue-600 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" />
                    AI 题目深度解析
                  </p>
                  <button
                    onClick={() => onExplainConcept(currentQuestion.question)}
                    className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
                  >
                    <span>深度精讲</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed font-normal">
                  {currentQuestion.explanation}
                </p>
              </div>
            )}

            {/* Next Button */}
            {isAnswered && (
              <div className="flex justify-end pt-2">
                <button
                  onClick={handleNext}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-xs transition"
                >
                  <span>{currentIndex < quizzes.length - 1 ? '下一题' : '查看结果'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
