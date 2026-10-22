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
        headerTagline: "Doctorante en psychologie",
        nav: {
            home: "Accueil",
            about: "À propos",
            expertise: "Expertise",
            portfolio: "Travaux & Recherche",
            cv: "CV",
            contact: "Contact",
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
        headerTagline: "Doctorante en psychologie",
        nav: {
            home: "Home",
            about: "About",
            expertise: "Expertise",
            portfolio: "Research & Work",
            cv: "CV",
            contact: "Contact",
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
