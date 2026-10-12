import io
import base64
from PIL import Image, ImageDraw

src = Image.open('public/profile-picture.jpg').convert('RGBA')

# High resolution master: 512x512
master_size = 512
mask = Image.new('L', (master_size * 2, master_size * 2), 0)
draw = ImageDraw.Draw(mask)
draw.ellipse((2, 2, master_size * 2 - 3, master_size * 2 - 3), fill=255)
mask = mask.resize((master_size, master_size), Image.Resampling.LANCZOS)

thumb = src.resize((master_size, master_size), Image.Resampling.LANCZOS)
circular_master = Image.new('RGBA', (master_size, master_size), (0, 0, 0, 0))
circular_master.paste(thumb, (0, 0), mask=mask)

# Save standard icons
ico_images = []
for s in [16, 32, 48]:
    res = circular_master.resize((s, s), Image.Resampling.LANCZOS)
    res.save(f'public/favicon-{s}x{s}.png')
    ico_images.append(res)

# Save ICO
circular_master.resize((32, 32), Image.Resampling.LANCZOS).save(
    'public/favicon.ico',
    format='ICO',
    sizes=[(16, 16), (32, 32), (48, 48)]
)

# Save Apple Touch Icon (180x180)
apple_icon = circular_master.resize((180, 180), Image.Resampling.LANCZOS)
apple_icon.save('public/apple-touch-icon.png')

# Save SVG favicon with base64 embedded webp
buf = io.BytesIO()
circular_master.resize((256, 256), Image.Resampling.LANCZOS).save(buf, format='WEBP', quality=95)
b64_str = base64.b64encode(buf.getvalue()).decode('utf-8')

svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
  <defs>
    <clipPath id="avatar-clip">
      <circle cx="128" cy="128" r="126" />
    </clipPath>
  </defs>
  <image href="data:image/webp;base64,{b64_str}" x="0" y="0" width="256" height="256" clip-path="url(#avatar-clip)" />
</svg>
'''
with open('public/favicon.svg', 'w', encoding='utf-8') as f:
    f.write(svg_content)

print('All favicon assets generated successfully!')
