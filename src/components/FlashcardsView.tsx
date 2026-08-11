import React, { useState } from 'react';
import { 
  Volume2, 
  RotateCw, 
  Plus, 
  CheckCircle2, 
  Languages, 
  Sparkles, 
  Tag, 
  Bookmark, 
  BookOpen,
  ArrowRight
} from 'lucide-react';
import { Flashcard } from '../types';
import { speakText } from '../utils/speech';
import { UILanguage, TRANSLATIONS } from '../utils/translations';

interface FlashcardsViewProps {
  cards: Flashcard[];
  onReviewCard: (cardId: string, rating: 'again' | 'hard' | 'good' | 'easy') => void;
  onAddCard: (card: Omit<Flashcard, 'id' | 'intervalDays' | 'easeFactor' | 'repetitions' | 'nextReviewDate' | 'masteryLevel'>) => void;
  onGenerateCardsFromText: (subject: string, text: string) => Promise<void>;
  uiLang: UILanguage;
}

export const FlashcardsView: React.FC<FlashcardsViewProps> = ({
  cards,
  onReviewCard,
  onAddCard,
  onGenerateCardsFromText,
  uiLang,
}) => {
  const t = (key: keyof typeof TRANSLATIONS) => TRANSLATIONS[key][uiLang] || TRANSLATIONS[key].bilingual;

  const [selectedLang, setSelectedLang] = useState<string>('all');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [showAiModal, setShowAiModal] = useState<boolean>(false);

  // Form states for manual add
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');
  const [phonetic, setPhonetic] = useState('');
  const [subject, setSubject] = useState(uiLang === 'en' ? 'General Subject' : '通用知识');
  const [language, setLanguage] = useState('en');
  const [exampleInput, setExampleInput] = useState('');

  // Form states for AI Generate Cards
  const [aiSubject, setAiSubject] = useState(uiLang === 'en' ? 'IELTS English' : '英语雅思');
  const [aiTextContent, setAiTextContent] = useState('');
  const [isGeneratingCards, setIsGeneratingCards] = useState(false);

  // Filter cards by language
  const filteredCards = cards.filter((c) => {
    if (selectedLang === 'all') return true;
    return c.language === selectedLang;
  });

  const currentCard = filteredCards[currentIndex] || filteredCards[0];

  const handleSpeech = (text: string, lang: string) => {
    speakText(text, lang);
  };

  const handleRating = (rating: 'again' | 'hard' | 'good' | 'easy') => {
    if (!currentCard) return;
    onReviewCard(currentCard.id, rating);
    setIsFlipped(false);
    
    // Advance to next card
    if (filteredCards.length > 1) {
      setCurrentIndex((prev) => (prev + 1) % filteredCards.length);
    }
  };

  const handleCreateCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!front.trim() || !back.trim()) return;

    onAddCard({
      subject,
      language,
      front: front.trim(),
      back: back.trim(),
      phonetic: phonetic.trim() || undefined,
      examples: exampleInput.trim() ? [exampleInput.trim()] : undefined,
      tags: [subject, language],
    });

    setFront('');
    setBack('');
    setPhonetic('');
    setExampleInput('');
    setShowAddModal(false);
  };

  const handleGenerateAiCards = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiTextContent.trim()) return;

    setIsGeneratingCards(true);
    try {
      await onGenerateCardsFromText(aiSubject, aiTextContent);
      setAiTextContent('');
      setShowAiModal(false);
    } catch (err) {
      console.error('Failed to generate cards:', err);
    } finally {
      setIsGeneratingCards(false);
    }
  };

  const languages = [
    { code: 'all', label: uiLang === 'en' ? 'All Languages' : '全部语言 / 科目' },
    { code: 'en', label: 'English' },
    { code: 'zh', label: '中文 (Chinese)' },
    { code: 'ja', label: '日本語 (Japanese)' },
    { code: 'fr', label: 'Français (French)' },
  ];

  return (
    <div className="flex-1 flex flex-col h-full bg-[#F8FAFC] overflow-y-auto">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-8 py-6 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">{t('flashcardsTitle')}</h2>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-100">
                Ebbinghaus Flashcards
              </span>
            </div>
            <p className="text-sm text-slate-500 mt-1">
              {t('flashcardsDesc')}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAiModal(true)}
              className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition shadow-xs"
            >
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span>{t('aiGenerateCardBtn')}</span>
            </button>

            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>{t('newCardBtn')}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Flashcard Container */}
      <div className="p-8 max-w-5xl mx-auto w-full flex flex-col items-center gap-8">
        
        {/* Language Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-2">
          {languages.map((l) => (
            <button
              key={l.code}
              onClick={() => {
                setSelectedLang(l.code);
                setCurrentIndex(0);
                setIsFlipped(false);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                selectedLang === l.code
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>

        {/* Card Stage */}
        {filteredCards.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md w-full my-8">
            <Languages className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">
              {uiLang === 'en' ? 'No flashcards in this category' : '暂无该语言分类的复习卡片'}
            </h3>
            <p className="text-xs text-slate-500 mt-1 mb-4">
              {uiLang === 'en' ? 'Create manually or paste text for AI generation.' : '您可以手动创建或贴入学习材料由 AI 自动生成。'}
            </p>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-xs font-bold"
            >
              {uiLang === 'en' ? 'Create First Card' : '创建第一张卡片'}
            </button>
          </div>
        ) : (
          <div className="w-full max-w-xl flex flex-col gap-6">
            
            {/* Flip Card Box */}
            <div
              onClick={() => setIsFlipped(!isFlipped)}
              className="min-h-[320px] bg-white rounded-2xl border border-slate-200 shadow-sm p-8 flex flex-col justify-between cursor-pointer hover:border-blue-300 transition relative overflow-hidden group"
            >
              {/* Top info */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md">
                    {currentCard.subject}
                  </span>
                  <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                    {currentCard.language.toUpperCase()}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSpeech(currentCard.front, currentCard.language);
                    }}
                    className="p-2 rounded-full bg-slate-100 hover:bg-blue-100 text-slate-600 hover:text-blue-600 transition"
                    title={uiLang === 'en' ? 'Click for TTS Speech' : '点击朗读标准发音'}
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                  <span className="text-xs font-semibold text-slate-400">
                    {currentIndex + 1} / {filteredCards.length}
                  </span>
                </div>
              </div>

              {/* Card Main Text */}
              <div className="my-auto py-6 text-center">
                {!isFlipped ? (
                  /* FRONT */
                  <div className="space-y-3">
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400">{t('cardFront')}</p>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                      {currentCard.front}
                    </h3>
                    {currentCard.phonetic && (
                      <p className="text-sm font-medium text-blue-600 font-mono">
                        {currentCard.phonetic}
                      </p>
                    )}
                    <p className="text-[11px] text-slate-400 italic pt-4">
                      {t('flipToSeeBack')}
                    </p>
                  </div>
                ) : (
                  /* BACK */
                  <div className="space-y-4 text-left">
                    <p className="text-xs font-bold uppercase tracking-widest text-blue-600 text-center">
                      {t('cardBack')}
                    </p>

                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                      <p className="text-base font-bold text-slate-900 whitespace-pre-line leading-relaxed">
                        {currentCard.back}
                      </p>
                    </div>

                    {currentCard.examples && currentCard.examples.length > 0 && (
                      <div className="space-y-1.5">
                        <p className="text-[11px] font-bold text-slate-400 uppercase">
                          {uiLang === 'en' ? 'Example Sentences' : '应用例句/演练'}
                        </p>
                        {currentCard.examples.map((ex, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-slate-600 bg-blue-50/50 p-2.5 rounded-lg border border-blue-100">
                            <span className="text-blue-500 font-bold">•</span>
                            <span className="leading-relaxed">{ex}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Bottom Tags */}
              <div className="flex items-center justify-between border-t border-slate-100 pt-4 text-xs text-slate-400">
                <div className="flex items-center gap-1.5 flex-wrap">
                  {currentCard.tags?.map((tg, idx) => (
                    <span key={idx} className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                      #{tg}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-1 text-slate-400 text-[11px]">
                  <RotateCw className="w-3.5 h-3.5" />
                  <span>{uiLang === 'en' ? 'Mastery' : '掌握度'} {currentCard.masteryLevel}%</span>
                </div>
              </div>
            </div>

            {/* Ebbinghaus Review Rating Buttons */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col gap-3">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400 text-center">
                {t('recallLevelLabel')}
              </p>

              <div className="grid grid-cols-4 gap-2.5">
                <button
                  onClick={() => handleRating('again')}
                  className="py-3 px-2 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 font-bold text-xs flex flex-col items-center gap-1 transition"
                >
                  <span>{t('recallAgain')}</span>
                  <span className="text-[10px] font-normal text-rose-500">(1 {uiLang === 'en' ? 'day' : '天'})</span>
                </button>

                <button
                  onClick={() => handleRating('hard')}
                  className="py-3 px-2 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-700 font-bold text-xs flex flex-col items-center gap-1 transition"
                >
                  <span>{t('recallHard')}</span>
                  <span className="text-[10px] font-normal text-amber-600">(2 {uiLang === 'en' ? 'days' : '天'})</span>
                </button>

                <button
                  onClick={() => handleRating('good')}
                  className="py-3 px-2 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-700 font-bold text-xs flex flex-col items-center gap-1 transition"
                >
                  <span>{t('recallGood')}</span>
                  <span className="text-[10px] font-normal text-blue-600">(4 {uiLang === 'en' ? 'days' : '天'})</span>
                </button>

                <button
                  onClick={() => handleRating('easy')}
                  className="py-3 px-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-700 font-bold text-xs flex flex-col items-center gap-1 transition"
                >
                  <span>{t('recallEasy')}</span>
                  <span className="text-[10px] font-normal text-emerald-600">(7 {uiLang === 'en' ? 'days' : '天'})</span>
                </button>
              </div>
            </div>

          </div>
        )}
      </div>

      {/* Manual Add Card Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-4">{t('newCardBtn')}</h3>
            <form onSubmit={handleCreateCard} className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase text-slate-500 block mb-1">
                  {t('cardFront')}
                </label>
                <input
                  type="text"
                  required
                  placeholder={uiLang === 'en' ? 'e.g., Mitigate or Newton\'s First Law' : '如：Mitigate 或 动量守恒定理适用条件'}
                  value={front}
                  onChange={(e) => setFront(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-slate-500 block mb-1">
                  {uiLang === 'en' ? 'Phonetic / Pinyin / Kana (Optional)' : '音标 / 假名 / 拼音 (可选)'}
                </label>
                <input
                  type="text"
                  placeholder="e.g., /ˈmɪtɪɡeɪt/"
                  value={phonetic}
                  onChange={(e) => setPhonetic(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-slate-500 block mb-1">
                  {t('cardBack')}
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder={uiLang === 'en' ? 'e.g., v. to make something less severe' : '如：v. 使减轻，使缓和'}
                  value={back}
                  onChange={(e) => setBack(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold uppercase text-slate-500 block mb-1">
                    {uiLang === 'en' ? 'Subject' : '所属科目'}
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase text-slate-500 block mb-1">
                    {uiLang === 'en' ? 'Language Code' : '语种代号'}
                  </label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="en">English (en)</option>
                    <option value="zh">中文 (zh)</option>
                    <option value="ja">日本語 (ja)</option>
                    <option value="fr">Français (fr)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-slate-500 block mb-1">
                  {uiLang === 'en' ? 'Example Sentence (Optional)' : '经典应用例句 (可选)'}
                </label>
                <input
                  type="text"
                  placeholder="e.g., Policies were implemented to mitigate climate change."
                  value={exampleInput}
                  onChange={(e) => setExampleInput(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
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
                  {uiLang === 'en' ? 'Save Card' : '保存卡片'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* AI Material Auto Generate Cards Modal */}
      {showAiModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 text-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-800">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-blue-400" />
              <h3 className="text-lg font-bold">{t('aiGenerateCardBtn')}</h3>
            </div>
            
            <form onSubmit={handleGenerateAiCards} className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase text-slate-400 block mb-1">
                  {uiLang === 'en' ? 'Subject / Topic' : '科目 / 主题'}
                </label>
                <input
                  type="text"
                  required
                  value={aiSubject}
                  onChange={(e) => setAiSubject(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-slate-400 block mb-1">
                  {uiLang === 'en' ? 'Paste Text Material / Notes / Article' : '粘贴学习文章 / 笔记 / 句型材料'}
                </label>
                <textarea
                  rows={5}
                  required
                  placeholder={uiLang === 'en' ? 'Paste an IELTS reading passage, physics explanation, or grammar notes. AI will extract 4 study cards automatically...' : '例如粘贴一段雅思阅读文章、法语语法规则或物理定理段落，AI 将自动提取 4 张高频知识卡片...'}
                  value={aiTextContent}
                  onChange={(e) => setAiTextContent(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAiModal(false)}
                  className="px-4 py-2 rounded-lg text-xs font-bold text-slate-400 hover:text-white"
                >
                  {uiLang === 'en' ? 'Cancel' : '取消'}
                </button>
                <button
                  type="submit"
                  disabled={isGeneratingCards}
                  className="px-5 py-2.5 rounded-lg text-xs font-bold bg-blue-600 text-white hover:bg-blue-500 shadow-md flex items-center gap-2"
                >
                  {isGeneratingCards ? (
                    <>
                      <Sparkles className="w-3.5 h-3.5 animate-spin" />
                      <span>AI Generating...</span>
                    </>
                  ) : (
                    <span>{uiLang === 'en' ? 'Extract Cards' : '开始提炼卡片'}</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

