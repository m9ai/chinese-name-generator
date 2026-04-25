import { useTranslation } from 'react-i18next';
import { getWuxingAnalysis, getWuxingNameSuggestion, wuxingData } from '../utils/wuxing';

export default function WuxingCard({ birthday }) {
  const { t } = useTranslation();
  if (!birthday) return null;

  const analysis = getWuxingAnalysis(birthday);
  const suggestion = getWuxingNameSuggestion(analysis.missingElements);

  const elementColors = {
    wood: 'bg-green-100 text-green-800 border-green-200',
    fire: 'bg-red-100 text-red-800 border-red-200',
    earth: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    metal: 'bg-gray-100 text-gray-800 border-gray-200',
    water: 'bg-blue-100 text-blue-800 border-blue-200'
  };

  const elementDots = {
    wood: '🌿',
    fire: '🔥',
    earth: '🏔️',
    metal: '⚪',
    water: '💧'
  };

  return (
    <div class="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
      <h3 class="text-sm font-medium text-gray-500 mb-3">{t('wuxing.title')}</h3>

      {/* 年柱 */}
      <div class="flex items-center gap-3 mb-4">
        <div class="text-2xl font-bold text-gray-900">{analysis.yearPillar}</div>
        <div class="text-xs text-gray-400">{t('wuxing.yearPillar')}</div>
      </div>

      {/* 五行元素 */}
      <div class="grid grid-cols-2 gap-3 mb-4">
        <div class={`p-3 rounded-lg border ${elementColors[analysis.elements.gan.element]}`}>
          <div class="text-xs opacity-70">{t('wuxing.heavenlyStem')}</div>
          <div class="font-semibold">{analysis.elements.gan.name} {analysis.elements.gan.chinese}</div>
          <div class="text-xs">{analysis.elements.gan.name} — {analysis.elements.gan.traits}</div>
        </div>
        <div class={`p-3 rounded-lg border ${elementColors[analysis.elements.zhi.element]}`}>
          <div class="text-xs opacity-70">{t('wuxing.earthlyBranch')}</div>
          <div class="font-semibold">{analysis.elements.zhi.name} {analysis.elements.zhi.chinese}</div>
          <div class="text-xs">{analysis.elements.zhi.name} — {analysis.elements.zhi.traits}</div>
        </div>
      </div>

      {/* 缺失元素提示 */}
      {analysis.missingElements.length > 0 && (
        <div class="bg-indigo-50 border border-indigo-100 rounded-lg p-3 mb-3">
          <p class="text-indigo-800 text-sm font-medium mb-1">
            {t('wuxing.missing')}: {analysis.missingElements.map(e => `${wuxingData[e].chinese} (${wuxingData[e].name})`).join(', ')}
          </p>
          {suggestion.suggestedChars && (
            <p class="text-indigo-600 text-xs">
              {t('wuxing.suggestion')}: {suggestion.suggestedChars.slice(0, 6).join('、')}
            </p>
          )}
        </div>
      )}

      {/* 五行平衡条 */}
      <div class="space-y-2">
        {Object.entries(analysis.counts).map(([element, count]) => (
          <div key={element} class="flex items-center gap-2">
            <span class="text-sm w-16">{elementDots[element]} {wuxingData[element].name}</span>
            <div class="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                class={`h-full rounded-full ${count > 0 ? 'bg-current opacity-60' : 'bg-gray-200'}`}
                style={{
                  width: count > 0 ? '100%' : '100%',
                  color: element === 'wood' ? '#16a34a' : element === 'fire' ? '#dc2626' : element === 'earth' ? '#ca8a04' : element === 'metal' ? '#6b7280' : '#2563eb'
                }}
              />
            </div>
            <span class="text-xs text-gray-400 w-8 text-right">{count > 0 ? '✓' : '—'}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
