# -*- coding: utf-8 -*-
"""生成像素风 OG 社交分享图（1200x630）"""
from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 630
img = Image.new("RGB", (W, H), "#8FD3FF")
d = ImageDraw.Draw(img)

# ---- 天空 ----
# 像素云（白色方块簇）
def block_cloud(x, y, s=28):
    d.rectangle([x, y, x + s * 4 - 1, y + s - 1], fill="#ffffff")
    d.rectangle([x + s, y - s, x + s * 3 - 1, y - 1], fill="#ffffff")
    d.rectangle([x + s, y + s, x + s * 3 - 1, y + s * 2 - 1], fill="#ffffff")

block_cloud(180, 120)
block_cloud(680, 80, s=22)

# 太阳：黄方块 + 8 条射线
cx, cy, s = 1040, 110, 64
d.rectangle([cx - s // 2, cy - s // 2, cx + s // 2, cy + s // 2], fill="#FFD84D", outline="#2B1D12", width=6)
rays = [(-110, 0), (110, 0), (0, -110), (0, 110), (-80, -80), (80, -80), (-80, 80), (80, 80)]
for dx, dy in rays:
    d.rectangle([cx + dx - 14, cy + dy - 14, cx + dx + 14, cy + dy + 14], fill="#FFD84D", outline="#2B1D12", width=5)

# ---- 地表 ----
grass_top = 300
# 草方块条（明暗交替）
g1, g2 = "#5DBB3F", "#3E8E2A"
for i in range(30):
    x0 = i * 40
    d.rectangle([x0, grass_top, x0 + 39, grass_top + 39], fill=g1 if i % 2 == 0 else g2, outline="#2B1D12", width=4)
    # 草皮凸起
    d.rectangle([x0 + 8, grass_top - 16, x0 + 15, grass_top - 1], fill=g1 if i % 2 == 0 else g2, outline="#2B1D12", width=3)
    d.rectangle([x0 + 22, grass_top - 24, x0 + 29, grass_top - 1], fill=g1 if i % 2 == 0 else g2, outline="#2B1D12", width=3)

# 沙土区域
d.rectangle([0, grass_top + 40, W, H - 120], fill="#FFF4D6")

# 装饰矿石块
d.rectangle([120, 420, 183, 483], fill="#5DBB3F", outline="#2B1D12", width=5)
d.rectangle([136, 436, 167, 467], fill="#8FD3FF", outline="#2B1D12", width=4)
d.rectangle([980, 400, 1051, 471], fill="#FF6A1A", outline="#2B1D12", width=5)
d.rectangle([1000, 420, 1031, 451], fill="#FFD84D", outline="#2B1D12", width=4)

# ---- 底部土层 ----
d.rectangle([0, H - 120, W, H], fill="#8B5A2B")
for i in range(30):
    x0 = i * 40
    d.rectangle([x0 + (20 if i % 2 else 0), H - 120, x0 + 40 if i % 2 else x0 + 20, H], fill="#6f4822")

# ---- 文字 ----
font_title = ImageFont.truetype(r"C:\Windows\Fonts\msyhbd.ttc", 92)
font_sub = ImageFont.truetype(r"C:\Windows\Fonts\msyh.ttc", 34)

title = "这很泰不好丸啦"
sub = "—— 一个属于自己的像素世界 ——"

# 阴影 + 主文字
d.text((W // 2 - 332 + 8, 330 + 8), title, font=font_title, fill="#2B1D12")
d.text((W // 2 - 332, 330), title, font=font_title, fill="#FF6A1A")

sub_w = d.textlength(sub, font=font_sub)
d.text(((W - sub_w) / 2 + 4, 470 + 4), sub, font=font_sub, fill="#2B1D12")
d.text(((W - sub_w) / 2, 470), sub, font=font_sub, fill="#2B1D12")

img.save(r"D:\AI工作区\deepseek  CTF\my-blog\public\images\og-default.png")
print("og-default.png saved")
