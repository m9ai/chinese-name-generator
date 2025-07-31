// 中文单字英文含义映射表
const characterMeanings = {
  // 志向类
  '宏': 'great', '博': 'broad', '睿': 'wise', '哲': 'philosopher', '彦': 'talented',
  '斌': 'refined', '彰': 'manifest', '显': 'visible', '凯': 'triumphant', '翔': 'soar',
  '腾': 'rise', '跃': 'leap', '进': 'advance', '达': 'achieve', '建': 'build',
  '树': 'tree', '功': 'merit', '成': 'success', '立': 'establish', '业': 'career',
  '耀': 'shine', '炫': 'dazzle', '灿': 'bright', '焕': 'radiant', '炳': 'brilliant',
  '朗': 'clear', '昭': 'manifest', '晰': 'clear', '亮': 'bright', '光': 'light',
  '智': 'wisdom', '慧': 'intelligence', '敏': 'quick', '锐': 'sharp', '思': 'think',
  '悟': 'enlighten', '晓': 'dawn', '知': 'know', '识': 'knowledge', '道': 'way',
  '理': 'reason', '论': 'theory', '文': 'literature', '章': 'chapter', '儒': 'scholar',
  '雅': 'elegant', '贤': 'virtuous', '杰': 'outstanding', '豪': 'heroic', '雄': 'male',
  '英': 'hero', '硕': 'large', '弘': 'vast', '邦': 'nation', '承': 'inherit',
  '绍': 'continue', '嗣': 'heir', '续': 'continue', '伟': 'great', '俊': 'handsome',
  '峰': 'peak', '辉': 'glory', '力': 'strength', '明': 'bright', '永': 'eternal',
  '健': 'healthy', '世': 'world', '广': 'wide', '志': 'ambition', '兴': 'prosper',
  '鹏': 'roc', '昊': 'vast sky', '寰': 'world', '锋': 'sharp', '升': 'rise',
  '武': 'martial', '振': 'shake', '阳': 'sun', '鸣': 'sing', '煜': 'brilliant',
  '昂': 'high', '乐': 'happy', '曜': 'shine', '烁': 'glitter', '潇': 'clear',
  '景': 'scenery', '帆': 'sail', '旭': 'rising sun', '峻': 'steep', '涛': 'wave',

  // 品德类
  '德': 'virtue', '行': 'conduct', '仁': 'benevolence', '义': 'righteousness',
  '礼': 'ritual', '智': 'wisdom', '信': 'faith', '忠': 'loyalty', '孝': 'filial',
  '廉': 'honest', '耻': 'shame', '勇': 'courage', '刚': 'firm', '毅': 'perseverance',
  '坚': 'firm', '强': 'strong', '直': 'straight', '方': 'square', '正': 'right',
  '诚': 'sincere', '实': 'real', '朴': 'simple', '素': 'plain', '纯': 'pure',
  '真': 'true', '清': 'clear', '洁': 'clean', '公': 'public', '平': 'fair',
  '端': 'upright', '庄': 'solemn', '严': 'strict', '谨': 'prudent', '慎': 'cautious',
  '密': 'secret', '笃': 'sincere', '厚': 'thick', '信': 'faith', '贞': 'chaste',
  '悌': 'brotherly', '友': 'friend', '爱': 'love', '和': 'harmony', '睦': 'harmonious',
  '谦': 'modest', '让': 'yielding', '恭': 'respectful', '敬': 'respect', '温': 'warm',
  '良': 'good', '俭': 'thrifty', '宽': 'broad', '容': 'tolerate', '慈': 'kind',

  // 美丽类（女性）
  '妍': 'beautiful', '嫣': 'charming', '婉': 'gentle', '娴': 'elegant', '娇': 'delicate',
  '娆': 'enchanting', '娉': 'graceful', '婷': 'graceful', '姝': 'pretty', '婵': 'graceful',
  '媚': 'charming', '倩': 'pretty', '俏': 'cute', '俐': 'clever', '佳': 'good',
  '嘉': 'praise', '瑾': 'jade', '瑜': 'jade', '琪': 'jade', '瑶': 'jade',
  '琛': 'precious', '璞': 'uncut jade', '璋': 'jade tablet', '珑': 'dragon', '芳': 'fragrant',
  '娟': 'beautiful', '华': 'magnificent', '巧': 'skillful', '美': 'beautiful', '娜': 'graceful',
  '静': 'quiet', '淑': 'virtuous', '珠': 'pearl', '翠': 'emerald', '芝': 'mushroom',
  '玉': 'jade', '萍': 'duckweed', '红': 'red', '娥': 'beautiful', '玲': 'tinkling',
  '雪': 'snow', '霞': 'rosy clouds', '香': 'fragrant', '月': 'moon', '莺': 'oriole',
  '艳': 'beautiful', '玑': 'pearl', '碧': 'green', '琼': 'jade', '瑛': 'jade',
  '璇': 'jade', '晶': 'crystal', '莹': 'lustrous', '秀': 'beautiful', '姣': 'beautiful',
  '好': 'good', '妙': 'wonderful', '韵': 'rhyme', '姿': 'posture', '靓': 'beautiful',
  '嫩': 'tender', '柔': 'soft', '窕': 'slender', '妩': 'charming', '娴': 'elegant',

  // 自然类（女性）
  '花': 'flower', '草': 'grass', '树': 'tree', '木': 'wood', '竹': 'bamboo',
  '梅': 'plum', '兰': 'orchid', '菊': 'chrysanthemum', '荷': 'lotus', '芙': 'hibiscus',
  '桃': 'peach', '李': 'plum', '杏': 'apricot', '梨': 'pear', '枣': 'date',
  '桂': 'laurel', '枫': 'maple', '松': 'pine', '柏': 'cypress', '柳': 'willow',
  '杨': 'poplar', '榆': 'elm', '槐': 'pagoda tree', '桐': 'tung tree', '桑': 'mulberry',
  '梓': 'catalpa', '榕': 'banyan', '梧': 'Chinese parasol', '樟': 'camphor tree',
  '菲': 'fragrant', '芬': 'fragrance', '若': 'like', '芷': 'angelica', '萱': 'daylily',
  '蓉': 'hibiscus', '蕙': 'orchid', '蕊': 'stamen', '馨': 'fragrant', '馥': 'fragrance',
  '霜': 'frost', '冰': 'ice', '露': 'dew', '水': 'water', '泉': 'spring',
  '溪': 'stream', '湖': 'lake', '海': 'sea', '河': 'river', '波': 'wave',
  '浪': 'wave', '潮': 'tide', '潭': 'deep pool', '池': 'pond', '泽': 'marsh',
  '晨': 'morning', '曦': 'sunlight', '岚': 'mist', '晴': 'clear', '晖': 'sunshine',

  // 其他常用字
  '国': 'country', '家': 'family', '福': 'fortune', '禄': 'prosperity', '寿': 'longevity',
  '喜': 'joy', '庆': 'celebrate', '丰': 'abundant', '收': 'harvest', '余': 'remaining',
  '裕': 'rich', '足': 'sufficient', '安': 'safe', '康': 'healthy', '泰': 'peaceful',
  '吉': 'lucky', '瑞': 'auspicious', '宝': 'treasure', '贵': 'noble', '富': 'rich',
  '荣': 'glory', '昌': 'flourishing', '隆': 'grand', '盛': 'prosperous', '兴': 'prosper',
  '发': 'develop', '财': 'wealth', '源': 'source', '远': 'far', '长': 'long',
  '高': 'tall', '大': 'big', '中': 'middle', '正': 'right', '和': 'harmony',
  '顺': 'obedient', '平': 'peaceful', '静': 'quiet', '宁': 'peaceful', '定': 'stable',
  '安': 'safe', '康': 'healthy', '乐': 'happy', '喜': 'joy', '福': 'fortune',
  '禄': 'prosperity', '寿': 'longevity', '财': 'wealth', '宝': 'treasure', '珠': 'pearl',
  '玉': 'jade', '金': 'gold', '银': 'silver', '铜': 'copper', '铁': 'iron',
  '水': 'water', '火': 'fire', '木': 'wood', '金': 'gold', '土': 'earth',
  '日': 'sun', '月': 'moon', '星': 'star', '辰': 'time', '天': 'sky',
  '地': 'earth', '人': 'people', '山': 'mountain', '川': 'river', '海': 'sea',
  '江': 'river', '河': 'river', '湖': 'lake', '泊': 'moor', '溪': 'stream'
};

// 获取名字的英文含义
export function getEnglishMeaning(name) {
  if (!name) return '';

  // 拆分名字为单字
  const characters = name.split('');
  const meanings = [];

  // 查找每个单字的英文含义
  for (const char of characters) {
    if (characterMeanings[char]) {
      meanings.push(characterMeanings[char]);
    } else {
      // 如果没有找到对应含义，使用拼音作为默认值
      // meanings.push('');
    }
  }

  return meanings.join(' & ');
}