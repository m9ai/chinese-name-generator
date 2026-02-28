// 安装
// npm install dom-to-image

import domtoimage from 'dom-to-image';

const downloadNameCard = () => {
  const element = document.getElementById('name-card');
  if (!element) return;

  domtoimage.toPng(element, {
    quality: 1.0, // 图片质量
    bgcolor: 'transparent', // 背景色
    useCORS: true // 允许跨域图片
  })
  .then(dataUrl => {
    const link = document.createElement('a');
    link.download = `${params.username || 'name-card'}.png`;
    link.href = dataUrl;
    link.click();
  })
  .catch(error => {
    console.error('截图失败:', error);
  });
};