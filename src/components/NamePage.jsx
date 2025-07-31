import { useEffect, useState } from 'preact/hooks';
import Header from './Header';
import Footer from './Footer';
import { useTranslation } from 'react-i18next';
import { generatePinyin, surnames } from '../utils/nameGenerator';
import { getZodiacBackground, zodiacMeanings } from '../utils/zodiac';
import SupportAuthor from './SupportAuthor';
// 导入姓名验证工具
import { validateChineseName } from '../utils/nameValidator';
// 添加用户名验证工具导入
import { validateUsername } from '../utils/validationUtils';
import { zodiacs } from '../utils/zodiac';
import SpeekBtn from './SpeekBtn';
import { getEnglishMeaning } from '../utils/nameMeanings';

export default function NamePage() {
  const { t } = useTranslation();
  const [params, setParams] = useState({
    username: '',
    chineseName: '',
    zodiac: '',
    gender: ''
  });
  const [isNameValid, setIsNameValid] = useState(false);
  const [validationError, setValidationError] = useState('');
  // 添加用户名错误状态
  const [usernameError, setUsernameError] = useState('');

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    setParams(prev => ({
      ...prev,
      username: searchParams.get('username') || '',
      chineseName: searchParams.get('chineseName') || '',
      zodiac: searchParams.get('zodiac') || '',
      gender: searchParams.get('gender') || ''
    }));
  }, []);

  // 使用外部验证工具进行姓名验证
  useEffect(() => {
    // 重置验证状态
    setIsNameValid(false);
    setValidationError('');

    // 验证条件：必须有完整的姓名和性别参数
    if (!params.chineseName || !params.gender) {
      setValidationError(t('nameValidation.missingParameters'));
      return;
    }

    // 调用验证工具
    const validationResult = validateChineseName(
      params.chineseName,
      params.gender,
      t
    );

    setIsNameValid(validationResult.isValid);
    setValidationError(validationResult.error);
  }, [params.chineseName, params.gender, t]);

  // 添加用户名验证effect
  useEffect(() => {
    setUsernameError('');
    if (params.username) {
      const { isValid, errorMessage } = validateUsername(params.username);
      if (!isValid) {
        setUsernameError(errorMessage);
      }
    }
  }, [params.username, t]);

  const zodiacBackground = params.zodiac ? getZodiacBackground(params.zodiac) : '/zodiac/default.png';

  return (
    <div class="min-h-screen min-w-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div class="max-w-md mx-auto">
        <Header />
        <div class="bg-white rounded-2xl shadow-xl overflow-hidden p-8 relative" style={zodiacBackground ? {
          backgroundImage: `url(${zodiacBackground})`,
          backgroundSize: 'contain',
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          backgroundBlendMode: 'overlay',
          backgroundRepeat: 'no-repeat',
        } : {}}>
          <div class="relative p-6 rounded-xl">
            <div class="space-y-4">
              {/* 添加用户名错误提示 */}
              {usernameError ? (
                <div class="bg-orange-50 border border-orange-200 text-orange-700 px-4 py-3 rounded-lg animate-fadeIn">
                  <p class="font-medium">{t('usernameValidation.warning')}</p>
                  <p class="text-sm mt-1">{usernameError}</p>
                </div>
              ) : (<p class="text-lg text-gray-700">
                {t('namePage.greeting')}<span class="text-blue-600">{params.username}</span>
              </p>)}

              {
                zodiacs.indexOf(params.zodiac) !== -1 && (
                  <p class="text-lg text-gray-700">
                    {t('namePage.zodiac')}<span class="text-blue-600">{params.zodiac}</span>
                  </p>
                )
              }
              <p class="text-lg text-gray-700">
                {t('namePage.name')}
              </p>

              {isNameValid ? (
                <>
                  <p class="text-2xl font-semibold text-blue-600 mt-6">
                    {params.chineseName}
                    <span class="text-sm text-gray-500">({generatePinyin(params.chineseName)})</span>
                  </p>
                  <p class="text-lg text-gray-700">
                    {t('results.meaning')}<span class="text-blue-600">{getEnglishMeaning(params.chineseName.substring(1))}</span>
                  </p>
                  <SpeekBtn chineseName={params.chineseName} />
                  <p class="text-sm text-gray-500">
                    {t('results.zodiac', {zodiac: params.zodiac})}{zodiacMeanings[params.zodiac].meaning}
                  </p>
                </>
              ) : (
                <div class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mt-6 animate-fadeIn">
                  <p class="font-medium">{t('nameValidation.warning')}</p>
                  <p class="mt-1 text-sm">{validationError}</p>
                </div>
              )}
            </div>

            <div class="pt-6">
              <SupportAuthor />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
