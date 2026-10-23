from PIL import Image
from pathlib import Path
import json,hashlib
items=[]
for p in Path('public/assets').glob('*'):
 d={'file':str(p).replace('\\','/'),'bytes':p.stat().st_size,'sha256':hashlib.sha256(p.read_bytes()).hexdigest()}
 if p.suffix in ['.png','.webp']:
  im=Image.open(p);d['size']=im.size;d['mode']=im.mode;d['alpha']=im.getchannel('A').getextrema() if 'A' in im.getbands() else None
 items.append(d)
Path('docs/assets-manifest.json').write_text(json.dumps(items,ensure_ascii=False,indent=2),encoding='utf-8')
# Some generated cutouts have an almost-opaque alpha maximum of254.
# Require a truly transparent background and a >=98% opaque garment, in both formats.
assert all(x['alpha'] and x['alpha'][0] == 0 and x['alpha'][1] >= 250 for x in items if x['file'].endswith(('.png','.webp')) and 'hero' not in x['file'])
print('Assets:',len(items),'alpha verificado')
