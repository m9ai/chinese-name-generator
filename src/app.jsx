import { useRef, useState, useEffect } from 'preact/hooks';
import Clarity from '@microsoft/clarity';
import { generateChineseName, generateWuxingName, generatePinyin } from './utils/nameGenerator';
import NameForm from './components/NameForm';
import NameResults from './components/NameResults';
import Header from './components/Header';
import Footer from './components/Footer';
import './app.css';
import { getZodiacSign } from './utils/zodiac';
import { generateNameImage, downloadCanvasImage } from './utils/canvasUtils';
import ChineseZodiacExplanation from './components/ChineseZodiacExplanation';
import NamePage from './components/NamePage';
import NotFound from './components/NotFound';
import { useDocumentMeta } from './hooks/useDocumentMeta';

// 保留唯一的导出声明
export default function App() {
  const [formData, setFormData] = useState({ name: '', gender: '', birthday: '' });
  const [zodiac, setZodiac] = useState(''); // 添加生肖状态
  const [generatedNames, setGeneratedNames] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');
  const canvasRef = useRef(null);
  const resultsRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const typeOffsets = { popular: 100, fashionable: 200 };

  const generateNames = async () => {
    setIsGenerating(true);
    try {
      // 生成三种不同类型的名字
      const popularName = generateChineseName(formData, typeOffsets.popular);
      const fashionableName = generateChineseName(formData, typeOffsets.fashionable);
      const luckyName = generateWuxingName(formData);

      setGeneratedNames({
        popular: {
          name: popularName.fullName,
          pinyin: generatePinyin(popularName.fullName),
          meaning: popularName.meaning
        },
        fashionable: {
          name: fashionableName.fullName,
          pinyin: generatePinyin(fashionableName.fullName),
          meaning: fashionableName.meaning
        },
        lucky: {
          name: luckyName.fullName,
          pinyin: generatePinyin(luckyName.fullName),
          meaning: luckyName.meaning,
          wuxingElement: luckyName.wuxingElement
        }
      });
    } catch (error) {
      console.error('Failed to generate names:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const regenerateSingleType = (type) => {
    if (!formData.name || !formData.gender || !formData.birthday) return;
    let newName;
    if (type === 'lucky') {
      newName = generateWuxingName(formData);
    } else {
      const offset = typeOffsets[type] || 100;
      newName = generateChineseName(formData, offset + Math.floor(Math.random() * 50));
    }
    setGeneratedNames(prev => ({
      ...prev,
      [type]: {
        name: newName.fullName,
        pinyin: generatePinyin(newName.fullName),
        meaning: newName.meaning,
        wuxingElement: newName.wuxingElement
      }
    }));
  };

  // 添加结果区域滚动逻辑
  useEffect(() => {
    if (generatedNames) {
      setTimeout(() => {
        const resultsTitle = document.getElementById('results-title');
        if (resultsTitle) {
          resultsTitle.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 500); // 延迟确保DOM已更新
    }
  }, [generatedNames]);

  const handleSave = async () => {
    if (!generatedNames || !formData.birthday || !formData.name) return;

    setSaveStatus('saving');
    try {
      // 传递英文名参数
      const canvas = await generateNameImage(generatedNames, formData.birthday, formData.name);
      const downloadSuccess = downloadCanvasImage(canvas);
      if (downloadSuccess) {
        setSaveStatus('saved');
      } else {
        throw new Error('图片下载失败');
      }
    } catch (error) {
      console.error('生成图片失败:', error);
      setSaveStatus('error');
      setShowToast({ visible: true, message: '保存失败：' + error.message, type: 'error' });
    } finally {
      setTimeout(() => setSaveStatus(''), 2000);
    }
  };
  const [showToast, setShowToast] = useState({ visible: false, message: '', type: '' });

  useEffect(() => {
    if (formData.birthday) {
      setZodiac(getZodiacSign(formData.birthday));
    }
  }, [formData.birthday]);

  useEffect(() => {
    location.hostname !== 'localhost' && Clarity.init('smz8tcd1tm')
  }, [])

  useDocumentMeta(location.pathname);

  return (<>
    {
      showToast.visible && (
        <div className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded ${showToast.type === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white`}>
          {showToast.message}
        </div>
      )
    }
    <div class="min-h-screen min-w-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      {/* 添加隐藏的canvas元素 */}
      <canvas ref={canvasRef} style="display: none;"></canvas>

      <div class="max-w-md mx-auto">
        <Header />
        {location.pathname === '/' && (<>
          <div class="bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
            <NameForm
              formData={formData}
              onInputChange={handleInputChange}
              onGenerate={generateNames}
              isGenerating={isGenerating}
            />
            {generatedNames && (
              <NameResults
                names={generatedNames}
                onSave={handleSave}
                saveStatus={saveStatus}
                ref={resultsRef}
                userName={formData.name}
                zodiac={zodiac}
                onRegenerate={regenerateSingleType}
                birthday={formData.birthday}
              />
            )}
          </div>

        <ChineseZodiacExplanation />
          </>
        )}
        {/* 路由出口 */}
        {location.pathname === '/name' && <NamePage />}
        {location.pathname !== '/' && location.pathname !== '/name' && <NotFound />}
        <Footer />
      </div>
    </div>
  </>
  );
}
