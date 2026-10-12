import { chromium } from 'playwright-core';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const pages = ['/fr', '/fr/about', '/fr/expertise', '/fr/portfolio', '/fr/cv', '/fr/contact'];

const browser = await chromium.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--enable-gpu-rasterization', '--enable-zero-copy']
});

console.log('=== MULTI-PAGE AUDIT (http://localhost:4322) ===\n');

for (const path of pages) {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
    let bytes = 0;
    page.on('response', async (res) => {
        try {
            const b = await res.body();
            bytes += b.length;
        } catch (_) {}
    });

    const t0 = performance.now();
    await page.goto(`http://localhost:4322${path}`, { waitUntil: 'networkidle' });
    const loadTime = Math.round(performance.now() - t0);

    const scrollStats = await page.evaluate(async () => {
        return new Promise((resolve) => {
            const frameTimes = [];
            let last = performance.now();
            let scrolling = true;

            const onF = (now) => {
                frameTimes.push(now - last);
                last = now;
                if (scrolling) requestAnimationFrame(onF);
            };
            requestAnimationFrame(onF);

            const total = document.body.scrollHeight - window.innerHeight;
            const start = performance.now();
            const timer = setInterval(() => {
                const el = performance.now() - start;
                const p = Math.min(el / 1000, 1);
                window.scrollTo(0, p * total);
                if (p >= 1) {
                    clearInterval(timer);
                    scrolling = false;
                    setTimeout(() => {
                        const clean = frameTimes.slice(2);
                        const avg = 1000 / (clean.reduce((a, b) => a + b, 0) / clean.length);
                        const dropped = clean.filter((d) => d > 33.3).length;
                        resolve({ fps: Math.round(avg * 10) / 10, dropped, maxMs: Math.round(Math.max(...clean) * 10) / 10 });
                    }, 50);
                }
            }, 16);
        });
    });

    console.log(`Page: ${path}`);
    console.log(`- Load Time: ${loadTime}ms | Transferred: ${Math.round(bytes / 1024)} KB`);
    console.log(`- Scroll FPS: ${scrollStats.fps} FPS | Dropped: ${scrollStats.dropped} | Max frame: ${scrollStats.maxMs}ms\n`);

    await page.close();
}

await browser.close();
