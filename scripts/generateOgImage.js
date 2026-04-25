import { createCanvas } from 'canvas';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const WIDTH = 1200;
const HEIGHT = 630;

const canvas = createCanvas(WIDTH, HEIGHT);
const ctx = canvas.getContext('2d');

// Background gradient
const gradient = ctx.createLinearGradient(0, 0, WIDTH, HEIGHT);
gradient.addColorStop(0, '#4f46e5');
gradient.addColorStop(1, '#7c3aed');
ctx.fillStyle = gradient;
ctx.fillRect(0, 0, WIDTH, HEIGHT);

// Decorative circles
ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
ctx.beginPath();
ctx.arc(100, 100, 200, 0, Math.PI * 2);
ctx.fill();
ctx.beginPath();
ctx.arc(1100, 530, 250, 0, Math.PI * 2);
ctx.fill();

// Title
ctx.fillStyle = '#ffffff';
ctx.font = 'bold 72px sans-serif';
ctx.textAlign = 'center';
ctx.fillText('Chinese Name Generator', WIDTH / 2, 220);

// Subtitle
ctx.font = '36px sans-serif';
ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
ctx.fillText('Get Your Perfect Chinese Name', WIDTH / 2, 300);

// Features
ctx.font = '28px sans-serif';
ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
const features = ['Personalized Names', 'Zodiac Analysis', 'Five Elements (Wu Xing)', 'Pronunciation Guide'];
features.forEach((text, i) => {
  ctx.fillText(text, WIDTH / 2, 380 + i * 50);
});

// URL
ctx.font = '24px sans-serif';
ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
ctx.fillText('chinese-name.m9ai.work', WIDTH / 2, 600);

// Save
const buffer = canvas.toBuffer('image/png');
const outputPath = path.join(__dirname, '..', 'public', 'og-image.png');
fs.writeFileSync(outputPath, buffer);
console.log('OG image generated:', outputPath);
