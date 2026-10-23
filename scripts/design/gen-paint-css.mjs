// Réécrit les styles des boutons et des cartes de global.css dans un style « peint » :
// aplat à la brosse décalé d'un trait d'encre à main levée (clin d'œil aux toiles de Luc Villard)
import { readFileSync, writeFileSync } from 'node:fs';

const file = process.argv[2];
const svg = s => `url("data:image/svg+xml,${encodeURIComponent(s.replace(/\s+/g, ' ').trim())}")`;

// aplat de brosse : bords irréguliers et bouts effilochés
const brush = svg(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 80' preserveAspectRatio='none'>
<path d='M10,20 C30,13 60,17 92,12 C130,7 170,13 205,9 C240,6 268,12 287,15 C296,17 299,24 291,28 C298,35 296,44 293,49 C299,56 294,66 280,69 C250,74 220,68 180,72 C140,76 100,70 64,74 C40,76 22,72 12,69 C3,66 2,59 9,55 C1,50 3,41 8,37 C2,31 3,23 10,20 Z M283,26 C290,30 291,33 286,35 Z'/></svg>`);

// contour d'encre à main levée : traits qui se chevauchent aux coins, comme au pastel gras
// m = marge relative (x, y) : les traits débordent un peu aux coins, comme à main levée
const frame = (w, h, mx, my, bow = 1) => {
    const X = t => (w * t).toFixed(1), Y = t => (h * t).toFixed(1);
    const l = mx, r = 1 - mx, t = my, b = 1 - my;
    return svg(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${w} ${h}' preserveAspectRatio='none'>
<path fill='none' stroke='black' stroke-width='1.7' stroke-linecap='round' vector-effect='non-scaling-stroke'
d='M${X(l * .3)},${Y(t * 1.6)} C${X(.3)},${Y(t * (1 - 1.4 * bow))} ${X(.65)},${Y(t * (1 + 1.6 * bow))} ${X(r + mx * .4)},${Y(t)}
M${X(r - mx * .3)},${Y(t * .2)} C${X(r + mx * .3)},${Y(.35)} ${X(r - mx * .4)},${Y(.7)} ${X(r)},${Y(b + my * .5)}
M${X(1 - mx * .2)},${Y(b - my * .4)} C${X(.7)},${Y(b + my * 1.2 * bow)} ${X(.35)},${Y(b - my * 1.6 * bow)} ${X(l * .2)},${Y(b)}
M${X(l * 1.4)},${Y(1 - my * .2)} C${X(l * .4)},${Y(.7)} ${X(l * 1.6)},${Y(.35)} ${X(l)},${Y(t * .4)}'/></svg>`);
};

// tache ronde irrégulière (fond des pictogrammes)
const blob = svg(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='none'>
<path d='M52,6 C70,5 88,16 93,34 C98,52 95,70 82,84 C70,96 50,97 34,92 C17,86 6,72 5,54 C4,36 12,20 27,11 C35,7 44,6 52,6 Z M90,20 C94,22 95,26 92,27 Z'/></svg>`);

// trait de pinceau horizontal fin (soulignés : menu actif, titres de section)
const stroke = svg(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 20' preserveAspectRatio='none'>
<path d='M3,11 C30,7 70,9 110,7 C140,6 170,7 196,8 C199,9 199,12 195,12.5 C165,14 130,13 95,14.5 C60,16 30,15 6,15 C1,15 0,12 3,11 Z'/></svg>`);

// fêlure kintsugi : ligne brisée avec une petite ramification
const crack = svg(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 160 16' preserveAspectRatio='none'>
<path fill='none' stroke='black' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round' vector-effect='non-scaling-stroke'
d='M2,8 L18,6.5 L31,9.5 L47,7 L60,8.5 L74,5.5 L90,9 L104,7.5 L118,10 L133,7 L158,8 M74,5.5 L82,2 L90,1.5 M104,7.5 L111,12 L120,14'/></svg>`);

const css = `/* Boutons peints : aplat à la brosse décalé d'un trait d'encre libre */
:root {
    --kintsugi-crack: ${crack};
    --paint-blob: ${blob};
    --paint-stroke: ${stroke};
    --paint-brush: ${brush};
    --ink-frame: ${frame(300, 80, .025, .1)};
    --ink-frame-card: ${frame(400, 300, .006, .006, .35)};
}

.button {
    position: relative;
    isolation: isolate;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-2);
    padding: var(--space-3) var(--space-8);
    border: 0;
    border-radius: 0;
    background: none;
    font-size: var(--text-sm);
    font-weight: 700;
    letter-spacing: 0.03em;
    line-height: 1.2;
    color: var(--color-text);
    text-decoration: none;
    cursor: pointer;
    transition: color var(--transition-base);
    --button-paint: transparent;
}

/* l'aplat de couleur */
.button::before,
.button::after {
    content: '';
    position: absolute;
    z-index: -1;
    pointer-events: none;
    transition: transform var(--transition-slow), background-color var(--transition-base);
}

.button::before {
    inset: -3px -8px;
    background-color: var(--button-paint);
    -webkit-mask: var(--paint-brush) center / 100% 100% no-repeat;
    mask: var(--paint-brush) center / 100% 100% no-repeat;
    transform: translate(4px, 3px) rotate(-0.6deg);
}

/* le trait d'encre */
.button::after {
    inset: 0;
    background-color: var(--color-ink);
    -webkit-mask: var(--ink-frame) center / 100% 100% no-repeat;
    mask: var(--ink-frame) center / 100% 100% no-repeat;
}

.button:hover::before,
.button:focus-visible::before {
    transform: translate(0, 0) rotate(0deg);
}

.button:hover::after,
.button:focus-visible::after {
    transform: rotate(0.5deg);
}

.button--primary {
    --button-paint: var(--color-primary);
    color: var(--color-neutral-900) !important;
}

.button--primary:hover {
    --button-paint: var(--color-primary-dark);
}

[data-theme="dark"] .button--primary {
    color: var(--color-background) !important;
}

[data-theme="dark"] .button--primary:hover {
    --button-paint: var(--color-primary-light);
}

.button--secondary {
    --button-paint: color-mix(in srgb, var(--color-sage) 30%, transparent);
}

.button--secondary:hover {
    --button-paint: color-mix(in srgb, var(--color-petal) 55%, transparent);
}

/* Étiquettes : un coup de surligneur au pinceau plutôt qu'une pastille arrondie.
   :not(#_) donne à la règle le poids d'un identifiant, pour passer devant les styles des pages */
:is(.tag-pill, .badge-tag, .status-tag, .service-status-pill, .lang-level, .cv-quality):not(#_) {
    position: relative;
    isolation: isolate;
    background: none;
    border: 0;
    border-radius: 0;
    box-shadow: none;
    padding: 2px 8px;
    color: var(--color-text);
    font-weight: 600;
    --tag-paint: color-mix(in srgb, var(--color-sage) 50%, transparent);
}

:is(.tag-pill, .badge-tag, .status-tag, .service-status-pill, .lang-level, .cv-quality):not(#_)::before {
    content: '';
    position: absolute;
    inset: 22% -2px 0;
    z-index: -1;
    background-color: var(--tag-paint);
    -webkit-mask: var(--paint-stroke) center / 100% 100% no-repeat;
    mask: var(--paint-stroke) center / 100% 100% no-repeat;
}

.status-tag--project:not(#_) {
    --tag-paint: color-mix(in srgb, var(--color-petal) 60%, transparent);
}

/* Titres de section soulignés d'une fêlure d'or (kintsugi) */
.section-title::after {
    content: '';
    display: block;
    width: 9rem;
    height: 0.9rem;
    margin: var(--space-3) auto 0;
    background: linear-gradient(90deg, color-mix(in srgb, var(--color-amber) 70%, var(--color-ink)), var(--color-amber) 45%, color-mix(in srgb, var(--color-amber) 45%, #fff6d8) 60%, color-mix(in srgb, var(--color-amber) 70%, var(--color-ink)));
    -webkit-mask: var(--kintsugi-crack) center / 100% 100% no-repeat;
    mask: var(--kintsugi-crack) center / 100% 100% no-repeat;
}

/* Apparition douce des cartes au défilement (navigateurs compatibles uniquement) */
@supports (animation-timeline: view()) {
    @media (prefers-reduced-motion: no-preference) {
        .bento-card,
        .section-title {
            animation: rise-in linear both;
            animation-timeline: view();
            animation-range: entry 0% entry 40%;
        }
    }
}

@keyframes rise-in {
    from { opacity: 0; transform: translateY(24px); }
}

/* Cartes : papier plat, cadre tracé à main levée */
.bento-card {
    background: var(--color-background-card);
    border: 0;
    border-radius: 3px;
    padding: var(--space-8);
    position: relative;
    box-shadow: none;
    transition: transform var(--transition-base), background-color var(--transition-base);
}

.bento-card::before {
    content: '';
    position: absolute;
    inset: -2px;
    background-color: color-mix(in srgb, var(--color-ink) 45%, transparent);
    -webkit-mask: var(--ink-frame-card) center / 100% 100% no-repeat;
    mask: var(--ink-frame-card) center / 100% 100% no-repeat;
    pointer-events: none;
    transition: background-color var(--transition-base);
}

.bento-card:hover {
    transform: translateY(-2px);
    background: var(--color-background-card-hover);
}

.bento-card:hover::before {
    background-color: color-mix(in srgb, var(--color-ink) 85%, transparent);
}

`;

let src = readFileSync(file, 'utf-8');
const start = src.indexOf('/* Boutons peints');
const end = src.indexOf('/* Section helper */');
if (start < 0 || end < 0) throw new Error('repères introuvables');
src = src.slice(0, start) + css + src.slice(end);

// titres en dégradé : couleur unie
src = src.replace(/\/\* Gradient text utility \*\/[\s\S]*?(?=\.button|\/\* Boutons peints)/, `/* Ancien texte en dégradé : couleur unie */
.gradient-text {
    color: var(--color-primary);
    font-weight: inherit;
}

.gradient-text-subtle {
    color: var(--color-text);
}

`);
writeFileSync(file, src);
console.log('ok');
