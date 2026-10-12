# Site Web Professionnel & Académique — Philippine Villard

Site web personnel, académique et clinique de **Philippine Villard**, doctorante en psychologie clinique à l'Hôpital Lenval (service CE2P, Nice), spécialisée dans le psychotraumatisme précoce chez les enfants de 3 à 6 ans.

Déployé automatiquement sur GitHub Pages : [https://vforiel.github.io/Poppy-Website/](https://vforiel.github.io/Poppy-Website/)

---

## 🌟 Présentation du Projet

Inspiré de l'architecture et des technologies du site personnel de Vincent Foriel, ce site a été conçu sur mesure pour Philippine Villard avec une identité visuelle clinique, chaleureuse et bienveillante, intégrant les patterns visuels d'**Aceternity UI** :

- **Bento Grid** : Organisation modulaire en cartes lumineuses, bordures irisées et hiérarchies claires.
- **Fond Interactif Synaptique** : Canvas 60fps modélisant des synapses et connexions neuronales bienveillantes (adieu aux étoiles cosmiques et chiffres binaires, place aux neurosciences et à la psychologie du développement), sans aucun easter egg.
- **Bilingue Intégral (FR / EN)** : Commutateur de langue fluide avec préservation de la route courante (`/fr/*` et `/en/*`).
- **Thème Clair / Sombre (Light & Dark)** : Thème sombre clinique immersif (`hsl(224, 28%, 9%)`) et thème clair apaisant (`hsl(40, 30%, 98%)`), persistant via `localStorage`.
- **Bannière d'Opportunité (Aceternity style)** : Modal et pastille d'information en temps réel sur la recherche de post-doctorat, l'ouverture du cabinet libéral à Nice (2027) et les missions de formation.
- **Typographie Soignée** : Combinaison moderne des polices `Plus Jakarta Sans` et `Outfit`.
- **Portrait Professionnel Dédié** : Portrait avatar studio généré à partir de la photo fournie (retrait de Vincent) et version naturelle conservée.

---

## 🧭 Structure des Pages

| Page | URL FR | URL EN | Description |
| :--- | :--- | :--- | :--- |
| **Accueil** | `/fr/` | `/en/` | Hero section, Bento grid des piliers cliniques, actualités de recherche et aperçu des expertises. |
| **À Propos** | `/fr/about` | `/en/about` | Parcours académique (Versailles 1996, CPGE Lycée Masséna, Thèse Lenval CE2P), plaidoyer pour les 3-6 ans et valeurs cliniques. |
| **Expertise & Cabinet** | `/fr/expertise` | `/en/expertise` | Évaluation clinique, projet d'installation en libéral (Nice 2027), formations professionnelles et recherche. |
| **Travaux & Recherche** | `/fr/portfolio` | `/en/portfolio` | Thèse doctorale, cartographie des indicateurs formels, actions auprès de la justice et chronologie interactive avec filtrage par tags. |
| **Détail des Travaux** | `/fr/projects/[slug]` | `/en/projects/[slug]` | Fiches détaillées des projets de recherche avec contenu Markdown et métadonnées. |
| **CV** | `/fr/cv` | `/en/cv` | Curriculum Vitae complet et imprimable (formation, expérience hospitalière, outils d'évaluation, compétences et langues). |
| **Contact** | `/fr/contact` | `/en/contact` | Coordonnées directes (`philippine.villard@hotmail.com`), localisation à Nice et raccourcis d'objets de courriel. |

---

## 🛠️ Stack Technique

- **Framework** : [Astro 5](https://astro.build/) (génération statique SSG hyper-performante, sans surcharge JS inutile).
- **Style** : Vanilla CSS modulaire avec design tokens, glassmorphism, et composants inspirés d'Aceternity UI.
- **Gestion de contenu** : Astro Content Collections (`src/content/projects/`, `src/content/services/`) avec validation de schéma TypeScript (`zod`).
- **Déploiement** : GitHub Actions (`.github/workflows/deploy.yml`) automatisé vers GitHub Pages sur la branche `main`.

---

## 🚀 Développement Local & Déploiement

### Prérequis
- [Node.js](https://nodejs.org/) (v18+)

### Commandes
```bash
# Installation des dépendances
npm install

# Démarrage du serveur de développement
npm run dev

# Construction statique du site
npm run build

# Prévisualisation de la version de production
npm run preview
```

### Déploiement GitHub Pages
Tout push sur la branche `main` déclenche automatiquement le workflow GitHub Actions qui installe les dépendances, construit le site et le publie sur GitHub Pages.