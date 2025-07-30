import { useEffect, useState } from 'preact/hooks';
import Header from './Header';
import Footer from './Footer';
import { useTranslation } from 'react-i18next';
import { generatePinyin } from '../utils/nameGenerator';
// 导入语音工具函数
import { speakName } from '../utils/speechUtils';
// 导入生肖工具函数
import { getZodiacBackground } from '../utils/zodiac';
// 导入支持作者组件
import SupportAuthor from './SupportAuthor';

export default function NamePage() {
  const { t } = useTranslation();
  const [params, setParams] = useState({ username: '', chineseName: '', zodiac: '' });

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    setParams({
      username: searchParams.get('username') || '',
      chineseName: searchParams.get('chineseName') || '',
      zodiac: searchParams.get('zodiac') || ''
    });
  }, []);

  // 计算生肖背景图片路径
  const zodiacBackground = params.zodiac ? getZodiacBackground(params.zodiac) : '';

  return (
    <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div class="max-w-md mx-auto">
        <Header />
        {/* 添加生肖背景图片样式 */}
        <div class="bg-white rounded-2xl shadow-xl overflow-hidden p-8 relative"
          style={zodiacBackground ? {
            backgroundImage: `url(${zodiacBackground})`,
            backgroundSize: '160px',
            backgroundPosition: 'bottom right',
            backgroundRepeat: 'no-repeat',
          } : {}}
        >
          {/* 添加半透明覆盖层确保文字可读性 */}
          <div class="relative p-6 rounded-xl">
            <div class="space-y-4">
              <p class="text-lg text-gray-700">
                {t('namePage.greeting', { username: params.username })}
              </p>
              <p class="text-lg text-gray-700">
                {t('namePage.zodiac', { zodiac: params.zodiac })}
              </p>
              <p class="text-lg text-gray-700">
                {t('namePage.name')}
              </p>
              <p class="text-2xl font-semibold text-blue-600 mt-6">
                {params.chineseName}
                <span class="text-sm text-gray-500">({generatePinyin(params.chineseName)})</span>
              </p>
              <button
                onClick={() => speakName(params.chineseName)}
                class="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
                aria-label={t('action.play_pronunciation')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                {t('action.listen_pronunciation')}
              </button>
            </div>

            {/* 添加赞助作者组件 */}
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