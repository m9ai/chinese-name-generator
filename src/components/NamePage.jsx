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
                    {t('namePage.zodiac')}<span class="text-blue-600">{params.zodiac.toUpperCase()}</span>
                  </p>
                )
              }
              <p class="text-lg text-gray-700">
                {t('namePage.name')}
              </p>

              {isNameValid ? (
                <>
                  <div class="text-center py-4">
                    <p class="text-4xl font-bold text-gray-900 tracking-tight mb-1">
                      {params.chineseName}
                    </p>
                    <p class="text-lg text-blue-600 font-medium">
                      {generatePinyin(params.chineseName)}
                    </p>
                  </div>
                  <p class="text-lg text-gray-700 text-center">
                    {t('results.meaning')}<span class="text-blue-600">{getEnglishMeaning(params.chineseName.substring(1))}</span>
                  </p>
                  <div class="flex justify-center gap-3 py-2">
                    <SpeekBtn chineseName={params.chineseName} />
                  </div>
                  <p class="text-sm text-gray-500 text-center">
                    {t('results.zodiac', {zodiac: params.zodiac})}{zodiacMeanings[params.zodiac].meaning}
                  </p>

                  {/* 分享操作区 */}
                  <div class="flex justify-center gap-2 pt-4">
                    <button
                      onClick={() => {
                        const shareUrl = window.location.href;
                        const shareText = `${t('share.title')}: ${params.chineseName} (${generatePinyin(params.chineseName)})\n${t('share.zodiac')}: ${params.zodiac}\n${t('share.generated_by')}: chinese-name.m9ai.work`;
                        if (navigator.share) {
                          navigator.share({ title: t('share.title'), text: shareText, url: shareUrl }).catch(console.error);
                        } else {
                          navigator.clipboard.writeText(shareText + '\n' + shareUrl).then(() => {
                            const toast = document.createElement('div');
                            toast.className = 'fixed bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-green-500 text-white rounded-md z-50';
                            toast.textContent = t('share.copied');
                            document.body.appendChild(toast);
                            setTimeout(() => document.body.removeChild(toast), 2000);
                          }).catch(console.error);
                        }
                      }}
                      class="flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                      </svg>
                      {t('actions.share')}
                    </button>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(window.location.href).then(() => {
                          const toast = document.createElement('div');
                          toast.className = 'fixed bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-green-500 text-white rounded-md z-50';
                          toast.textContent = t('share.linkCopied');
                          document.body.appendChild(toast);
                          setTimeout(() => document.body.removeChild(toast), 2000);
                        }).catch(console.error);
                      }}
                      class="flex items-center gap-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      {t('actions.copyLink')}
                    </button>
                  </div>
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
