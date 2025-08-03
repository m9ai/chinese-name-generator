// 中文单字英文含义映射表 - 优化版（体现名字的美好引申含义，全部使用形容词）
const characterMeanings = {
  // 志向类
  '宏': 'ambitious', '博': 'knowledgeable', '睿': 'wise', '哲': 'thoughtful', '彦': 'talented',
  '斌': 'refined', '彰': 'distinguished', '显': 'illustrious', '凯': 'triumphant', '翔': 'aspiring',
  '腾': 'aspiring', '跃': 'vigorous', '进': 'progressive', '达': 'accomplished', '建': 'ambitious',
  '树': 'steadfast', '功': 'achieved', '成': 'successful', '立': 'established', '业': 'professional',
  '耀': 'radiant', '炫': 'brilliant', '灿': 'bright', '焕': 'radiant', '炳': 'brilliant',
  '朗': 'clear', '昭': 'illustrious', '晰': 'clear', '亮': 'bright', '光': 'radiant',
  '智': 'wise', '慧': 'intelligent', '敏': 'quick-witted', '锐': 'sharp', '思': 'thoughtful',
  '悟': 'enlightened', '晓': 'wise', '知': 'knowledgeable', '识': 'learned', '道': 'wise',
  '理': 'reasonable', '论': 'thoughtful', '文': 'cultured', '章': 'elegant', '儒': 'scholarly',
  '雅': 'elegant', '贤': 'virtuous', '杰': 'outstanding', '豪': 'heroic', '雄': 'heroic',
  '英': 'outstanding', '硕': 'great', '宏': 'vast', '邦': 'national', '承': 'inheritant',
  '绍': 'continuing', '嗣': 'heir', '续': 'continuous', '伟': 'great', '俊': 'handsome',
  '峰': 'lofty', '辉': 'glorious', '力': 'strong', '明': 'wise and bright', '永': 'eternal',
  '健': 'healthy', '世': 'worldly', '广': 'broad', '志': 'ambitious', '兴': 'prosperous',
  '鹏': 'ambitious', '昊': 'vast', '寰': 'cosmopolitan', '锋': 'sharp', '升': 'rising',
  '武': 'martial', '振': 'vibrant', '阳': 'sunny', '鸣': 'vocal', '煜': 'brilliant',
  '昂': 'dignified', '乐': 'happy', '曜': 'shining', '烁': 'glittering', '潇': 'elegant',
  '景': 'scenic', '帆': 'sailing', '旭': 'rising', '峻': 'lofty', '涛': 'turbulent',
  '勋': 'meritorious', '绩': 'accomplished', '创': 'creative', '拓': 'pioneering', '展': 'developing',
  '繁': 'flourishing', '荣': 'glorious', '超': 'excellent', '越': 'outstanding', '卓': 'distinguished',
  '尔': 'elegant', '拔': 'outstanding', '群': 'excellent', '独': 'independent', '绝': 'unique',
  '著': 'famous', '伦': 'excellent', '宇': 'vast', '浩': 'vast', '轩': 'lofty',
  '根': 'firm', '利': 'beneficial', '长': 'long', '魁': 'outstanding', '嘉': 'excellent',
  '毓': 'nurturing', '昌': 'prosperous', '岱': 'lofty', '槿': 'resilient', '筱': 'elegant',
  '师': 'learned', '吉': 'lucky', '棠': 'elegant', '千': 'numerous', '旗': 'honorable',
  '威': 'dignified', '昔': 'precious', '春': 'vibrant', '灵': 'clever', '樟': 'steadfast',
  '治': 'governing', '晴': 'clear', '米': 'nourishing', '晖': 'radiant', '昶': 'bright',
  '同': 'united', '众': 'numerous', '忆': 'memorable', '朋': 'friendly', '瑞': 'auspicious',
  '优': 'excellent', '琰': 'precious', '甜': 'sweet', '晟': 'brilliant', '橦': 'tall',
  '昕': 'rising', '栎': 'strong', '漪': 'gentle', '璐': 'precious', '宝': 'treasured',
  '秉': 'upholding', '湛': 'profound', '礼': 'courteous', '朔': 'new', '童': 'innocent',
  '囿': 'encompassing', '糯': 'gentle', '汛': 'abundant', '源': 'sourceful', '嵘': 'lofty',
  '杭': 'prosperous', '满': 'fulfilling', '有': 'possessing', '初': 'new', '依': 'reliable',
  '榕': 'strong', '珩': 'precious', '兮': 'elegant', '川': 'flowing', '书': 'scholarly',
  '研': 'studious', '禹': 'wise', '泊': 'calm', '冬': 'persevering', '惠': 'kind',
  '祎': 'beautiful', '容': 'tolerant', '真': 'genuine', '柔': 'gentle', '炀': 'bright',
  '熹': 'radiant', '滕': 'rising', '颂': 'praiseworthy', '轼': 'wise', '羲': 'righteous',
  '汐': 'gentle', '竞': 'striving', '予': 'giving', '铧': 'sharp', '仟': 'numerous',
  '吟': 'elegant', '梅': 'resilient', '桓': 'steadfast', '徐': 'gentle', '峥': 'lofty',
  '沐': 'cleansing', '卿': 'noble', '澄': 'clear', '柯': 'strong', '坤': 'vast',
  '珂': 'precious', '熔': 'passionate', '唯': 'unique', '旌': 'honorable', '然': 'natural',
  '俞': 'joyful', '妘': 'elegant', '渝': 'persistent', '为': 'achieving', '恬': 'calm',
  '烟': 'elegant', '士': 'scholarly', '传': 'spreading', '斯': 'elegant', '墨': 'cultured',
  '樘': 'tall', '园': 'peaceful', '仪': 'elegant', '湉': 'calm', '宛': 'gentle',
  '来': 'arriving', '兵': 'strong', '梦': 'aspiring', '城': 'secure', '方': 'honest',
  '淳': 'pure', '奎': 'precious', '歌': 'joyful', '烨': 'brilliant', '心': 'sincere',
  '可': 'lovely', '察': 'perceptive', '怀': 'kind', '宗': 'noble', '洲': 'vast',
  '凤': 'noble', '忻': 'joyful', '淞': 'flowing', '晗': 'rising', '奞': 'outstanding',
  '劦': 'united', '悰': 'joyful', '佑': 'blessed', '炎': 'passionate', '相': 'wise',
  '珒': 'precious', '晞': 'radiant', '观': 'insightful', '奥': 'profound', '灏': 'vast',
  '致': 'diligent', '晋': 'promising', '伯': 'noble', '钦': 'respectful', '旻': 'vast',
  '朝': 'prosperous', '怿': 'joyful', '渊': 'profound', '善': 'kind', '沛': 'abundant',
  '杉': 'strong',

  // 品德类
  '德': 'virtuous', '行': 'moral', '仁': 'benevolent', '义': 'righteous',
  '礼': 'courteous', '智': 'wise', '信': 'trustworthy', '忠': 'loyal', '孝': 'filial',
  '廉': 'honest', '耻': 'shameful', '勇': 'courageous', '刚': 'resolute', '毅': 'determined',
  '坚': 'firm', '强': 'strong', '直': 'upright', '方': 'honest', '正': 'righteous',
  '诚': 'sincere', '实': 'truthful', '朴': 'unpretentious', '素': 'elegantly simple', '纯': 'pure',
  '真': 'genuine', '清': 'pure', '洁': 'clean', '公': 'fair', '平': 'peaceful',
  '端': 'upright', '庄': 'dignified', '严': 'strict', '谨': 'prudent', '慎': 'cautious',
  '密': 'careful', '笃': 'sincere', '厚': 'kind', '信': 'faithful', '贞': 'chaste',
  '悌': 'brotherly', '友': 'friendly', '爱': 'loving', '和': 'harmonious', '睦': 'amicable',
  '谦': 'modest', '让': 'humble', '恭': 'respectful', '敬': 'respectful', '温': 'gentle',
  '良': 'kind', '俭': 'thrifty', '宽': 'broad-minded', '容': 'tolerant', '慈': 'kind',

  // 美丽类（女性）
  '妍': 'beautiful', '嫣': 'charming', '婉': 'graceful and gentle', '娴': 'elegant', '娇': 'lovely and delicate',
  '娆': 'enchanting', '娉': 'graceful', '婷': 'graceful', '姝': 'beautiful and virtuous', '婵': 'graceful',
  '媚': 'charming', '倩': 'pretty', '俏': 'cute', '俐': 'clever', '佳': 'excellent',
  '嘉': 'praiseworthy', '瑾': 'precious', '瑜': 'fine', '琪': 'beautiful', '瑶': 'precious',
  '琛': 'precious', '璞': 'natural', '璋': 'elegant', '珑': 'delicate', '芳': 'fragrant',
  '娟': 'beautiful', '华': 'magnificent', '巧': 'skillful', '美': 'beautiful', '娜': 'graceful',
  '静': 'quiet', '淑': 'virtuous', '珠': 'pearly', '翠': 'emerald', '芝': 'elegant',
  '玉': 'jade-like', '萍': 'graceful', '红': 'red', '娥': 'beautiful', '玲': 'tinkling',
  '雪': 'snowy', '霞': 'rosy', '香': 'fragrant', '月': 'moonlit', '莺': 'melodious',
  '艳': 'beautiful', '玑': 'pearly', '碧': 'green', '琼': 'precious', '瑛': 'precious',
  '璇': 'precious', '晶': 'crystal', '莹': 'lustrous', '秀': 'beautiful', '姣': 'beautiful',
  '好': 'good', '妙': 'wonderful', '韵': 'graceful', '姿': 'posture', '靓': 'beautiful',
  '嫩': 'tender', '柔': 'soft', '窕': 'slender', '妩': 'charming', '娴': 'elegant',
  '姬': 'noble', '嬴': 'prosperous', '妫': 'elegant', '姞': 'noble', '娄': 'elegant',
  '姒': 'noble', '妯': 'harmonious', '娌': 'harmonious', '婀': 'graceful', '婺': 'elegant',
  '姮': 'graceful', '娣': 'kind', '婶': 'kind', '嫂': 'virtuous', '姆': 'kind',
  '姥': 'wise', '婆': 'kind', '嬉': 'joyful', '娱': 'joyful', '窈': 'slender',
  '窕': 'slender', '约': 'gentle', '顺': 'obedient', '蔼': 'kind', '亲': 'affectionate',
  '切': 'sincere', '怜': 'compassionate', '悯': 'compassionate', '惜': 'cherishing', '捷': 'quick-witted',
  '伶': 'clever', '黠': 'smart', '能': 'capable', '艺': 'artistic', '贵': 'noble',
  '豪': 'magnificent', '显': 'illustrious', '赫': 'brilliant', '彩': 'colorful', '鲜': 'fresh',
  '透': 'clear', '亮': 'bright',

  // 自然类（女性）
  '花': 'flowery', '草': 'grassy', '树': 'woody', '木': 'wooden', '竹': 'integrity',
  '梅': 'resilient', '兰': 'elegant', '菊': 'noble', '荷': 'pure', '芙': 'graceful',
  '桃': 'peachy', '李': 'plummy', '杏': 'apricot', '梨': 'pearlescent', '枣': 'date-like',
  '桂': 'laurel', '枫': 'maple', '松': 'piney', '柏': 'cypress', '柳': 'willowy',
  '杨': 'poplar', '榆': 'elm', '槐': 'tall', '桐': 'strong', '桑': 'mulberry',
  '梓': 'catalpa', '榕': 'banyan', '梧': 'elegant', '樟': 'fragrant',
  '菲': 'fragrant', '芬': 'fragrant', '若': 'like', '芷': 'elegant', '萱': 'graceful',
  '蓉': 'graceful', '蕙': 'elegant', '蕊': 'delicate', '馨': 'fragrant', '馥': 'fragrant',
  '霜': 'frosty', '冰': 'icy', '露': 'dewy', '水': 'watery', '泉': 'spring-like',
  '溪': 'streaming', '湖': 'lake-like', '海': 'seaside', '河': 'riverine', '波': 'wavy',
  '浪': 'wavy', '潮': 'tidal', '潭': 'deep', '池': 'pond-like', '泽': 'kind and graceful',
  '晨': 'morning', '曦': 'sunny', '岚': 'misty', '晴': 'clear', '晖': 'sunny',

  // 其他常用字
  '国': 'national', '家': 'family-oriented', '福': 'blessed', '禄': 'prosperous', '寿': 'long-lived',
  '喜': 'joyful', '庆': 'celebratory', '丰': 'abundant', '收': 'harvestful', '余': 'surplus',
  '裕': 'rich', '足': 'sufficient', '安': 'safe', '康': 'healthy', '泰': 'peaceful',
  '吉': 'lucky', '瑞': 'auspicious', '宝': 'treasured', '贵': 'noble', '富': 'rich',
  '荣': 'glorious', '昌': 'flourishing', '隆': 'grand', '盛': 'prosperous', '兴': 'prosperous',
  '发': 'developing', '财': 'wealthy', '源': 'sourceful', '远': 'far', '长': 'long',
  '高': 'tall', '大': 'big', '中': 'middle', '正': 'right', '和': 'harmonious',
  '顺': 'smooth', '平': 'peaceful', '静': 'quiet', '宁': 'peaceful', '定': 'stable',
  '安': 'safe', '康': 'healthy', '乐': 'happy', '喜': 'joyful', '福': 'blessed',
  '禄': 'prosperous', '寿': 'long-lived', '财': 'wealthy', '宝': 'treasured', '珠': 'pearly',
  '玉': 'jade-like', '金': 'golden', '银': 'silver', '铜': 'copper', '铁': 'iron',
  '水': 'watery', '火': 'fiery', '木': 'wooden', '金': 'golden', '土': 'earthy',
  '日': 'sunny', '月': 'moonlit', '星': 'starry', '辰': 'fortunate', '天': 'heavenly',
  '地': 'earthy', '人': 'human', '山': 'mountainous', '川': 'flowing', '海': 'seaside',
  '江': 'riverine', '河': 'riverine', '湖': 'lake-like', '泊': 'moored', '溪': 'streaming',

  // 新增男性单字英文含义
  '琮': 'precious', '琨': 'noble', '琰': 'jade-like', '瑱': 'elegant', '瑾': 'valuable',
  '璋': 'esteemed', '璜': 'graceful', '珩': 'precious', '璐': 'treasured', '琚': 'elegant',
  '琛': 'valuable', '玚': 'bright', '玠': 'noble', '玢': 'refined', '玦': 'unique',
  '瑗': 'round', '瑭': 'elegant', '瑶': 'precious', '璃': 'crystal', '瓘': 'jade-like',
  '瓚': 'precious', '瓒': 'valuable', '瓓': 'beautiful', '璎': 'jewel-like', '珞': 'precious',
  '琀': 'elegant', '琎': 'precious', '琇': 'beautiful', '珺': 'elegant', '琭': 'precious',
  '琛': 'precious', '琚': 'elegant', '琤': 'tinkling', '琯': 'refined', '琱': 'carved',
  '琳': 'beautiful', '琅': 'jade-like', '球': 'round', '理': 'precious', '琏': 'elegant',
  '琐': 'delicate', '琦': 'precious', '琪': 'beautiful', '瑛': 'lustrous', '瑤': 'precious',
  '璞': 'natural', '璟': 'brilliant', '琸': 'precious', '瑄': 'elegant', '玘': 'precious',
  '玙': 'elegant', '瑜': 'fine', '瑒': 'bright', '瑁': 'precious', '瑧': 'perfect',
  '璀': 'brilliant', '璨': 'bright', '璁': 'precious', '璐': 'treasured', '瓊': 'precious',
  '璆': 'elegant', '璠': 'precious', '璜': 'graceful', '璞': 'natural', '璟': 'brilliant',
  '璵': 'precious', '璘': 'bright', '璿': 'precious', '玑': 'pearly', '璪': 'elegant',
  '璩': 'precious', '璐': 'treasured', '瓒': 'valuable', '璬': 'elegant', '璭': 'beautiful',
  '璮': 'precious', '璱': 'elegant', '璲': 'valuable', '璳': 'bright', '瑤': 'precious',
  '璵': 'precious', '璸': 'elegant', '璹': 'valuable', '璺': 'unique', '玕': 'precious',
  '玙': 'elegant', '玚': 'bright', '玥': 'precious', '珤': 'treasured', '珹': 'bright',
  '珵': 'precious', '珶': 'elegant', '珷': 'valuable', '珸': 'bright', '珹': 'radiant',
  '珻': 'precious', '珼': 'elegant', '珽': 'valuable', '現': 'present', '珿': 'precious',
  '琀': 'elegant', '琁': 'precious', '琂': 'valuable', '琄': 'elegant', '琅': 'precious',
  '琇': 'beautiful', '琈': 'precious', '琉': 'elegant', '琊': 'valuable', '琋': 'precious',
  '琌': 'elegant', '琍': 'beautiful', '琎': 'precious', '琏': 'valuable', '琐': 'elegant',
  '琑': 'precious', '琒': 'bright', '琓': 'elegant', '琔': 'valuable', '琕': 'precious',
  '琖': 'elegant', '琗': 'valuable', '琘': 'precious', '琙': 'elegant', '琚': 'valuable',
  '琜': 'precious', '琝': 'elegant', '琟': 'valuable', '琠': 'precious', '琡': 'elegant',

  // 新增女性单字英文含义
  '璎': 'precious', '珞': 'jewel-like', '瓒': 'valuable', '琏': 'elegant', '琇': 'beautiful',
  '珺': 'graceful', '琭': 'precious', '琤': 'tinkling', '琯': 'refined', '琱': 'carved',
  '琳': 'beautiful', '琅': 'jade-like', '球': 'round', '理': 'precious', '琏': 'elegant',
  '琐': 'delicate', '琦': 'precious', '琪': 'beautiful', '瑛': 'lustrous', '瑤': 'precious',
  '璞': 'natural', '璟': 'brilliant', '琸': 'precious', '瑄': 'elegant', '玘': 'precious',
  '玙': 'elegant', '瑜': 'fine', '瑒': 'bright', '瑁': 'precious', '瑧': 'perfect',
  '璀': 'brilliant', '璨': 'bright', '璁': 'precious', '璐': 'treasured', '瓊': 'precious',
  '璆': 'elegant', '璠': 'precious', '璜': 'graceful', '璞': 'natural', '璟': 'brilliant',
  '璵': 'precious', '璘': 'bright', '璿': 'precious', '玑': 'pearly', '璪': 'elegant',
  '璩': 'precious', '璐': 'treasured', '瓒': 'valuable', '璬': 'elegant', '璭': 'beautiful',
  '璮': 'precious', '璱': 'elegant', '璲': 'valuable', '璳': 'bright', '瑤': 'precious',
  '璵': 'precious', '璸': 'elegant', '璹': 'valuable', '璺': 'unique', '玕': 'precious',
  '玙': 'elegant', '玚': 'bright', '玥': 'precious', '珤': 'treasured', '珹': 'bright',
  '珵': 'precious', '珶': 'elegant', '珷': 'valuable', '珸': 'bright', '珹': 'radiant',
  '珻': 'precious', '珼': 'elegant', '珽': 'valuable', '現': 'present', '珿': 'precious',
  '琀': 'elegant', '琁': 'precious', '琂': 'valuable', '琄': 'elegant', '琅': 'precious',
  '琇': 'beautiful', '琈': 'precious', '琉': 'elegant', '琊': 'valuable', '琋': 'precious',
  '琌': 'elegant', '琍': 'beautiful', '琎': 'precious', '琏': 'valuable', '琐': 'elegant',
  '琑': 'precious', '琒': 'bright', '琓': 'elegant', '琔': 'valuable', '琕': 'precious',
  '琖': 'elegant', '琗': 'valuable', '琘': 'precious', '琙': 'elegant', '琚': 'valuable',
  '琜': 'precious', '琝': 'elegant', '琟': 'valuable', '琠': 'precious', '琡': 'elegant',
  '琢': 'beautiful', '琣': 'precious', '琤': 'tinkling', '琧': 'elegant', '琩': 'precious',
  '琫': 'valuable', '琭': 'precious', '琯': 'refined', '琱': 'carved', '琲': 'pearly',
  '琻': 'precious', '琽': 'elegant', '琾': 'valuable', '瑀': 'precious', '瑁': 'valuable',
  '瑂': 'elegant', '瑃': 'precious', '瑄': 'valuable', '瑅': 'precious', '瑇': 'elegant',
  '瑈': 'valuable', '瑉': 'precious', '瑊': 'elegant', '瑋': 'valuable', '瑌': 'precious',
  '瑍': 'elegant', '瑎': 'valuable', '瑏': 'precious', '瑐': 'elegant', '瑑': 'valuable',
  '瑒': 'bright', '瑓': 'precious', '瑔': 'elegant', '瑕': 'valuable', '瑖': 'precious',
  '瑗': 'round', '瑘': 'precious', '瑙': 'elegant', '瑚': 'valuable', '瑛': 'precious',
  '瑜': 'elegant', '瑝': 'valuable', '瑞': 'precious', '瑟': 'elegant', '瑠': 'valuable',
  '瑡': 'precious', '瑢': 'elegant', '瑣': 'delicate', '瑤': 'precious', '瑥': 'elegant',
  '瑦': 'valuable', '瑧': 'perfect', '瑨': 'elegant', '瑩': 'lustrous', '瑪': 'precious',
  '瑫': 'elegant', '瑬': 'valuable', '瑭': 'elegant', '瑮': 'precious', '瑯': 'jade-like'
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
      // 如果没有找到对应含义，留空
    }
  }

  // 按照要求的格式返回结果
  if (meanings.length > 0) {
    return meanings.join(' & ');
  } else {
    return '';
  }
}