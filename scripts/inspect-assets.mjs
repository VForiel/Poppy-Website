import { chromium } from 'playwright-core';

const browser = await chromium.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true
});

const page = await browser.newPage();
const list = [];
page.on('response', async (res) => {
    try {
        const b = await res.body();
        list.push({ url: res.url(), sizeKb: Math.round(b.length / 1024), type: res.request().resourceType() });
    } catch (_) {}
});

const targetUrl = process.argv[2] || 'http://localhost:4322/fr';
await page.goto(targetUrl, { waitUntil: 'networkidle' });
list.sort((a, b) => b.sizeKb - a.sizeKb);
console.log('Top heavy resources:');
list.forEach(r => console.log(`${r.sizeKb} KB | ${r.type} | ${r.url.split('?')[0]}`));
await browser.close();
