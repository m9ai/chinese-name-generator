import { useTranslation } from 'react-i18next';
import { useState, useEffect, useCallback } from 'react';

export default function Header() {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const subtitles = t('app.subTitleArray', { returnObjects: true });

  // 优化的动画控制逻辑
  const triggerTransition = useCallback(() => {
    if (subtitles.length <= 1) return;

    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(nextIndex);
      setNextIndex(prev => (prev + 1) % subtitles.length);
      setIsTransitioning(false);
    }, 600); // 与淡出动画时长匹配
  }, [subtitles.length, nextIndex]);

  // 调整时序：4秒显示，0.8秒过渡
  useEffect(() => {
    const interval = setInterval(triggerTransition, 4000);
    return () => clearInterval(interval);
  }, [triggerTransition]);

  return (
    <div class="text-center pb-12"
      style={{backgroundImage: 'url(/zodiac/default.png)', backgroundSize: '175px', backgroundRepeat: 'no-repeat', backgroundPosition: 'right bottom'}}
    >
      <h1 class="text-[clamp(2.5rem,8vw,4rem)] font-bold mb-3 leading-tight tracking-tighter bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
        {t('app.mainTitle')}
      </h1>
      {/* 用户统计数字 */}
      <div class="mb-2 text-sm text-gray-500">
        <span class="font-medium text-blue-600">✨ {t('stats.users_count')}</span> {t('stats.users_unit')}
      </div>
      {/* 添加Home链接 */}
      <div class="mb-4">
        <a href="/" className="text-blue-600 hover:text-blue-800 hover:underline transition-colors cursor-pointer">
          🏠 {t('header.home')}
        </a>
      </div>
      <p class="text-[clamp(1rem,3vw,1.25rem)] text-gray-600 max-w-lg mx-auto mb-6 h-10 relative">
        {/* 当前显示的标语 */}
        <span
          class={`absolute inset-0 transition-opacity ${isTransitioning ? 'subtitle-exit' : 'opacity-100'}`}
          style={{ zIndex: isTransitioning ? 1 : 2 }}
        >
          {subtitles[currentIndex]}
        </span>
        {/* 过渡中的标语 */}
        <span
          class={`absolute inset-0 opacity-0 ${isTransitioning ? 'subtitle-enter' : ''}`}
          style={{ zIndex: isTransitioning ? 2 : 1 }}
        >
          {subtitles[nextIndex]}
        </span>
      </p>
      <div class="w-24 h-1 bg-blue-500 mx-auto rounded-full opacity-70"></div>
    </div>
  );
}