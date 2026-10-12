import { chromium } from 'playwright-core';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function runBenchmark(url, isMobile = false) {
    const browser = await chromium.launch({
        executablePath: CHROME_PATH,
        headless: true,
        args: ['--enable-gpu-rasterization', '--enable-zero-copy']
    });

    const context = await browser.newContext({
        viewport: isMobile ? { width: 390, height: 844 } : { width: 1280, height: 800 },
        isMobile,
        hasTouch: isMobile,
    });

    const page = await context.newPage();

    // 1. Measure Loading & Resources
    let transferBytes = 0;
    const resources = [];
    page.on('response', async (res) => {
        try {
            const buffer = await res.body();
            transferBytes += buffer.length;
            resources.push({
                url: res.url(),
                size: buffer.length,
                status: res.status(),
                type: res.request().resourceType()
            });
        } catch (_) {}
    });

    const startTime = performance.now();
    await page.goto(url, { waitUntil: 'networkidle' });
    const loadTime = performance.now() - startTime;

    // Core Web Vitals from Performance API
    const metrics = await page.evaluate(() => {
        const nav = performance.getEntriesByType('navigation')[0];
        const paint = performance.getEntriesByType('paint');
        const fcp = paint.find((p) => p.name === 'first-contentful-paint')?.startTime || 0;

        return {
            ttfb: nav ? nav.responseStart - nav.requestStart : 0,
            domContentLoaded: nav ? nav.domContentLoadedEventEnd - nav.startTime : 0,
            domNodes: document.querySelectorAll('*').length,
            fcp: Math.round(fcp),
        };
    });

    // 2. Measure Scroll Performance (FPS, Frame Drop, Jank)
    const scrollStats = await page.evaluate(async () => {
        return new Promise((resolve) => {
            const frameTimes = [];
            let lastFrame = performance.now();
            let scrolling = true;

            const onFrame = (now) => {
                const delta = now - lastFrame;
                lastFrame = now;
                frameTimes.push(delta);
                if (scrolling) {
                    requestAnimationFrame(onFrame);
                }
            };
            requestAnimationFrame(onFrame);

            // Smooth scroll down and up
            const totalScroll = document.body.scrollHeight - window.innerHeight;
            const duration = 1500; // ms
            const startScroll = performance.now();

            const interval = setInterval(() => {
                const elapsed = performance.now() - startScroll;
                const progress = Math.min(elapsed / duration, 1);
                // easeInOutQuad
                const ease = progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2;
                window.scrollTo(0, ease * totalScroll);

                if (progress >= 1) {
                    clearInterval(interval);
                    // Now scroll back up
                    const startUp = performance.now();
                    const intervalUp = setInterval(() => {
                        const elapsedUp = performance.now() - startUp;
                        const progressUp = Math.min(elapsedUp / duration, 1);
                        const easeUp = progressUp < 0.5 ? 2 * progressUp * progressUp : 1 - Math.pow(-2 * progressUp + 2, 2) / 2;
                        window.scrollTo(0, (1 - easeUp) * totalScroll);

                        if (progressUp >= 1) {
                            clearInterval(intervalUp);
                            scrolling = false;
                            setTimeout(() => {
                                // Analyze frames
                                const cleanDeltas = frameTimes.slice(2); // drop first warmup
                                const avgDelta = cleanDeltas.reduce((a, b) => a + b, 0) / cleanDeltas.length;
                                const avgFps = 1000 / avgDelta;
                                const longFrames = cleanDeltas.filter((d) => d > 20).length; // > 20ms (> 50fps drop)
                                const droppedFrames = cleanDeltas.filter((d) => d > 33.3).length; // > 33.3ms (< 30fps drop)
                                const maxDelta = Math.max(...cleanDeltas);

                                resolve({
                                    avgFps: Math.round(avgFps * 10) / 10,
                                    totalFrames: cleanDeltas.length,
                                    longFrames,
                                    droppedFrames,
                                    maxFrameMs: Math.round(maxDelta * 10) / 10
                                });
                            }, 100);
                        }
                    }, 16);
                }
            }, 16);
        });
    });

    // 3. Measure Interaction Latencies
    let interactionStats = {};

    if (isMobile) {
        // Test Mobile Menu Toggle latency
        const menuBtn = await page.$('#mobileMenuBtn');
        if (menuBtn) {
            const t0 = performance.now();
            await menuBtn.click();
            await page.waitForSelector('#mobileMenu.open');
            const menuOpenLatency = performance.now() - t0;

            const t1 = performance.now();
            await menuBtn.click();
            await page.waitForFunction(() => !document.getElementById('mobileMenu').classList.contains('open'));
            const menuCloseLatency = performance.now() - t1;

            interactionStats.menuOpenLatencyMs = Math.round(menuOpenLatency);
            interactionStats.menuCloseLatencyMs = Math.round(menuCloseLatency);
        }
    } else {
        // Test Theme Toggle latency
        const themeBtn = await page.$('.theme-toggle');
        if (themeBtn) {
            const t0 = performance.now();
            await themeBtn.click();
            await page.waitForFunction(() => document.documentElement.getAttribute('data-theme') === 'dark');
            const themeToggleLatency = performance.now() - t0;
            interactionStats.themeToggleLatencyMs = Math.round(themeToggleLatency);
            // Toggle back
            await themeBtn.click();
        }

        // Test Lightbox open/close latency
        const profilePic = await page.$('#profilePicture');
        if (profilePic) {
            const t0 = performance.now();
            await profilePic.click();
            await page.waitForSelector('#lightbox.active');
            const lightboxOpenLatency = performance.now() - t0;

            const closeBtn = await page.$('#lightboxClose');
            const t1 = performance.now();
            if (closeBtn) await closeBtn.click();
            await page.waitForFunction(() => !document.getElementById('lightbox').classList.contains('active'));
            const lightboxCloseLatency = performance.now() - t1;

            interactionStats.lightboxOpenLatencyMs = Math.round(lightboxOpenLatency);
            interactionStats.lightboxCloseLatencyMs = Math.round(lightboxCloseLatency);
        }
    }

    await browser.close();

    return {
        isMobile,
        loadTimeMs: Math.round(loadTime),
        transferBytes: Math.round(transferBytes / 1024),
        metrics,
        scrollStats,
        interactionStats,
    };
}

async function main() {
    const baseUrl = process.argv[2] || 'http://localhost:4322';
    console.log(`=== BENCHMARKING POPPY WEBSITE (${baseUrl}) ===\n`);

    console.log('Testing Desktop Viewport (1280x800)...');
    const desktop = await runBenchmark(`${baseUrl}/fr`, false);
    console.log('Desktop Results:');
    console.log(`- Page Load Time: ${desktop.loadTimeMs}ms`);
    console.log(`- First Contentful Paint: ${desktop.metrics.fcp}ms`);
    console.log(`- TTFB: ${Math.round(desktop.metrics.ttfb)}ms`);
    console.log(`- DOM Nodes: ${desktop.metrics.domNodes}`);
    console.log(`- Total Transferred: ${desktop.transferBytes} KB`);
    console.log(`- Scroll Average FPS: ${desktop.scrollStats.avgFps} FPS (${desktop.scrollStats.totalFrames} frames measured)`);
    console.log(`- Scroll Stutter (>20ms): ${desktop.scrollStats.longFrames} frames, Dropped (>33ms): ${desktop.scrollStats.droppedFrames} frames`);
    console.log(`- Max Frame Time: ${desktop.scrollStats.maxFrameMs}ms`);
    console.log(`- Theme Toggle Latency: ${desktop.interactionStats.themeToggleLatencyMs}ms`);
    console.log(`- Lightbox Open / Close: ${desktop.interactionStats.lightboxOpenLatencyMs}ms / ${desktop.interactionStats.lightboxCloseLatencyMs}ms\n`);

    console.log('Testing Mobile Viewport (390x844)...');
    const mobile = await runBenchmark(`${baseUrl}/fr`, true);
    console.log('Mobile Results:');
    console.log(`- Page Load Time: ${mobile.loadTimeMs}ms`);
    console.log(`- First Contentful Paint: ${mobile.metrics.fcp}ms`);
    console.log(`- Scroll Average FPS: ${mobile.scrollStats.avgFps} FPS`);
    console.log(`- Scroll Stutter (>20ms): ${mobile.scrollStats.longFrames} frames, Dropped (>33ms): ${mobile.scrollStats.droppedFrames} frames`);
    console.log(`- Max Frame Time: ${mobile.scrollStats.maxFrameMs}ms`);
    console.log(`- Mobile Menu Open / Close Latency: ${mobile.interactionStats.menuOpenLatencyMs}ms / ${mobile.interactionStats.menuCloseLatencyMs}ms`);
}

main().catch(console.error);
