const fs = require('fs');
const path = require('path');

// 从文本文件导入名字数据（需提前准备800个名字的txt文件）
function importNamesFromTxt(gender) {
  const filePath = path.join(__dirname, `${gender}Names.txt`);
  const names = fs.readFileSync(filePath, 'utf-8').split('\n').filter(Boolean);
  return `export default [\n  '${names.join(