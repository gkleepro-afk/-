import React, { useState, useRef } from 'react';
import {
  Camera,
  Upload,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  BookOpen,
  Copy,
  Check,
  Bookmark,
  RefreshCw,
  Image as ImageIcon,
  Zap,
  HelpCircle,
  X,
  FileText
} from 'lucide-react';
import { PhotoQuestionAnalysis, QuestionBankItem } from '../types';
import { UILanguage, TRANSLATIONS } from '../utils/translations';

interface PhotoSolveViewProps {
  uiLang: UILanguage;
  onSaveToMistakes?: (item: QuestionBankItem) => void;
  onExplainConcept?: (term: string) => void;
}

// Sample test images provided for quick testing without needing camera
const SAMPLE_QUESTIONS = [
  {
    id: 'sample-1',
    title: '高中物理：平抛运动与小球碰撞',
    subject: '物理',
    grade: '高一 / 高考',
    previewUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&auto=format&fit=crop&q=80',
    notes: '求小球平抛落地时的速度方向与水平夹角 θ'
  },
  {
    id: 'sample-2',
    title: '初中数学：二次函数图像与面积最值',
    subject: '数学',
    grade: '初三 / 中考',
    previewUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=600&auto=format&fit=crop&q=80',
    notes: '已知二次函数顶点为 P(1, 4)，求 △ABC 面积的最大值'
  },
  {
    id: 'sample-3',
    title: '高中化学：离子方程式正误判断',
    subject: '化学',
    grade: '高二',
    previewUrl: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&auto=format&fit=crop&q=80',
    notes: '判断 2Fe3+ + Cu = 2Fe2+ + Cu2+ 在酸性溶液中是否符合守恒'
  }
];

export const PhotoSolveView: React.FC<PhotoSolveViewProps> = ({
  uiLang,
  onSaveToMistakes,
  onExplainConcept,
}) => {
  const t = (key: keyof typeof TRANSLATIONS) => TRANSLATIONS[key][uiLang] || TRANSLATIONS[key].bilingual;

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [userNotes, setUserNotes] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<PhotoQuestionAnalysis | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copiedOcr, setCopiedOcr] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  // Camera Live Stream state
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Handle image upload from file input
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setAnalysisResult(null);
        setErrorMsg(null);
        setIsSaved(false);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Drag & Drop
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setAnalysisResult(null);
        setErrorMsg(null);
        setIsSaved(false);
      };
      reader.readAsDataURL(file);
    }
  };

  // Start Camera Capture
  const startCamera = async () => {
    try {
      setIsCameraActive(true);
      setErrorMsg(null);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err: any) {
      console.error("Camera access error:", err);
      setIsCameraActive(false);
      setErrorMsg('无法调取摄像头，请检查浏览器权限，或直接上传图片。');
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg');
        setImagePreview(dataUrl);
        stopCamera();
        setAnalysisResult(null);
        setErrorMsg(null);
        setIsSaved(false);
      }
    }
  };

  // Trigger AI Analysis
  const analyzeQuestion = async () => {
    if (!imagePreview) return;

    setIsLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/analyze-image-question', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: imagePreview,
          mimeType: 'image/jpeg',
          userNotes: userNotes,
        }),
      });

      const data = await res.json();
      if (data.success && data.analysis) {
        setAnalysisResult(data.analysis);
      } else {
        setErrorMsg(data.error || 'AI 题目识别失败，请确保图片文字清晰后重试。');
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg('连接 AI 识别服务失败，请检查网络后再试。');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyOcr = () => {
    if (analysisResult?.ocrText) {
      navigator.clipboard.writeText(analysisResult.ocrText);
      setCopiedOcr(true);
      setTimeout(() => setCopiedOcr(false), 2000);
    }
  };

  const handleSaveToMistakeLog = () => {
    if (!analysisResult || !onSaveToMistakes) return;

    const newItem: QuestionBankItem = {
      id: `qb-photo-${Date.now()}`,
      subject: analysisResult.subject || '全科',
      gradeStage: analysisResult.grade?.includes('初') ? '初中' : '高中',
      gradeLevel: (analysisResult.grade as any) || '高中',
      topic: analysisResult.topic || '拍照搜题错题',
      question: analysisResult.ocrText || '拍照识别题目',
      explanation: analysisResult.stepByStepSolution.join('\n'),
      questionType: 'solution',
      difficulty: 'medium',
      keyPoints: analysisResult.keyPoints || [],
      isSavedToMistakes: true,
      userNote: userNotes || '拍照搜题存入错题本',
    };

    onSaveToMistakes(newItem);
    setIsSaved(true);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 pb-16 transition-colors duration-200">
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 sm:px-8 py-6 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">{t('photoSolveTitle')}</h2>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-800 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                Gemini MultiModal OCR
              </span>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              {t('photoSolveSubtitle')}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={startCamera}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-all cursor-pointer"
            >
              <Camera className="w-4 h-4 text-slate-600 dark:text-slate-300" />
              <span>{t('openCameraBtn')}</span>
            </button>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm rounded-xl transition-all cursor-pointer"
            >
              <Upload className="w-4 h-4" />
              <span>{t('uploadImageBtn')}</span>
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-8 space-y-8">
        {/* Camera Modal overlay if active */}
        {isCameraActive && (
          <div className="bg-slate-900 p-6 rounded-2xl shadow-xl text-white relative overflow-hidden flex flex-col items-center z-20">
            <button
              onClick={stopCamera}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-lg bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Camera className="w-5 h-5 text-indigo-400" />
              {t('cameraTitle')}
            </h3>
            <div className="relative w-full max-w-xl aspect-video bg-black rounded-xl overflow-hidden border border-slate-700">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />
              <canvas ref={canvasRef} className="hidden" />
            </div>
            <div className="mt-6 flex items-center gap-4">
              <button
                onClick={capturePhoto}
                className="px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-bold rounded-xl shadow-lg flex items-center gap-2 transition-all scale-105 cursor-pointer"
              >
                <Camera className="w-5 h-5" />
                <span>{t('captureBtn')}</span>
              </button>
              <button
                onClick={stopCamera}
                className="px-5 py-3 bg-slate-800 text-slate-300 font-semibold rounded-xl hover:bg-slate-700 cursor-pointer"
              >
                {t('cancelBtn')}
              </button>
            </div>
          </div>
        )}

        {/* Input Area: Upload Box or Image Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Image Box & Actions */}
          <div className="lg:col-span-5 space-y-6">
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              className={`bg-white dark:bg-slate-900 rounded-2xl border-2 border-dashed p-6 transition-all flex flex-col items-center justify-center min-h-[320px] text-center relative ${
                imagePreview ? 'border-indigo-300 dark:border-indigo-700 bg-indigo-50/10 dark:bg-indigo-950/20' : 'border-slate-300 dark:border-slate-700 hover:border-indigo-400 dark:hover:border-indigo-500'
              }`}
            >
              {imagePreview ? (
                <div className="w-full flex flex-col items-center">
                  <div className="relative max-h-[300px] rounded-xl overflow-hidden shadow-md border border-slate-200 dark:border-slate-800 group">
                    <img
                      src={imagePreview}
                      alt="Question Preview"
                      className="max-h-[300px] w-auto object-contain bg-slate-900"
                    />
                    <button
                      onClick={() => setImagePreview(null)}
                      className="absolute top-2 right-2 bg-slate-900/80 hover:bg-slate-900 text-white p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
                      title={uiLang === 'en' ? 'Clear Image' : '清除图片'}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs text-slate-400 mt-3">
                    {uiLang === 'en' ? 'Image ready. Click button below for AI analysis.' : '图片准备就绪，点击下方按钮开始 AI 解读'}
                  </p>
                </div>
              ) : (
                <div className="space-y-4 my-auto">
                  <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto shadow-xs">
                    <ImageIcon className="w-8 h-8" />
                  </div>
                  <div>
                    <p className="text-base font-bold text-slate-800 dark:text-slate-100">{t('dragOrClickToUpload')}</p>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">{t('imageFormatHint')}</p>
                  </div>
                  <div className="flex items-center justify-center gap-3 pt-2">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="px-4 py-2 bg-indigo-50 dark:bg-indigo-950/50 hover:bg-indigo-100 dark:hover:bg-indigo-900 text-indigo-600 dark:text-indigo-300 text-xs font-bold rounded-xl transition-all cursor-pointer"
                    >
                      {uiLang === 'en' ? 'Select Image File' : '选择本地图片'}
                    </button>
                    <button
                      onClick={startCamera}
                      className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold rounded-xl transition-all cursor-pointer"
                    >
                      {t('openCameraBtn')}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Note Input */}
            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                <span>{t('userNotesLabel')}</span>
              </label>
              <textarea
                value={userNotes}
                onChange={(e) => setUserNotes(e.target.value)}
                placeholder={t('userNotesPlaceholder')}
                rows={2}
                className="w-full text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 text-slate-800 dark:text-slate-100"
              />
            </div>

            {/* Submit Button */}
            <button
              onClick={analyzeQuestion}
              disabled={!imagePreview || isLoading}
              className={`w-full py-3.5 px-6 rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 ${
                !imagePreview || isLoading
                  ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed shadow-none'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-500/25 active:scale-[0.99] cursor-pointer'
              }`}
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>{t('solvingProgress')}</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>{t('solveQuestionBtn')}</span>
                </>
              )}
            </button>

            {/* Sample Images for quick test */}
            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
              <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-500" />
                或点击体验典型初高中考题样例
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {SAMPLE_QUESTIONS.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      setImagePreview(s.previewUrl);
                      setUserNotes(s.notes);
                      setAnalysisResult(null);
                      setErrorMsg(null);
                      setIsSaved(false);
                    }}
                    className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-indigo-400 dark:hover:border-indigo-500 bg-slate-50 dark:bg-slate-800/80 hover:bg-indigo-50/30 dark:hover:bg-indigo-950/30 text-left transition-all group cursor-pointer"
                  >
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200 line-clamp-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">{s.title}</p>
                    <span className="text-[10px] text-slate-400">{s.grade}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: AI Analysis Results */}
          <div className="lg:col-span-7 space-y-6">
            {errorMsg && (
              <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 shrink-0 text-rose-500" />
                <p className="font-medium">{errorMsg}</p>
              </div>
            )}

            {!analysisResult && !isLoading && !errorMsg && (
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-12 text-center space-y-4 flex flex-col items-center justify-center min-h-[420px]">
                <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shadow-xs">
                  <Sparkles className="w-8 h-8" />
                </div>
                <div className="max-w-md">
                  <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">{t('waitUploadHint')}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                    {uiLang === 'en'
                      ? 'AI Solver is optimized for K-12 exams, recognizing formulas & text, step-by-step logic, common traps, and variation questions.'
                      : '智学星 Gemini AI 专门针对初中与高中（中考/高考）课程优化，不仅识别公式与文字，更提供完整的解题思路、误区提醒及变式练习。'}
                  </p>
                </div>
              </div>
            )}

            {isLoading && (
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-12 text-center space-y-6 flex flex-col items-center justify-center min-h-[420px]">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full border-4 border-indigo-100 dark:border-slate-800 border-t-indigo-600 animate-spin" />
                  <Sparkles className="w-6 h-6 text-indigo-600 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">{t('solvingProgress')}</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    {uiLang === 'en' ? 'Intelligent formula analysis & step-by-step logic derivation' : '智能解析物理/数学公式推导与避坑指南'}
                  </p>
                </div>
              </div>
            )}

            {analysisResult && (
              <div className="space-y-6 animate-in fade-in duration-300">
                {/* Action Bar */}
                <div className="bg-indigo-900 dark:bg-indigo-950 text-white p-5 rounded-2xl shadow-md border border-indigo-800 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-indigo-800 rounded-lg text-xs font-bold text-indigo-200 border border-indigo-700">
                      {analysisResult.subject}
                    </span>
                    <span className="px-3 py-1 bg-indigo-800 rounded-lg text-xs font-bold text-indigo-200 border border-indigo-700">
                      {analysisResult.grade}
                    </span>
                    <span className="text-xs text-indigo-300 font-medium">
                      {uiLang === 'en' ? 'Topic: ' : '考点：'}{analysisResult.topic}
                    </span>
                  </div>

                  <button
                    onClick={handleSaveToMistakeLog}
                    disabled={isSaved}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                      isSaved
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'bg-white text-indigo-950 hover:bg-indigo-50 shadow-sm active:scale-95'
                    }`}
                  >
                    {isSaved ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span>{t('savedToMistakeLog')}</span>
                      </>
                    ) : (
                      <>
                        <Bookmark className="w-4 h-4 text-indigo-600" />
                        <span>{t('addToMistakeLog')}</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Question OCR Box */}
                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3 relative group">
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <FileText className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                      {t('ocrTextHeader')}
                    </h3>
                    <button
                      onClick={handleCopyOcr}
                      className="text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium flex items-center gap-1 cursor-pointer"
                    >
                      {copiedOcr ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedOcr ? (uiLang === 'en' ? 'Copied' : '已复制') : t('copyOcrBtn')}</span>
                    </button>
                  </div>
                  <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-mono whitespace-pre-wrap bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-100 dark:border-slate-700">
                    {analysisResult.ocrText}
                  </p>
                </div>

                {/* Key Formulas & Theorems */}
                {analysisResult.keyPoints && analysisResult.keyPoints.length > 0 && (
                  <div className="bg-blue-50/50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50 p-5 rounded-2xl space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300 flex items-center gap-1.5">
                      <Zap className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      {t('keyFormulasHeader')}
                    </h4>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {analysisResult.keyPoints.map((kp, idx) => (
                        <span
                          key={idx}
                          onClick={() => onExplainConcept?.(kp)}
                          className="px-3 py-1 bg-white dark:bg-slate-800 rounded-lg border border-blue-200 dark:border-slate-700 text-xs font-semibold text-blue-900 dark:text-blue-200 shadow-2xs hover:border-blue-400 dark:hover:border-blue-500 cursor-pointer transition-all flex items-center gap-1"
                          title={uiLang === 'en' ? 'Click for AI Concept Explanation' : '点击获取 AI 概念深度讲义'}
                        >
                          <span>{kp}</span>
                          <HelpCircle className="w-3 h-3 text-blue-400" />
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step-by-Step Resolution */}
                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    {t('stepByStepHeader')}
                  </h3>
                  <div className="space-y-3">
                    {analysisResult.stepByStepSolution.map((step, idx) => (
                      <div key={idx} className="flex items-start gap-3 bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-xl border border-slate-100 dark:border-slate-700">
                        <span className="w-6 h-6 rounded-lg bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-wrap">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Common Pitfalls & Mistakes */}
                {analysisResult.commonMistakes && analysisResult.commonMistakes.length > 0 && (
                  <div className="bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 p-5 rounded-2xl space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                      {t('commonMistakesHeader')}
                    </h4>
                    <ul className="space-y-1.5 pl-2">
                      {analysisResult.commonMistakes.map((m, idx) => (
                        <li key={idx} className="text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2">
                          <span className="text-amber-500 font-bold">•</span>
                          <span>{m}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Similar Variation Problem */}
                {analysisResult.similarQuestion && (
                  <div className="bg-slate-900 text-slate-100 p-6 rounded-2xl shadow-lg border border-slate-800 space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <h4 className="text-sm font-bold text-indigo-300 flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-indigo-400" />
                        {t('similarQuestionHeader')}
                      </h4>
                      <span className="text-[11px] bg-indigo-950 text-indigo-300 px-2.5 py-0.5 rounded-full border border-indigo-800">
                        巩固变式
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm leading-relaxed text-slate-200">
                      {analysisResult.similarQuestion.question}
                    </p>

                    {analysisResult.similarQuestion.options && analysisResult.similarQuestion.options.length > 0 && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                        {analysisResult.similarQuestion.options.map((opt, i) => (
                          <div key={i} className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-slate-300">
                            {opt}
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="pt-2 border-t border-slate-800">
                      <p className="text-xs text-emerald-400 font-bold mb-1">
                        答案与速解：{analysisResult.similarQuestion.correctAnswer}
                      </p>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {analysisResult.similarQuestion.explanation}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
