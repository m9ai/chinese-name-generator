export function isSpeechSupported() {
  return 'speechSynthesis' in window;
}

export function speakName(name) {
  // 检查浏览器支持情况
  if (!isSpeechSupported()) {
    console.warn('当前浏览器不支持语音合成功能');
    return false;
  }

  try {
    const utterance = new SpeechSynthesisUtterance(name);
    utterance.lang = 'zh-CN';
    // 添加语音播放错误处理
    utterance.onerror = (event) => {
      console.error('语音播放失败:', event.error);
    };
    window.speechSynthesis.speak(utterance);
    return true;
  } catch (error) {
    console.error('语音合成发生错误:', error);
    return false;
  }
}