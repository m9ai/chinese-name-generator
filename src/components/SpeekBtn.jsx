import { useTranslation } from 'react-i18next';
import { speakName, isSpeechSupported } from '../utils/speechUtils';

export default function SpeekBtn(params) {
    const { t } = useTranslation();

    return isSpeechSupported() ? (
        <button
            onClick={() => speakName(params.chineseName)}
            class="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors dark:text-white"
            aria-label={t('action.play_pronunciation')}
            style={{backgroundColor: 'rgba(255, 255, 255, 0.6)',borderColor: '#E5E7EB'}}
        >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
            {t('action.listen_pronunciation')}
        </button>
    ) : null;
}