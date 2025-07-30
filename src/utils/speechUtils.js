/**
 * 语音朗读中文名字
 * @param {string} name - 要朗读的中文名字
 */
export const speakName = (name) => {
  // 停止任何正在播放的语音
  window.speechSynthesis.cancel();

  // 创建语音合成对象
  const utterance = new SpeechSynthesisUtterance(name);
  // 设置中文语音
  utterance.lang = 'zh-CN';
  // 调整语速
  utterance.rate = 0.5;
  // 播放语音
  window.speechSynthesis.speak(utterance);
};