// Generate local PDF icons from the same Phosphor shapes used in the interface.
import {renderToStaticMarkup} from 'react-dom/server';
import {writeFileSync,copyFileSync} from 'node:fs';
for(const name of ['UserCircle','MapPin','Receipt','Truck','FilePdf','IdentificationCard','Phone','Envelope']){
 const {default:weights}=await import('../node_modules/@phosphor-icons/react/dist/defs/'+name+'.es.js');
 writeFileSync('public/icons/pdf-'+name+'.svg','<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="#622938">'+renderToStaticMarkup(weights.get('regular'))+'</svg>');
}
copyFileSync('node_modules/@phosphor-icons/react/LICENSE','public/icons/PHOSPHOR-LICENSE.txt');
