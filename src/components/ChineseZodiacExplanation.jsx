import { useTranslation } from 'react-i18next';
import { getZodiacBackground } from '../utils/zodiac';
import { zodiacs, zodiacMeanings } from '../utils/zodiac';
import { generatePinyin } from '../utils/nameGenerator';

export default function ChineseZodiacExplanation() {
  const { t } = useTranslation();

  return (
    <div className="mt-8 bg-white rounded-2xl shadow-lg overflow-hidden mb-6 p-6 sm:p-8 transition-all duration-300 hover:shadow-xl">
      <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">{t('zodiac.title')}</h2>
      <p className="text-gray-500 mb-6 text-left max-w-md mx-auto">
        {t('zodiac.explanation', {Shengxiao: generatePinyin('生效')})}
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
        {zodiacs.map((zodiac, index) => (
          <div
            key={zodiac}
            className="flex flex-col items-center p-3 rounded-lg border border-gray-100 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
          >
            <div
              className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center mb-2"
              style={{
                backgroundImage: `url(${getZodiacBackground(zodiac)})`,
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            ></div>
            <h3 className="font-medium text-gray-900 mb-1">{t(`zodiac.${zodiac}`)}</h3>
            <p className="text-xs text-gray-500 text-center line-clamp-2" title={zodiacMeanings[zodiac]?.meaning}>
              {zodiacMeanings[zodiac]?.meaning}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 text-center">
        <a className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center justify-center gap-1 mx-auto"
          href='https://simple.wikipedia.org/wiki/Chinese_zodiac'
          target='_blank'
        >
          {t('zodiac.learnMore')}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      </div>
    </div>
  );
}