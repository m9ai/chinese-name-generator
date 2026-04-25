/**
 * 简化版五行八字分析工具
 * 基于出生年份计算年柱天干地支及五行属性
 */

// 天干
const tianGan = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
// 地支
const diZhi = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

// 天干五行映射
const tianGanWuxing = {
  '甲': 'wood', '乙': 'wood',
  '丙': 'fire', '丁': 'fire',
  '戊': 'earth', '己': 'earth',
  '庚': 'metal', '辛': 'metal',
  '壬': 'water', '癸': 'water'
};

// 地支五行映射
const diZhiWuxing = {
  '寅': 'wood', '卯': 'wood',
  '巳': 'fire', '午': 'fire',
  '辰': 'earth', '戌': 'earth', '丑': 'earth', '未': 'earth',
  '申': 'metal', '酉': 'metal',
  '亥': 'water', '子': 'water'
};

// 五行英文及特性
export const wuxingData = {
  wood: {
    name: 'Wood',
    chinese: '木',
    pinyin: 'Mu',
    traits: 'growth, creativity, kindness',
    color: 'green',
    direction: 'East'
  },
  fire: {
    name: 'Fire',
    chinese: '火',
    pinyin: 'Huo',
    traits: 'passion, energy, leadership',
    color: 'red',
    direction: 'South'
  },
  earth: {
    name: 'Earth',
    chinese: '土',
    pinyin: 'Tu',
    traits: 'stability, honesty, reliability',
    color: 'yellow',
    direction: 'Center'
  },
  metal: {
    name: 'Metal',
    chinese: '金',
    pinyin: 'Jin',
    traits: 'strength, discipline, focus',
    color: 'white',
    direction: 'West'
  },
  water: {
    name: 'Water',
    chinese: '水',
    pinyin: 'Shui',
    traits: 'wisdom, flexibility, adaptability',
    color: 'black',
    direction: 'North'
  }
};

/**
 * 根据年份计算年柱天干地支
 * 1900年为庚子年
 */
function getYearPillar(year) {
  const ganIndex = (year - 1900) % 10;
  const zhiIndex = (year - 1900) % 12;
  return {
    gan: tianGan[ganIndex < 0 ? ganIndex + 10 : ganIndex],
    zhi: diZhi[zhiIndex < 0 ? zhiIndex + 12 : zhiIndex]
  };
}

/**
 * 获取八字五行分析结果
 * @param {string} birthday - YYYY-MM-DD
 * @returns {object} 分析结果
 */
export function getWuxingAnalysis(birthday) {
  const year = new Date(birthday).getFullYear();
  const pillar = getYearPillar(year);

  const ganElement = tianGanWuxing[pillar.gan];
  const zhiElement = diZhiWuxing[pillar.zhi];

  // 统计出现的五行
  const counts = { wood: 0, fire: 0, earth: 0, metal: 0, water: 0 };
  counts[ganElement]++;
  counts[zhiElement]++;

  // 找出缺失的元素（简化版：年柱只有2个元素，大概率会缺失某些）
  const missing = Object.entries(counts)
    .filter(([, count]) => count === 0)
    .map(([element]) => element);

  // 主导元素（天干为主）
  const dominant = ganElement;

  return {
    yearPillar: `${pillar.gan}${pillar.zhi}`,
    yearPinyin: `${wuxingData[ganElement].pinyin} ${wuxingData[zhiElement].pinyin}`,
    elements: {
      gan: { name: pillar.gan, element: ganElement, ...wuxingData[ganElement] },
      zhi: { name: pillar.zhi, element: zhiElement, ...wuxingData[zhiElement] }
    },
    dominantElement: dominant,
    missingElements: missing,
    counts
  };
}

/**
 * 五行分类名字单字库（按性别）
 * 用于生成补运名字
 */
export const wuxingGivenNames = {
  male: {
    wood: ['林', '森', '松', '柏', '柳', '桐', '梓', '楠', '棠', '樱', '栋', '桥', '梁', '桂', '梅', '竹', '芝', '萱', '蓉', '蕙'],
    fire: ['炎', '煜', '煊', '炜', '烨', '煦', '熹', '照', '晴', '暖', '昭', '昕', '旭', '昊', '曦', '曜', '晟', '昱', '炳', '灿'],
    earth: ['坤', '垚', '城', '培', '基', '堂', '均', '坦', '坪', '壤', '壁', '坛', '域', '堡', '垒', '增', '境', '墨', '尘', '地'],
    metal: ['鑫', '铭', '锐', '钧', '铮', '铄', '锦', '铖', '铠', '铸', '钰', '钊', '钟', '镜', '鉴', '铛', '锋', '锌', '锡', '钢'],
    water: ['泽', '涵', '沐', '沛', '洋', '涛', '溪', '润', '洲', '清', '浩', '海', '江', '河', '湖', '波', '浪', '潮', '深', '渊']
  },
  female: {
    wood: ['林', '森', '松', '柏', '柳', '桐', '梓', '楠', '棠', '樱', '梅', '兰', '竹', '菊', '荷', '芙', '芝', '萱', '蓉', '蕙'],
    fire: ['炎', '煜', '煊', '炜', '烨', '煦', '熹', '照', '晴', '暖', '昭', '昕', '旭', '曦', '曜', '晟', '昱', '炳', '灿', '烁'],
    earth: ['坤', '垚', '城', '培', '基', '堂', '均', '坦', '坪', '壤', '壁', '坛', '域', '堡', '垒', '增', '境', '墨', '尘', '地'],
    metal: ['鑫', '铭', '锐', '钧', '铮', '铄', '锦', '铖', '铠', '铸', '钰', '钊', '钟', '镜', '鉴', '铛', '锋', '锌', '锡', '钢'],
    water: ['泽', '涵', '沐', '沛', '洋', '涛', '溪', '润', '洲', '清', '浩', '海', '江', '河', '湖', '波', '浪', '潮', '深', '渊']
  }
};

/**
 * 根据缺失五行推荐名字特质
 */
export function getWuxingNameSuggestion(missingElements) {
  if (!missingElements || missingElements.length === 0) {
    return 'balanced';
  }

  // 返回最缺的那个元素的推荐字
  const target = missingElements[0];
  return {
    element: target,
    ...wuxingData[target],
    suggestedChars: wuxingGivenNames.male[target] || []
  };
}
