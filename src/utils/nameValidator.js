import { surnames } from './nameGenerator';
import maleGivenNames from './maleGivenNames';
import femaleGivenNames from './femaleGivenNames';

/**
 * 验证中文姓名是否有效
 * @param {string} chineseName - 完整中文姓名（3个汉字）
 * @param {string} gender - 性别 ('male' 或 'female')
 * @param {function} t - 国际化翻译函数
 * @returns {Object} 验证结果 { isValid: boolean, error: string }
 */
export const validateChineseName = (chineseName, gender, t) => {
  console.log('Validation input:', { chineseName, gender });
  // 验证基本条件
  if (!chineseName || !gender || !t) {
    return {
      isValid: false,
      error: t ? t('nameValidation.missingParameters') : 'Missing required parameters'
    };
  }

  // 验证姓名格式（必须是3个汉字）
  if (chineseName.length !== 3) {
    return {
      isValid: false,
      error: t('nameValidation.invalidFormat')
    };
  }

  // 拆分姓氏和名字
  const surname = chineseName[0];
  const givenName1 = chineseName[1];
  const givenName2 = chineseName[2];

  // 验证姓氏
  if (!surnames.includes(surname)) {
    console.log('Invalid surname:', surname);
    return {
      isValid: false,
      error: t('nameValidation.invalidSurname')
    };
  }

  // 根据性别选择对应的名字数组
  const givenNames = gender === 'male' ? maleGivenNames : femaleGivenNames;

  // 验证名字第一个字
  if (!givenNames.includes(givenName1)) {
    return {
      isValid: false,
      error: t('nameValidation.invalidGivenName', { char: givenName1 })
    };
  }

  // 验证名字第二个字
  if (!givenNames.includes(givenName2)) {
    return {
      isValid: false,
      error: t('nameValidation.invalidGivenName', { char: givenName2 })
    };
  }

  // 所有验证通过
  console.log('Name validation passed');
  return {
    isValid: true,
    error: ''
  };
};