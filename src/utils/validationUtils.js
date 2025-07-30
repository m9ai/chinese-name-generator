// 英文禁用词列表 - 可根据需求扩展
export const ENGLISH_PROHIBITED_WORDS = 
  ["hate", "despise", "loathe", "resent", "detest", "stupid", "idiot", "worthless", "useless", "inferior", "pathetic", "ridiculous", "absurd", "terrible", "awful", "blame", "condemn", "criticize", "insult", "mock", "ridicule", "nigger", "kike", "chink", "wog", "bitch", "slut", "faggot", "fag", "dyke", "retard", "fuck", "shit", "cunt", "prick", "piss", "Nazi", "terrorist", "genocide"];

/**
 * 验证用户名是否包含禁用词
 * @param {string} username - 待验证的用户名
 * @returns {Object} 验证结果 { isValid: boolean, errorMessage: string }
 */
export function validateUsername(username) {
  if (!username) {
    return { isValid: false, errorMessage: 'Username is required' };
  }

  // 检查是否包含禁用词（不区分大小写）
  const hasProhibitedWord = ENGLISH_PROHIBITED_WORDS.some(word => 
    username.toLowerCase().includes(word.toLowerCase())
  );

  if (hasProhibitedWord) {
    return { 
      isValid: false, 
      errorMessage: 'Username contains inappropriate content'
    };
  }

  return { isValid: true, errorMessage: '' };
}