from PIL import Image, ImageDraw, ImageFont
import os

WIDTH, HEIGHT = 1200, 630

img = Image.new('RGB', (WIDTH, HEIGHT), color='#4f46e5')
draw = ImageDraw.Draw(img)

# Gradient background (simulated with rectangles)
for y in range(HEIGHT):
    r = int(79 + (124 - 79) * y / HEIGHT)
    g = int(70 + (58 - 70) * y / HEIGHT)
    b = int(229 + (237 - 229) * y / HEIGHT)
    draw.line([(0, y), (WIDTH, y)], fill=(r, g, b))

# Decorative circles
draw.ellipse([-100, -100, 300, 300], fill=(255, 255, 255, 13))
draw.ellipse([900, 380, 1400, 880], fill=(255, 255, 255, 13))

# Try to load a nice font, fallback to default
try:
    title_font = ImageFont.truetype("/System/Library/Fonts/Supplemental/Arial Bold.ttf", 72)
    subtitle_font = ImageFont.truetype("/System/Library/Fonts/Supplemental/Arial.ttf", 36)
    feature_font = ImageFont.truetype("/System/Library/Fonts/Supplemental/Arial.ttf", 28)
    url_font = ImageFont.truetype("/System/Library/Fonts/Supplemental/Arial.ttf", 24)
except:
    title_font = ImageFont.load_default()
    subtitle_font = ImageFont.load_default()
    feature_font = ImageFont.load_default()
    url_font = ImageFont.load_default()

# Title
title = "Chinese Name Generator"
bbox = draw.textbbox((0, 0), title, font=title_font)
title_w = bbox[2] - bbox[0]
draw.text(((WIDTH - title_w) / 2, 180), title, font=title_font, fill=(255, 255, 255))

# Subtitle
subtitle = "Get Your Perfect Chinese Name"
bbox = draw.textbbox((0, 0), subtitle, font=subtitle_font)
sub_w = bbox[2] - bbox[0]
draw.text(((WIDTH - sub_w) / 2, 280), subtitle, font=subtitle_font, fill=(230, 230, 255))

# Features
features = ["Personalized Names", "Zodiac Analysis", "Five Elements (Wu Xing)", "Pronunciation Guide"]
start_y = 360
for i, text in enumerate(features):
    bbox = draw.textbbox((0, 0), text, font=feature_font)
    tw = bbox[2] - bbox[0]
    draw.text(((WIDTH - tw) / 2, start_y + i * 50), text, font=feature_font, fill=(200, 200, 255))

# URL
url = "chinese-name.m9ai.work"
bbox = draw.textbbox((0, 0), url, font=url_font)
uw = bbox[2] - bbox[0]
draw.text(((WIDTH - uw) / 2, 580), url, font=url_font, fill=(170, 170, 230))

# Save
output = os.path.join(os.path.dirname(__file__), '..', 'public', 'og-image.png')
img.save(output)
print(f"OG image saved to: {output}")
