import { pinyin } from 'pinyin-pro';

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
  '卜', '顾', '孟', '平', '黄', '和', '穆', '萧', '尹', '姚'
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

// 生成中文名（保持不变）
export const generateChineseName = (input, offset) => {
  const code = generateCode(input) + offset;
  const surnameIndex = code % surnames.length;
  const givenNames = input.gender === 'male' ? maleGivenNames : femaleGivenNames;
  const nameIndex1 = Math.floor(code / 100) % givenNames.length;
  const nameIndex2 = Math.floor(code / 1000) % givenNames.length;

  return {
    surname: surnames[surnameIndex],
    givenName1: givenNames[nameIndex1],
    givenName2: givenNames[nameIndex2],
    fullName: surnames[surnameIndex] + givenNames[nameIndex1] + givenNames[nameIndex2]
  };
};

// 生成拼音
export const generatePinyin = (name) => {
  return pinyin(name, {
    style: pinyin.STYLE_TONE2,
    heteronym: false
  })
};