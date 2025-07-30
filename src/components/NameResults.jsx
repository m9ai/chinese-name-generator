import { useTranslation } from 'react-i18next';
// 导入语音工具函数
import { speakName, isSpeechSupported } from '../utils/speechUtils';
// 导入赞助作者组件
import SupportAuthor from '../components/SupportAuthor';

export default function NameResults({ names, onSave, saveStatus, userName, zodiac }) {
  const { t } = useTranslation();

  // 删除组件内部的speakName定义
  if (!names) return null;

  const navigateToNamePage = (nameData) => {
    const params = new URLSearchParams({
      username: userName,
      chineseName: nameData.name,
      zodiac: zodiac
    });
    window.location.href = `/name?${params.toString()}`;
  };

  return (
    <div class="bg-gradient-to-b from-gray-50 to-white p-6 sm:p-8 border-t border-gray-100 animate-fadeIn">
      <h2 id="results-title" class="text-xl font-bold text-gray-800 mb-2 text-center">{t('results.title')}</h2>
      <p class="text-sm text-gray-500 text-center mb-6">{t('results.save_instruction')}</p>

      <div class="space-y-6">
        {/* Name Cards */}
        {Object.entries(names).map(([type, nameData], index) => (
          <div key={index} class="relative bg-white p-5 rounded-xl shadow-sm border border-gray-100 transform transition-all hover:shadow-md hover:-translate-y-0.5 duration-200">
            <h3 class="text-sm font-medium text-gray-500 mb-1 capitalize">{t(`results.${type}`)}</h3>
            <p class="text-3xl font-bold text-gray-900 mb-1 tracking-tighter">{nameData.name}</p>
            <p class="text-lg text-blue-600 font-medium mb-3">{nameData.pinyin}</p>

            {/* 添加语音播放按钮 */}
            {/* 条件渲染语音按钮 */}
            {isSpeechSupported() && (
              <button
                onClick={() => speakName(nameData.name)}
                class="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
                aria-label={t('action.play_pronunciation')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                {t('action.listen_pronunciation')}
              </button>
            )}
            <button
              onClick={() => navigateToNamePage(nameData)}
              class="absolute right-0 top-0 px-3 py-1 text-blue-600 text-sm rounded-lg hover:text-blue-600 transition-colors border-none outline-none"
            >
              {t('action.select')}
            </button>
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

        {/* 添加赞助作者组件 */}
        <div class="pt-6 border-t border-gray-100">
          <SupportAuthor />
        </div>
      </div>
    </div>
  );
}