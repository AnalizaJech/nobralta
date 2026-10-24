"""Build compact static PDF fonts from the storefront's licensed font sources."""
from pathlib import Path
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools import subset
root = Path(__file__).resolve().parents[1] / 'public' / 'fonts'
for source, output, weight in [('Manrope[wght].ttf','pdf-Manrope-Regular.ttf',400),('Manrope[wght].ttf','pdf-Manrope-Semibold.ttf',600),('InstrumentSerif-Regular.ttf','pdf-InstrumentSerif.ttf',None)]:
    font = TTFont(root / source)
    if weight is not None:
        font = instantiateVariableFont(font, {'wght': weight}, inplace=True)
    options = subset.Options()
    options.name_IDs = ['*']
    sub = subset.Subsetter(options=options)
    sub.populate(unicodes=list(range(0x20,0x250))+list(range(0x2000,0x2070))+[0x20ac])
    sub.subset(font)
    font.save(root / output)
    print(output, (root / output).stat().st_size)
