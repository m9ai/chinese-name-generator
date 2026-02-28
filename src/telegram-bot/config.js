// Telegram Bot 配置
export const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || 'YOUR_TELEGRAM_BOT_TOKEN_HERE';
export const TELEGRAM_WEBHOOK_URL = process.env.TELEGRAM_WEBHOOK_URL || 'https://chinese-name.m9ai.work/api/telegram';

// 命令映射
export const COMMANDS = {
  '/start': '欢迎使用中文名生成器！请输入您的英文名，例如：/name Taylor Swift',
  '/help': '使用方法：\n/name [英文名] [性别] [生日]\n例如：/name Taylor Swift male 1990-07-13',
  '/name': '生成中文名'
};

// 消息模板
export const MESSAGES = {
  welcome: '✨ 欢迎使用中文名生成器！\n\n我可以为您生成个性化的中文名字，基于您的英文名、性别和生日。\n\n请发送：/name 您的英文名 性别 生日\n例如：/name Taylor Swift female 1990-07-13',
  processing: '正在为您生成中文名，请稍候...',
  success: '🎉 您的中文名已生成：\n\n%s\n\n发音：%s\n\n含义：%s\n\n想了解更多？访问 https://chinese-name.m9ai.work',
  error: '❌ 生成失败，请检查输入格式是否正确',
  invalid_format: '❌ 输入格式不正确，请使用：/name 英文名 性别 生日'
};