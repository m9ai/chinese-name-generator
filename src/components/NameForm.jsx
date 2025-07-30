import { useTranslation } from 'react-i18next';
// 添加状态和验证工具导入
import { useState } from 'preact/hooks';
import { validateUsername } from '../utils/validationUtils';

export default function NameForm({ formData, onInputChange, onGenerate, isGenerating }) {
  const { t } = useTranslation();
  const [usernameError, setUsernameError] = useState('');

  // 添加用户名验证处理
  const handleGenerateClick = () => {
    // 清除之前的错误
    setUsernameError('');

    // 验证用户名
    const { isValid } = validateUsername(formData.name);
    if (!isValid) {
      setUsernameError(t('usernameValidation.prohibitedWord'));
      return;
    }

    // 验证通过，调用生成函数
    onGenerate();
  };

  return (
    <div class="p-6 sm:p-8">
      <form class="space-y-6">
        {/* Name Input */}
        <div class="space-y-2">
          <label class="block text-sm font-medium text-gray-700" htmlFor="name">{t('form.name')}</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={onInputChange}
            class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            placeholder="Your English name"
            required
          />
          {/* 添加用户名错误提示 */}
          {usernameError && (
            <p class="text-orange-600 text-sm mt-1">⚠️ {usernameError}</p>
          )}
        </div>

        {/* Gender Selector */}
        <div class="space-y-2">
          <label class="block text-sm font-medium text-gray-700">{t('form.gender')}</label>
          <div class="grid grid-cols-2 gap-4">
            <label class="relative flex items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition-all hover:bg-gray-50">
              <input
                type="radio"
                name="gender"
                value="male"
                checked={formData.gender === 'male'}
                onChange={onInputChange}
                class="sr-only peer"
                required
              />
              <span class="w-5 h-5 border-2 border-gray-300 peer-checked:border-blue-500 rounded-full absolute left-4 transition-colors duration-200 peer-checked:bg-blue-500 flex items-center justify-center">
                <span class="w-2 h-2 bg-white rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200"></span>
              </span>
              <span class="text-gray-800 peer-checked:text-blue-600">Male</span>
            </label>
            <label class="relative flex items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition-all hover:bg-gray-50">
              <input
                type="radio"
                name="gender"
                value="female"
                checked={formData.gender === 'female'}
                onChange={onInputChange}
                class="sr-only peer"
                required
              />
              <span class="w-5 h-5 border-2 border-gray-300 peer-checked:border-blue-500 rounded-full absolute left-4 transition-colors duration-200 peer-checked:bg-blue-500 flex items-center justify-center">
                <span class="w-2 h-2 bg-white rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200"></span>
              </span>
              <span class="text-gray-800 peer-checked:text-blue-600">Female</span>
            </label>
          </div>
        </div>

        {/* Birthday Input */}
        <div class="space-y-2">
          <label class="block text-sm font-medium text-gray-700" htmlFor="birthday">{t('form.birthday')}</label>
          <input
            type="date"
            id="birthday"
            name="birthday"
            value={formData.birthday}
            onChange={onInputChange}
            class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="button"
          onClick={handleGenerateClick}
          disabled={!formData.name || !formData.gender || !formData.birthday || isGenerating || usernameError}
          class="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium py-3 px-4 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isGenerating ? (
            <div class="flex items-center justify-center space-x-2">
              <div class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Generating...</span>
            </div>
          ) : (
            t('form.generate')
          )}
        </button>
      </form>
    </div>
  );
}

const onGenerate = () => {
  // 确保导航URL包含gender参数
  router.push({
    path: '/name',
    query: {
      username: formData.name,
      chineseName: generatedName.fullName,
      zodiac: calculatedZodiac,
      gender: formData.gender // 添加性别参数
    }
  });
};