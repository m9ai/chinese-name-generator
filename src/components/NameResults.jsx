import { useTranslation } from 'react-i18next';
// 导入赞助作者组件
import SupportAuthor from '../components/SupportAuthor';
import SpeekBtn from '../components/SpeekBtn';
import { getZodiacBackground, zodiacMeanings } from '../utils/zodiac';
import ZodiacCard from '../components/ZodiacCard';

import { useState, useEffect } from 'preact/hooks';
import WuxingCard from './WuxingCard';

export default function NameResults({ names, onSave, saveStatus, userName, zodiac, onRegenerate, birthday }) {
  const { t } = useTranslation();
  const [regenCount, setRegenCount] = useState(0);
  const [showSupportNudge, setShowSupportNudge] = useState(null); // 'saved' | 'listened' | 'regen' | null

  useEffect(() => {
    if (saveStatus === 'saved') {
      setShowSupportNudge('saved');
      const timer = setTimeout(() => setShowSupportNudge(prev => prev === 'saved' ? null : prev), 5000);
      return () => clearTimeout(timer);
    }
  }, [saveStatus]);

  if (!names) return null;

  const handleRegenerate = (type) => {
    if (onRegenerate) {
      onRegenerate(type);
      const nextCount = regenCount + 1;
      setRegenCount(nextCount);
      if (nextCount >= 3) {
        setShowSupportNudge('regen');
        setTimeout(() => setShowSupportNudge(prev => prev === 'regen' ? null : prev), 5000);
      }
    }
  };

  const navigateToNamePage = (nameData) => {
    const params = new URLSearchParams({
      username: userName,
      chineseName: nameData.name,
      zodiac: zodiac,
      gender: nameData.gender || '0' // 添加性别参数
    });
    window.location.href = `/name?${params.toString()}`;
  };

  return (
    <div class="bg-gradient-to-b from-gray-50 to-white p-6 sm:p-8 border-t border-gray-100 animate-fadeIn">
      <h2 id="results-title" class="text-xl font-bold text-gray-800 mb-2 text-center">{t('results.title')}</h2>
      <p class="text-sm text-gray-500 text-center mb-6">{t('results.save_instruction')}</p>

      <div class="space-y-6">
        <ZodiacCard zodiac={zodiac} />
        <WuxingCard birthday={birthday} />
        {/* Name Cards */}
        {Object.entries(names).map(([type, nameData], index) => (
          <div key={index} class="relative bg-white p-5 rounded-xl shadow-sm border border-gray-100 transform transition-all hover:shadow-md hover:-translate-y-0.5 duration-200">
            <div class="flex items-center gap-2 mb-1">
              <h3 class="text-sm font-medium text-gray-500 capitalize">{t(`results.${type}`)}</h3>
              {type === 'lucky' && nameData.wuxingElement && (
                <span class="text-xs px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 font-medium">
                  {t(`wuxing.${nameData.wuxingElement}`)}
                </span>
              )}
            </div>
            <p class="text-3xl font-bold text-gray-900 mb-1 tracking-tighter">{nameData.name}
              <span class="text-lg text-blue-600 font-medium"> {nameData.pinyin}</span>
            </p>
            <p class="text-sm text-gray-600 mb-3">{t('results.meaning')}{nameData.meaning}</p>

            {/* 添加语音播放按钮 */}
            <SpeekBtn
              chineseName={nameData.name}
              onPlayEnd={() => {
                setShowSupportNudge('listened');
                setTimeout(() => setShowSupportNudge(prev => prev === 'listened' ? null : prev), 4000);
              }}
            />
            <div class="flex space-x-2 absolute right-0 top-0">
              <button
                onClick={() => handleRegenerate(type)}
                class="px-3 py-1 text-gray-500 text-sm rounded-lg hover:text-blue-600 hover:bg-blue-50 transition-colors border-none outline-none"
                title={t('action.regenerate')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
              <button
                onClick={() => navigateToNamePage(nameData)}
                class="px-3 py-1 text-blue-600 text-sm rounded-lg hover:text-blue-600 transition-colors border-none outline-none dark:text-white"
              >
                {t('action.select')}
              </button>
              <button
                onClick={() => {
                  const shareText = `${t('share.title')}: ${nameData.name} (${nameData.pinyin})\n${t('share.zodiac')}: ${zodiac}\n${t('share.generated_by')}: chinese-name.m9ai.work`;
                  if (navigator.share) {
                    navigator.share({
                      title: t('share.title'),
                      text: shareText,
                      url: window.location.href
                    }).catch(console.error);
                  } else {
                    navigator.clipboard.writeText(shareText + '\n' + window.location.href)
                      .then(() => {
                        // 显示复制成功提示
                        const toast = document.createElement('div');
                        toast.className = 'fixed bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-green-500 text-white rounded-md';
                        toast.textContent = t('share.copied');
                        document.body.appendChild(toast);
                        setTimeout(() => document.body.removeChild(toast), 2000);
                      })
                      .catch(console.error);
                  }
                }}
                class="px-3 py-1 text-gray-600 text-sm rounded-lg hover:bg-gray-100 transition-colors border-none outline-none dark:text-gray-300"
                title={t('share.button_title')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
              </button>
            </div>
          </div>
        ))}

        {/* Save Button */}
        <button
          class={`w-full font-medium py-3 px-4 rounded-lg shadow-md transition-all duration-200 text-white bg-gradient-to-r from-blue-600 to-indigo-600 ${saveStatus === 'saving' ? 'bg-green-500 opacity-70 cursor-not-allowed' :
              saveStatus === 'saved' ? 'bg-green-600 hover:bg-green-700' :
                saveStatus === 'error' ? 'bg-red-600 hover:bg-red-700' :
                  'bg-green-600 hover:bg-green-700'
            }`}
          disabled={saveStatus === 'saving'}
          onClick={onSave}  // 添加点击事件处理
        >
          {saveStatus === 'saving' ? (
            <div class="flex items-center justify-center space-x-2">
              <div class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>{t('status.saving')}</span>
            </div>
          ) : saveStatus === 'saved' ? (
            <div class="flex items-center justify-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>{t('status.saved_success')}</span>
            </div>
          ) : saveStatus === 'error' ? (
            <div class="flex items-center justify-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span>{t('status.save_failed')}</span>
            </div>
          ) : (
            t('action.save')  // 修改为保存图片的文本
          )}
        </button>

        {/* 动态打赏提示 */}
        {showSupportNudge && (
          <div class="bg-amber-50 border border-amber-200 rounded-xl p-4 text-center animate-fadeIn">
            <p class="text-amber-800 text-sm font-medium">
              {showSupportNudge === 'saved' && t('supportNudge.saved')}
              {showSupportNudge === 'listened' && t('supportNudge.listened')}
              {showSupportNudge === 'regen' && t('supportNudge.regen')}
            </p>
          </div>
        )}

        {/* 添加赞助作者组件 */}
        <div class="pt-6 border-t border-gray-100">
          <SupportAuthor />
        </div>
      </div>
    </div>
  );
}