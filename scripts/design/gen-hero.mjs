// Génère le tracé de l'ensō (trait de pinceau effilé) et la fêlure kintsugi du hero
const f = q => q[0].toFixed(1) + ',' + q[1].toFixed(1);
const N = 120, start = 125 * Math.PI / 180, sweep = 318 * Math.PI / 180;
const pt = (a, r) => [100 + Math.cos(a) * r, 100 + Math.sin(a) * r];
const radius = a => 88 * (1 + .015 * Math.sin(a * 3 + 1) + .006 * Math.sin(a * 7));
const L = [], R = [], C = [];
for (let i = 0; i <= N; i++) {
    const t = i / N, a = start + sweep * t, r = radius(a);
    let w = t < .07 ? 7 + (t / .07) * 4 : 1 + 10 * Math.pow(1 - (t - .07) / .93, .6);
    w *= 1 + .07 * Math.sin(t * 31);
    L.push(pt(a, r + w / 2)); R.push(pt(a, r - w / 2)); C.push(pt(a, r));
}
const enso = 'M' + L.map(f).join('L') + 'L' + R.reverse().map(f).join('L') + 'Z';
const ensoCenter = 'M' + C.map(f).join('L');
let len = 0;
for (let i = 1; i < C.length; i++) len += Math.hypot(C[i][0] - C[i - 1][0], C[i][1] - C[i - 1][1]);

// fêlure d'or : ligne brisée principale et deux petites ramifications
let seed = 11;
const rand = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
const main = [[2, 12]];
for (let x = 22; x <= 380; x += 18 + rand() * 16) main.push([x, 12 + (rand() - .5) * 9]);
main.push([398, 11]);
const branch = (i, dx, dy) => { const o = main[i]; return [o, [o[0] + dx * .5, o[1] + dy * .6], [o[0] + dx, o[1] + dy]]; };
const crack = ['M' + main.map(f).join('L'), 'M' + branch(4, 16, -9).map(f).join('L'), 'M' + branch(11, 20, 8).map(f).join('L')];
console.log(JSON.stringify({ enso, ensoCenter, ensoLen: Math.ceil(len), crack }, null, 1));
