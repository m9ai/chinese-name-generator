import { useTranslation } from 'react-i18next';
import { zodiacMeanings } from '../utils/zodiac';
import { getZodiacBackground } from '../utils/zodiac';

export default function ZodiacCard({ zodiac }) {
    const { t } = useTranslation();
    return (
        <div class="bg-white p-5 px-2 rounded-xl shadow-sm border border-gray-100 transform transition-all hover:shadow-md hover:-translate-y-0.5 duration-200"
            style={{ backgroundImage: `url(${getZodiacBackground(zodiac)})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'right bottom' }}
        >
            <h3 class="text-xl font-bold text-gray-800 mb-2">{zodiac.toUpperCase()}<sup className='text-sm text-gray-400'>{t('zodiac.cardTxt')}</sup></h3>
            <p class="text-sm text-gray-600">{zodiacMeanings[zodiac].meaning}</p>
        </div>
    );
}