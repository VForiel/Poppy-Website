import type { Locale } from './config';

export const strings: Record<Locale, {
    nav: {
        home: string;
        about: string;
        expertise: string;
        portfolio: string;
        cv: string;
        contact: string;
    };
    headerTagline: string;
    fullName: string;
    hero: {
        title1: string;
        title2: string;
        badge: string;
        description: string;
        ctaProjects: string;
        ctaContact: string;
    };
    banner: {
        badge: string;
        title: string;
        description: string;
        cta: string;
    };
    footer: {
        affiliations: string;
        rights: string;
        advocacy: string;
    };
}> = {
    fr: {
        fullName: "Philippine Villard",
        headerTagline: "Doctorante en psychologie",
        nav: {
            home: "Accueil",
            about: "À propos",
            expertise: "Expertise",
            portfolio: "Travaux & Recherche",
            cv: "CV",
            contact: "Contact",
        },
        hero: {
            badge: "Hôpital Lenval (CE2P) • Soutenance 2027 • Comparaison TCC & EMDR (3-6 ans)",
            title1: "Doctorante en Psychologie",
            title2: "Psychotraumatisme chez les 3 à 6 ans",
            description: "Psychologue clinicienne et chercheuse à l'Hôpital Lenval (Nice). Ma thèse compare l'efficacité des approches TCC et EMDR dans la prise en charge du psychotraumatisme chez l'enfant de 3 à 6 ans, tout en œuvrant pour la reconnaissance précoce des indicateurs formels auprès du soin et de la justice.",
            ctaProjects: "Découvrir mes travaux",
            ctaContact: "Prendre contact",
        },
        banner: {
            badge: "Recherche & Enseignement",
            title: "Recherche de Post-Doctorat & Missions de Formation",
            description: "En 4ᵉ année de doctorat à l'Hôpital Lenval (soutenance mi-2027), je suis à l'écoute d'opportunités de post-doctorat et disponible pour dispenser des formations spécialisées (psychotrauma des 3-6 ans, TCC & EMDR) pour soignants, éducateurs et magistrats.",
            cta: "Prendre contact",
        },
        footer: {
            affiliations: "Hôpital pour Enfants Lenval (Nice) • Service CE2P • Université Côte d'Azur",
            rights: "Tous droits réservés.",
            advocacy: "Pour une reconnaissance rigoureuse de la parole et des signaux cliniques des jeunes enfants.",
        },
    },
    en: {
        fullName: "Philippine Villard",
        headerTagline: "Doctorante en psychologie",
        nav: {
            home: "Home",
            about: "About",
            expertise: "Expertise",
            portfolio: "Research & Work",
            cv: "CV",
            contact: "Contact",
        },
        hero: {
            badge: "Lenval Children's Hospital (CE2P) • PhD Defense 2027 • CBT vs EMDR (Ages 3-6)",
            title1: "Doctoral Researcher in Psychology",
            title2: "Early Childhood Psychotrauma (3-6 years)",
            description: "Clinical psychologist and doctoral researcher at Lenval Children's Hospital (Nice, France). My doctoral thesis compares the efficacy of CBT and EMDR in treating trauma among 3-to-6-year-old children, advocating for early recognition of non-verbal clinical markers in healthcare and judicial systems.",
            ctaProjects: "Explore my work",
            ctaContact: "Get in touch",
        },
        banner: {
            badge: "Research & Training",
            title: "Post-Doctoral Opportunities & Professional Training",
            description: "In the 4th year of doctoral research at Lenval Hospital (defense planned for mid-2027), I am actively seeking post-doctoral appointments and available to deliver specialized professional training (early trauma, CBT & EMDR in young children).",
            cta: "Get in touch",
        },
        footer: {
            affiliations: "Lenval Children's Hospital (Nice) • CE2P Department • Université Côte d'Azur",
            rights: "All rights reserved.",
            advocacy: "Advocating for the formal recognition of preverbal trauma indicators in early childhood.",
        },
    },
};
