// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
    site: 'https://vforiel.github.io',
    base: '/Poppy-Website',
    build: {
        assets: '_assets'
    },
    markdown: {
        shikiConfig: {
            theme: 'nord',
        },
    },
});
