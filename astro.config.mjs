// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
    site: 'https://philippine.villard.pro',
    build: {
        assets: '_assets'
    },
    markdown: {
        shikiConfig: {
            theme: 'nord',
        },
    },
});
