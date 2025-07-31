/**
 * 根据生日计算生肖
 * @param {string} birthday - 生日日期字符串 (YYYY-MM-DD)
 * @returns {string} 生肖名称
 */


export const zodiacs = ['rat', 'ox', 'tiger', 'rabbit', 'dragon', 'snake', 'horse', 'goat', 'monkey', 'rooster', 'dog', 'pig'];

export function getZodiacSign(birthday) {
  const birthDate = new Date(birthday);
  const year = birthDate.getFullYear();
  const index = (year - 1900) % 12;
  return zodiacs[index < 0 ? index + 12 : index];
}

export const zodiacMeanings = {
  rat: {
    pinyin: "Shu",
    meaning: "Smart, adaptable, and quick-witted. Seen as resourceful problem-solvers who thrive in new situations and make the most of opportunities."
  },
  ox: {
    pinyin: "Niu",
    meaning: "Hardworking, reliable, and patient. Represents diligence and strength; steady, trustworthy, and never shies away from effort."
  },
  tiger: {      
    pinyin: "Hu",
    meaning: "Brave, confident, and charismatic. Symbolizes power and courage; natural leaders with a bold, energetic spirit."
  },
  rabbit: {
    pinyin: "Tu",
    meaning: "Gentle, kind, and quick-thinking. Seen as peaceful, intuitive, and good at avoiding conflict while staying alert."
  },
  dragon: {
    pinyin: "Long",
    meaning: "Mighty, lucky, and visionary. Unlike Western dragons, Chinese dragons symbolize prosperity, strength, and good fortune; represent ambition and a 'larger-than-life' presence."
  },
  snake: {  
    pinyin: "She",
    meaning: "Wise, calm, and observant. Associated with deep insight; thinks carefully before acting and often has a quiet, mysterious wisdom."
  },
  horse: {    
    pinyin: "Ma",
    meaning: "Energetic, free-spirited, and optimistic. Symbolizes vitality and independence; loves adventure and thrives on movement and new experiences."
  },
  goat: {
    pinyin: "Yang",
    meaning: "Kind, gentle, and creative. Seen as harmonious, artistic, and caring; values peace and enjoys bringing people together."
  },
  monkey: {
    pinyin: "Hou",
    meaning: "Clever, playful, and flexible. Known for intelligence and sense of humor; great at adapting to changes and solving tricky problems."
  },
  rooster: {  
    pinyin: "Ji",
    meaning: "Hardworking, honest, and punctual. Represents diligence (they 'wake up the world' each morning) and straightforwardness; reliable and speaks their mind."
  },
  dog: {
    pinyin: "Gou",
    meaning: "Loyal, honest, and protective. Symbols of faithfulness; care deeply about loved ones and always stand by them."
  },
  pig: {
    pinyin: "Zhu",
    meaning: "Kind, generous, and optimistic. Represents prosperity and warmth; easygoing, sincere, and brings joy to those around them."
  }
}

/**
 * 获取生肖背景图片路径
 * @param {string} zodiac - 生肖名称
 * @returns {string} 图片路径
 */
export function getZodiacBackground(zodiac) {
  // 假设生肖图片存储在public/zodiac目录下
  return zodiacs.indexOf(zodiac) !== -1 ? `/zodiac/${zodiac}.png` : '/zodiac/default.png';
}