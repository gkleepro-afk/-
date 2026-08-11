// Speech synthesis helper for multi-language review (English, Chinese, Japanese, Spanish, French, German, Korean, etc.)

export const speakText = (text: string, languageCode: string = 'en') => {
  if (!('speechSynthesis' in window)) {
    console.warn('Speech synthesis is not supported in this browser.');
    return;
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);

  // Map language codes
  const langMap: Record<string, string> = {
    en: 'en-US',
    zh: 'zh-CN',
    ja: 'ja-JP',
    es: 'es-ES',
    fr: 'fr-FR',
    de: 'de-DE',
    ko: 'ko-KR',
  };

  utterance.lang = langMap[languageCode] || languageCode || 'en-US';
  utterance.rate = 0.95; // Slightly clear and articulate

  // Find appropriate voice if loaded
  const voices = window.speechSynthesis.getVoices();
  const matchedVoice = voices.find((v) => v.lang.startsWith(utterance.lang.substring(0, 2)));
  if (matchedVoice) {
    utterance.voice = matchedVoice;
  }

  window.speechSynthesis.speak(utterance);
};
