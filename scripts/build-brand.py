from pathlib import Path
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.boundsPen import BoundsPen
import json
f=TTFont('public/fonts/CinzelDecorative-Bold.ttf');gs=f.getGlyphSet();cmap=f.getBestCmap();paths=[];x=0;bounds=[];n='';nwidth=0
for char in 'NOBRALTA':
 name=cmap[ord(char)];p=SVGPathPen(gs);gs[name].draw(p);d=p.getCommands();bp=BoundsPen(gs);gs[name].draw(bp);bounds.append(bp.bounds)
 if char=='N':n=d;nwidth=gs[name].width
 paths.append(f'<path d="{d}" transform="translate({x} 0)"/>');x+=gs[name].width+30
lo=min(b[1] for b in bounds);hi=max(b[3] for b in bounds);h=hi-lo
body=''.join(paths)
Path('public/assets/brand-wordmark.svg').write_text(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {x-30} {h}"><g transform="translate(0 {hi}) scale(1 -1)" fill="#202420">{body}</g></svg>',encoding='utf-8')
Path('public/assets/brand-n.svg').write_text(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {nwidth} {h}"><g transform="translate(0 {hi}) scale(1 -1)" fill="#202420"><path d="{n}"/></g></svg>',encoding='utf-8')
Path('docs/brand-master.json').write_text(json.dumps({'font':'Cinzel Decorative Bold OFL','tracking':30,'nPathShared':True,'style':'vintage engraved serif lettering, same master for full name and N'}),encoding='utf-8')
for file in ['brand-wordmark.svg','brand-n.svg']:
 data=json.loads(Path('src/media-sizes.json').read_text(encoding='utf-8'));data['/assets/'+file]=[x-30,h] if file.startswith('brand-word') else [nwidth,h];Path('src/media-sizes.json').write_text(json.dumps(data),encoding='utf-8')
