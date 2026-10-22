// @ts-check
import { defineConfig } from 'astro/config';
import { createHash } from 'node:crypto';
import { readdirSync, readFileSync } from 'node:fs';

// Astro n'ajoute pas à la CSP les scripts `is:inline` (recopiés tels quels dans les pages) :
// on calcule leurs empreintes à partir des sources.
function inlineScriptHashes() {
    const hashes = new Set();
    for (const file of readdirSync('src', { recursive: true })) {
        if (!String(file).endsWith('.astro')) continue;
        // Les sources peuvent être en CRLF (Windows), les pages générées sont en LF
        const source = readFileSync(`src/${file}`, 'utf-8').replace(/\r\n/g, '\n');
        for (const [, body] of source.matchAll(/<script is:inline>([\s\S]*?)<\/script>/g)) {
            hashes.add(`sha256-${createHash('sha256').update(body).digest('base64')}`);
        }
    }
    return [...hashes];
}

// https://astro.build/config
export default defineConfig({
    site: 'https://philippine.villard.pro',
    build: {
        assets: '_assets'
    },
    // Content Security Policy en balise <meta> (GitHub Pages ne permet pas d'en-têtes) :
    // Astro y ajoute l'empreinte de chaque script et style inline. Aucune ressource tierce.
    security: {
        csp: {
            directives: [
                "default-src 'self'",
                "img-src 'self' data:",
                "font-src 'self' data:",
                "connect-src 'self'",
                "object-src 'none'",
                "base-uri 'self'",
                "form-action 'self'",
            ],
            scriptDirective: {
                resources: ["'self'"],
                hashes: inlineScriptHashes(),
            },
            styleDirective: {
                resources: ["'self'"],
            },
        },
    },
    markdown: {
        shikiConfig: {
            theme: 'nord',
        },
    },
});
