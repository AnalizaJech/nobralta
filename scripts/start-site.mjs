import { createServer } from 'vite';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { execFile } from 'node:child_process';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const url = 'http://127.0.0.1:4173/';
const noOpen = process.argv.includes('--no-open');
function openBrowser() {
  if (noOpen) return;
  execFile('cmd.exe', ['/d', '/s', '/c', `start "" "${url}"`], { windowsHide: true }, error => {
    if (error) console.log(`Abre esta direccion en tu navegador: ${url}`);
  });
}
async function main() {
  let response;
  try {
    response = await fetch(url, { signal: AbortSignal.timeout(1500) });
  } catch { /* No listener: start the local server below. */ }
  if (response) {
    const html = await response.text();
    if (!response.ok || !/<title>NOBRALTA\b/i.test(html)) {
      throw new Error('El puerto 4173 esta ocupado por otro servicio. Cierra ese servicio y vuelve a iniciar el sitio.');
    }
    console.log(`NOBRALTA ya esta funcionando: ${url}`);
    openBrowser();
    return;
  }
  console.log('Iniciando NOBRALTA...');
  const server = await createServer({ root, configFile: resolve(root, 'vite.config.mjs'), server: { host: '127.0.0.1', port: 4173, strictPort: true } });
  await server.listen();
  console.log(`\nSitio listo: ${url}`);
  console.log('Deja esta ventana abierta mientras uses el sitio. Para detenerlo, pulsa Ctrl+C.\n');
  openBrowser();
}
main().catch(error => {
  console.error(`\nError: ${error.message}`);
  process.exitCode = 1;
});
