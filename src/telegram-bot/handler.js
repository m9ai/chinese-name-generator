import { TELEGRAM_BOT_TOKEN, COMMANDS, MESSAGES } from './config.js';
import { generateChineseName, generatePinyin } from '../utils/nameGenerator.js';

// 模拟生成函数（实际应与Web版共享逻辑）
export function processNameCommand(args) {
  if (args.length < 1) {
    return MESSAGES.invalid_format;
  }

  const name = args[0];
  const gender = args[1] || 'unknown';
  const birthday = args[2] || new Date().toISOString().split('T')[0];

  try {
    // 模拟生成过程
    const formData = { name, gender, birthday };
    
    // 这里应该调用与Web版相同的生成逻辑
    const popularName = generateChineseName(formData, 100);
    const fashionableName = generateChineseName(formData, 200);
    const traditionalName = generateChineseName(formData, 300);

    const result = `🎯 推荐中文名：\n\n${popularName.fullName}\n发音：${generatePinyin(popularName.fullName)}\n含义：${popularName.meaning}\n\n其他选择：\n• ${fashionableName.fullName} (${generatePinyin(fashionableName.fullName)})\n• ${traditionalName.fullName} (${generatePinyin(traditionalName.fullName)})\n\n访问网站获取更多选项：https://chinese-name.m9ai.work`;

    return result;
  } catch (error) {
    console.error('Telegram Bot error:', error);
    return MESSAGES.error;
  }
}

// 命令处理器
export function handleCommand(command, args) {
  switch (command) {
    case '/start':
      return MESSAGES.welcome;
    case '/help':
      return COMMANDS['/help'];
    case '/name':
      return processNameCommand(args);
    default:
      return `未知命令：${command}\n请输入 /help 获取帮助`;
  }
}