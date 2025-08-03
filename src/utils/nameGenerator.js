import { pinyin } from 'pinyin-pro';
import { getEnglishMeaning } from './nameMeanings';

// 导入扩充后的名字数组
import maleGivenNames from './maleGivenNames';
import femaleGivenNames from './femaleGivenNames';

// 姓氏数组（保持不变）
export const surnames = [
  '赵', '钱', '孙', '李', '周', '吴', '郑', '王', '冯', '陈',
  '褚', '卫', '蒋', '沈', '韩', '杨', '朱', '秦', '尤', '许',
  '何', '吕', '施', '张', '孔', '曹', '严', '华', '金', '魏',
  '陶', '姜', '戚', '谢', '邹', '喻', '柏', '水', '窦', '章',
  '云', '苏', '潘', '葛', '奚', '范', '彭', '郎', '鲁', '韦',
  '昌', '马', '苗', '凤', '花', '方', '俞', '任', '袁', '柳',
  '鲍', '史', '唐', '费', '廉', '岑', '薛', '雷', '贺', '倪',
  '汤', '滕', '殷', '罗', '毕', '郝', '邬', '安', '常', '乐',
  '于', '时', '傅', '皮', '卞', '齐', '康', '伍', '余', '元',
  '卜', '顾', '孟', '平', '黄', '和', '穆', '萧', '尹', '姚',
  // 新增的100个姓氏
  '邵', '湛', '汪', '祁', '毛', '禹', '狄', '米', '贝', '明',
  '臧', '计', '伏', '成', '戴', '谈', '宋', '茅', '庞', '熊',
  '纪', '舒', '屈', '项', '祝', '董', '梁', '杜', '阮', '蓝',
  '闵', '席', '季', '麻', '强', '贾', '路', '娄', '危', '江',
  '童', '颜', '郭', '梅', '盛', '林', '刁', '钟', '徐', '邱',
  '骆', '高', '夏', '蔡', '田', '樊', '胡', '凌', '霍', '虞',
  '万', '支', '柯', '昝', '管', '卢', '莫', '经', '房', '裘',
  '缪', '干', '解', '应', '宗', '丁', '宣', '贲', '邓', '郁',
  '单', '杭', '洪', '包', '诸', '左', '石', '崔', '吉', '钮',
  '龚', '程', '嵇', '邢', '滑', '裴', '陆', '荣', '翁', '荀',
  // 新增的50个姓氏
  '羊', '於', '惠', '甄', '曲', '家', '封', '芮', '羿', '储',
  '靳', '汲', '邴', '糜', '松', '井', '段', '富', '巫', '乌',
  '焦', '巴', '弓', '牧', '隗', '山', '谷', '车', '侯', '宓',
  '蓬', '全', '郗', '班', '仰', '秋', '仲', '伊', '宫', '宁',
  '仇', '栾', '暴', '甘', '钭', '厉', '戎', '祖', '武', '符'
];

// 生成名字编码
export const generateCode = (input) => {
  let code = 0;
  // 混合名字字符编码
  for (let i = 0; i < input.name.length; i++) {
    code += input.name.charCodeAt(i) * (i + 1);
  }
  // 加入性别因素
  code += input.gender === 'male' ? 1000 : 2000;
  // 加入生日因素
  const birthDate = new Date(input.birthday);
  code += birthDate.getFullYear() + birthDate.getMonth() + birthDate.getDate();
  return code;
};

// 生成中文名（添加随机性）
export const generateChineseName = (input, offset = 0) => {
  const code = generateCode(input) + offset;
  
  // 添加随机因素
  const randomFactor = Math.floor(Math.random() * 1000);
  
  const surnameIndex = (code + randomFactor) % surnames.length;
  const givenNames = input.gender === 'male' ? maleGivenNames : femaleGivenNames;
  
  // 为名字索引添加不同的随机偏移
  const nameIndex1 = (Math.floor(code / 100) + Math.floor(Math.random() * 100)) % givenNames.length;
  const nameIndex2 = (Math.floor(code / 1000) + Math.floor(Math.random() * 100)) % givenNames.length;

  const surname = surnames[surnameIndex];
  const givenName1 = givenNames[nameIndex1];
  const givenName2 = givenNames[nameIndex2];
  const fullName = surname + givenName1 + givenName2;

  return {
    surname,
    givenName1,
    givenName2,
    fullName,
    meaning: getEnglishMeaning(givenName1 + givenName2)
  };
};

// 生成拼音
export const generatePinyin = (name) => {
  return pinyin(name, {
    style: pinyin.STYLE_TONE2,
    heteronym: false
  })
};