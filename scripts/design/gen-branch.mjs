// Génère le SVG statique de la branche de prunier (trait de pinceau effilé + fleurs)
const f = q => q[0].toFixed(1) + ',' + q[1].toFixed(1);
const bez = (p, u) => { const v = 1 - u; return [0, 1].map(k => v*v*v*p[0][k] + 3*v*v*u*p[1][k] + 3*v*u*u*p[2][k] + u*u*u*p[3][k]); };
const dbez = (p, u) => { const v = 1 - u; return [0, 1].map(k => 3*v*v*(p[1][k]-p[0][k]) + 6*v*u*(p[2][k]-p[1][k]) + 3*u*u*(p[3][k]-p[2][k])); };
const at = (segs, s) => { const n = segs.length, i = Math.min(n - 1, Math.floor(s * n)), u = s * n - i; return { p: bez(segs[i], u), d: dbez(segs[i], u) }; };
function taperD(segs, w0, w1, seed) {
    const N = 26 * segs.length, L = [], R = [];
    for (let i = 0; i <= N; i++) {
        const s = i / N, { p, d } = at(segs, s);
        const len = Math.hypot(d[0], d[1]) || 1, nx = -d[1] / len, ny = d[0] / len;
        const wob = 1 + .14 * Math.sin(s * 19 + seed) + .07 * Math.sin(s * 47 + seed * 2);
        const h = Math.max(.35, (w0 + (w1 - w0) * Math.pow(s, .75)) * wob / 2);
        L.push([p[0] + nx * h, p[1] + ny * h]); R.push([p[0] - nx * h, p[1] - ny * h]);
    }
    return 'M' + L.map(f).join('L') + 'L' + R.reverse().map(f).join('L') + 'Z';
}
const main = [[[650, -30], [560, 30], [480, 60], [400, 80]], [[400, 80], [320, 100], [250, 130], [175, 188]]];
const wood = [taperD(main, 16, 2.5, 1)];
const flowers = [], buds = [];
const twigs = [
    { t: .3, pts: [[-10, 40], [-30, 70], [-62, 96]] },
    { t: .45, pts: [[15, 45], [10, 85], [30, 122]] },
    { t: .58, pts: [[-20, -25], [-50, -35], [-92, -38]] },
    { t: .76, pts: [[10, 35], [0, 70], [-26, 100]] },
];
twigs.forEach((tw, i) => {
    const o = at(main, tw.t).p, seg = [o, ...tw.pts.map(q => [o[0] + q[0], o[1] + q[1]])];
    wood.push(taperD([seg], 6, 1.4, 10 + i));
    flowers.push([...seg[3], 1.5, i * 40]);
    const mid = bez(seg, .55);
    flowers.push([mid[0] + (i % 2 ? 8 : -8), mid[1], 1.05, i * 25 + 10]);
});
[.2, .38, .52, .66, .86].forEach((s, i) => {
    const { p, d } = at(main, s), len = Math.hypot(d[0], d[1]), off = 9 * (i % 2 ? 1 : -1);
    const x = p[0] - d[1] / len * off, y = p[1] + d[0] / len * off;
    if (i % 2) flowers.push([x, y, 1.25, i * 33]); else buds.push([x, y]);
});
const out = [
    ...wood.map(d => `<path class="zen-wood" d="${d}"/>`),
    ...flowers.map(([x, y, s, r]) => `<use href="#zen-blossom" transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${r}) scale(${s})"/>`),
    ...buds.map(([x, y]) => `<circle class="zen-bud" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="4"/>`),
];
// fleur : sépales, 5 pétales, étamines
const b = [];
for (let k = 0; k < 5; k++) { const a = (k * 72 - 54) * Math.PI / 180; b.push(`<circle class="zen-sepal" cx="${(Math.cos(a) * 8.4).toFixed(2)}" cy="${(Math.sin(a) * 8.4).toFixed(2)}" r="2.6"/>`); }
for (let k = 0; k < 5; k++) { const a = (k * 72 - 90) * Math.PI / 180; b.push(`<circle class="zen-petal" cx="${(Math.cos(a) * 6.6).toFixed(2)}" cy="${(Math.sin(a) * 6.6).toFixed(2)}" r="6.2"/>`); }
const st = [];
for (let k = 0; k < 10; k++) { const a = k * 36 * Math.PI / 180; st.push(`M0,0L${(Math.cos(a) * 6.4).toFixed(2)},${(Math.sin(a) * 6.4).toFixed(2)}`); }
b.push(`<path class="zen-stamen" d="${st.join('')}"/>`);
for (let k = 0; k < 10; k++) { const a = k * 36 * Math.PI / 180; b.push(`<circle class="zen-anther" cx="${(Math.cos(a) * 6.4).toFixed(2)}" cy="${(Math.sin(a) * 6.4).toFixed(2)}" r=".9"/>`); }
b.push('<circle class="zen-anther" r="1.8"/>');
console.log('<symbol id="zen-blossom" overflow="visible">' + b.join('') + '</symbol>');
console.log('<g class="zen-sway">' + out.join('') + '</g>');
