import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

// Ruta de origen (Plantilla en Inglés)
const htmlPath = path.join(root, 'cv-en.html');
// Ruta de destino (Tu nuevo PDF en Inglés)
const pdfPath = path.join(root, 'CV_Juan_Carlos_Zumaya_EN.pdf');

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();

await page.goto(`file:///${htmlPath.replace(/\\/g, '/')}`, {
  waitUntil: 'networkidle0',
});

await page.pdf({
  path: pdfPath,
  format: 'A4',
  printBackground: true,
  margin: { top: '0', right: '0', bottom: '0', left: '0' },
});

await browser.close();
console.log(`¡PDF en Inglés generado con éxito!: ${pdfPath}`);