import express from 'express';
import bodyParser from 'body-parser';
import { TELEGRAM_BOT_TOKEN, TELEGRAM_WEBHOOK_URL } from './config.js';
import { handleCommand } from './handler.js';

const app = express();
app.use(bodyParser.json());

// Telegram Bot Webhook endpoint
app.post(`/bot${TELEGRAM_BOT_TOKEN}`, (req, res) => {
  const update = req.body;
  
  if (update.message && update.message.text) {
    const chatId = update.message.chat.id;
    const text = update.message.text.trim();
    
    // 解析命令
    const parts = text.split(' ');
    const command = parts[0];
    const args = parts.slice(1);
    
    let responseText = '';
    
    if (command.startsWith('/')) {
      responseText = handleCommand(command, args);
    } else {
      responseText = '请输入 /help 获取使用帮助';
    }

    // 发送响应
    fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: responseText,
        parse_mode: 'Markdown'
      })
    }).catch(console.error);
  }
  
  res.status(200).send('OK');
});

// 设置Webhook
async function setupWebhook() {
  try {
    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/setWebhook`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        url: TELEGRAM_WEBHOOK_URL
      })
    });
    const result = await response.json();
    console.log('Webhook设置结果:', result);
  } catch (error) {
    console.error('设置Webhook失败:', error);
  }
}

// 启动服务器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Telegram Bot服务运行在端口 ${PORT}`);
  
  // 自动设置Webhook（生产环境需要手动设置）
  if (process.env.NODE_ENV === 'production') {
    setupWebhook();
  }
});

export default app;