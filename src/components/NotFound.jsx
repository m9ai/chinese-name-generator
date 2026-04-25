import { useTranslation } from 'react-i18next';

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <div class="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <div class="text-8xl font-bold text-gray-200 mb-4">404</div>
      <h1 class="text-2xl font-bold text-gray-800 mb-2">
        {t('notFound.title') || 'Page Not Found'}
      </h1>
      <p class="text-gray-500 mb-6 max-w-md">
        {t('notFound.description') || 'The page you are looking for does not exist. Let us help you find your perfect Chinese name instead!'}
      </p>
      <a
        href="/"
        class="inline-block px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all"
      >
        {t('notFound.backHome') || 'Back to Name Generator'}
      </a>
    </div>
  );
}
