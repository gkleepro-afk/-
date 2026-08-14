import React, { useState, useEffect } from 'react';
import { Clock, Play, Pause, RotateCw, X, Flame, CheckCircle2, Sparkles } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface PomodoroModalProps {
  onClose: () => void;
  onAddStudyMinutes: (minutes: number) => void;
}

export const PomodoroModal: React.FC<PomodoroModalProps> = ({ onClose, onAddStudyMinutes }) => {
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [sessionCount, setSessionCount] = useState(1);
  const [justCompleted, setJustCompleted] = useState(false);

  useEffect(() => {
    let interval: any = null;
    if (isActive && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((seconds) => seconds - 1);
      }, 1000);
    } else if (secondsLeft === 0 && isActive) {
      setIsActive(false);
      onAddStudyMinutes(25);
      setSessionCount((prev) => prev + 1);
      setJustCompleted(true);
      soundEngine.playChime('pomodoro_complete');
    }
    return () => clearInterval(interval);
  }, [isActive, secondsLeft, onAddStudyMinutes]);

  const toggleTimer = () => {
    soundEngine.playChime('button');
    setJustCompleted(false);
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    soundEngine.playChime('button');
    setJustCompleted(false);
    setIsActive(false);
    setSecondsLeft(25 * 60);
  };

  const minutes = Math.floor(secondsLeft / 60);
  const remainderSeconds = secondsLeft % 60;
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${remainderSeconds.toString().padStart(2, '0')}`;
  const progressPercent = Math.round(((25 * 60 - secondsLeft) / (25 * 60)) * 100);

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-slate-900 text-white rounded-2xl max-w-sm w-full p-8 shadow-2xl border border-slate-800 text-center relative overflow-hidden">
        
        {/* Background Gradient Circle */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center justify-center gap-2 text-blue-400 mb-6">
          <Clock className="w-5 h-5 animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-wider">25分钟沉浸专注 (Pomodoro)</span>
        </div>

        {/* Timer Display */}
        <div className="my-6">
          <div className="text-6xl font-black font-mono tracking-tight text-white drop-shadow-md">
            {formattedTime}
          </div>
          <p className="text-xs text-slate-400 mt-2 font-medium">第 {sessionCount} 个专注时段</p>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden my-6 border border-slate-700">
          <div
            className="bg-blue-500 h-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {justCompleted && (
          <div className="mb-6 p-3.5 bg-emerald-500/20 border border-emerald-500/30 rounded-xl text-emerald-300 text-xs font-bold flex items-center justify-center gap-2 animate-bounce">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>🎉 恭喜完成 25 分钟专注！已累计计入专注时长</span>
          </div>
        )}

        {/* Timer Controls */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={resetTimer}
            className="p-3 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition"
            title="重置计时"
          >
            <RotateCw className="w-5 h-5" />
          </button>

          <button
            onClick={toggleTimer}
            className={`flex-1 py-3.5 px-6 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition shadow-lg ${
              isActive
                ? 'bg-amber-500 text-slate-950 hover:bg-amber-400'
                : 'bg-blue-600 text-white hover:bg-blue-500 shadow-blue-900/40'
            }`}
          >
            {isActive ? (
              <>
                <Pause className="w-4 h-4" />
                <span>暂停专注</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-white" />
                <span>开始专注 (25min)</span>
              </>
            )}
          </button>
        </div>

        <p className="text-[11px] text-slate-500 mt-6">
          计时结束后，系统将自动计入您的每日专注时长统计中。
        </p>
      </div>
    </div>
  );
};
