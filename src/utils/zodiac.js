/**
 * 根据生日计算生肖
 * @param {string} birthday - 生日日期字符串 (YYYY-MM-DD)
 * @returns {string} 生肖名称
 */
export function getZodiacSign(birthday) {
  const birthDate = new Date(birthday);
  const year = birthDate.getFullYear();
  const zodiacs = ['rat', 'ox', 'tiger', 'rabbit', 'dragon', 'snake', 'horse', 'sheep', 'monkey', 'rooster', 'dog', 'pig'];
  const index = (year - 1900) % 12;
  return zodiacs[index < 0 ? index + 12 : index];
}

/**
 * 获取生肖背景图片路径
 * @param {string} zodiac - 生肖名称
 * @returns {string} 图片路径
 */
export function getZodiacBackground(zodiac) {
  // 假设生肖图片存储在public/zodiac目录下
  return `/zodiac/${zodiac}.png`;
}