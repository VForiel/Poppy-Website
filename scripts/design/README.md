# Formes dessinées du site

Les tracés « à la main » du site sont générés par ces scripts, puis intégrés tels quels (aucune dépendance à l'exécution).

| Script | Produit | Usage |
| :--- | :--- | :--- |
| `gen-paint-css.mjs` | Masques SVG (coup de brosse, tache, trait, cadre à l'encre, fêlure d'or) et styles des boutons, étiquettes et cartes, entre `/* Boutons peints` et `/* Section helper */` dans `global.css` | `node scripts/design/gen-paint-css.mjs src/styles/global.css` |
| `gen-branch.mjs` | Branche de prunier du fond (`ZenBackground.astro`) | `node scripts/design/gen-branch.mjs` puis coller le symbole et le groupe dans le SVG |
| `gen-hero.mjs` | Ensō et fêlure kintsugi de l'accueil (`HomeHero.astro`) | `node scripts/design/gen-hero.mjs` puis reporter `enso`, `ensoCenter` et `crack` |
