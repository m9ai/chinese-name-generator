import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function SupportAuthor() {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState('0.99');
  const [selectedMethod, setSelectedMethod] = useState(null);

  // 支付链接/二维码配置（请替换为实际链接）
  const paymentConfig = {
    'paypal': 'https://paypal.me/m9ai',
    'alipay': '/payment-qrcodes/alipay.png',
    'wechat': '/payment-qrcodes/wechat.png'
  };

  return (
    <div className="text-center">
      {/* 触发按钮 */}
      <button 
        onClick={() => setShowModal(true)}
        className="px-6 py-3 bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
      >
        ☕ Support the Author
      </button>

      {/* 赞助模态框 */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full mx-auto overflow-hidden">
            {/* 关闭按钮 */}
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>

            {/* 模态框内容 */}
            <div className="p-8 pt-12">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">{t('supportAuthor.title')}</h3>

              {/* 金额选择 */}
              <div className="mb-8">
                <p className="text-gray-600 mb-4">{t('supportAuthor.chooseAmount')}</p>
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={() => setSelectedAmount('0.99')}
                    className={`px-6 py-3 rounded-full transition-all dark:text-white ${selectedAmount === '0.99' ? 'bg-blue-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                  >
                    $0.99+ (I like it)
                  </button>
                  <button
                    onClick={() => setSelectedAmount('0.1')}
                    className={`px-6 py-3 rounded-full transition-all dark:text-white ${selectedAmount === '0.1' ? 'bg-yellow-500' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                  >
                    $0.10+ (Not bad)
                  </button>
                </div>
              </div>

              {/* 支付方式选择 */}
              {!selectedMethod ? (
                <div>
                  <p className="text-gray-600 mb-4">{t('supportAuthor.paymentMethod')}</p>
                  <div className="grid grid-cols-3 gap-4">
                    <button
                      onClick={() => setSelectedMethod('paypal')}
                      className="flex flex-col items-center p-4 border rounded-xl hover:border-blue-500 transition-colors"
                    >
                      <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-2">
                        <span className="text-amber-600 font-bold text-xl">☕️</span>
                      </div>
                      <span className="text-sm dark:text-white">{t('supportAuthor.paypal')}</span>
                    </button>

                    <button
                      onClick={() => setSelectedMethod('alipay')}
                      className="flex flex-col items-center p-4 border rounded-xl hover:border-blue-500 transition-colors"
                    >
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                        <span className="text-blue-600 font-bold text-xl">🥤</span>
                      </div>
                      <span className="text-sm dark:text-white">{t('supportAuthor.alipay')}</span>
                    </button>

                    <button
                      onClick={() => setSelectedMethod('wechat')}
                      className="flex flex-col items-center p-4 border rounded-xl hover:border-blue-500 transition-colors"
                    >
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-2">
                        <span className="text-green-600 font-bold text-xl">🍺</span>
                      </div>
                      <span className="text-sm dark:text-white">{t('supportAuthor.wechat')}</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  {selectedMethod === 'paypal' ? (
                    <div className="py-6">
                      <p className="text-gray-600 mb-6">You're supporting with ${selectedAmount}</p>
                      <a 
                        href={paymentConfig['paypal']}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-8 py-3 bg-amber-500 text-white rounded-full hover:bg-amber-600 transition-colors"
                      >
                        <span className="dark:text-white">{t('supportAuthor.completePayment')}</span>
                      </a>
                    </div>
                  ) : (
                    <div className="py-4">
                      <p className="text-gray-600 mb-6">{t('supportAuthor.scanQrCode', { amount: selectedAmount })}</p>
                      <div className="bg-white p-4 inline-block rounded-lg shadow-md">
                        <img 
                          src={paymentConfig[selectedMethod]} 
                          alt={`${selectedMethod} QR Code`}
                          className="w-48 h-48 object-contain"
                        />
                      </div>
                    </div>
                  )}

                  <button
                    onClick={() => setSelectedMethod(null)}
                    className="mt-6 text-blue-500 hover:text-blue-700 dark:text-white"
                  >
                    {t('supportAuthor.backToMethods')}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}