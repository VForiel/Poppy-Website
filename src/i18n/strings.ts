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
        headerTagline: "Doctorante en Psychologie • Psychotrauma 3-6 ans",
        nav: {
            home: "Accueil",
            about: "À propos",
            expertise: "Expertise",
            portfolio: "Travaux & Recherche",
            cv: "CV",
            contact: "Contact",
        },
        hero: {
            badge: "Hôpital Lenval (CE2P) • Thèse en cours • Cabinet libéral à venir",
            title1: "Doctorante en Psychologie",
            title2: "Psychotraumatisme chez les 3 à 6 ans",
            description: "Psychologue clinicienne et chercheuse dédiée à l'évaluation, la prise en charge et la reconnaissance précoce du psychotrauma chez les tout-petits (3-6 ans). Défense de marqueurs cliniques fiables auprès des professionnels et de la justice.",
            ctaProjects: "Découvrir mes travaux",
            ctaContact: "Prendre contact",
        },
        banner: {
            badge: "Perspectives & Opportunités",
            title: "Projets de Cabinet Libéral & Recherche de Post-Doc",
            description: "Actuellement en 4ᵉ année de doctorat à l'Hôpital Lenval (soutenance 2027), je prépare l'ouverture de mon cabinet libéral et reste à l'écoute d'opportunités de post-doctorat et de missions de formation.",
            cta: "Me contacter",
        },
        footer: {
            affiliations: "Hôpital pour Enfants Lenval (Nice) • Service CE2P • Université Côte d'Azur",
            rights: "Tous droits réservés.",
            advocacy: "Pour une reconnaissance rigoureuse de la parole et des signaux cliniques des jeunes enfants.",
        },
    },
    en: {
        fullName: "Philippine Villard",
        headerTagline: "PhD Candidate in Psychology • Psychotrauma (Ages 3-6)",
        nav: {
            home: "Home",
            about: "About",
            expertise: "Expertise",
            portfolio: "Research & Work",
            cv: "CV",
            contact: "Contact",
        },
        hero: {
            badge: "Lenval Children's Hospital (CE2P) • Ongoing PhD • Future Private Practice",
            title1: "PhD Candidate in Psychology",
            title2: "Early Childhood Psychotrauma (3-6 years)",
            description: "Clinical psychologist and doctoral researcher dedicated to the early evaluation, therapeutic care, and institutional recognition of psychological trauma in young children (ages 3 to 6). Advocating for rigorous pre-verbal clinical indicators in judicial and clinical settings.",
            ctaProjects: "Explore my work",
            ctaContact: "Get in touch",
        },
        banner: {
            badge: "Opportunities & Outlook",
            title: "Private Practice Project & Post-Doc Seeking",
            description: "Currently a 4th-year PhD candidate at Lenval Hospital (defense planned for 2027), preparing the launch of my private clinical practice and open to post-doctoral research opportunities and training missions.",
            cta: "Contact me",
        },
        footer: {
            affiliations: "Lenval Children's Hospital (Nice) • CE2P Department • Université Côte d'Azur",
            rights: "All rights reserved.",
            advocacy: "Advocating for the formal recognition of preverbal trauma indicators in early childhood.",
        },
    },
};
