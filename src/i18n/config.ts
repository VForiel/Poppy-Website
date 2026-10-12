export type Locale = 'fr' | 'en';

export const SUPPORTED_LOCALES: Locale[] = ['fr', 'en'];
export const DEFAULT_LOCALE: Locale = 'fr';

export function detectLocaleFromPath(pathname: string): Locale {
    const base = import.meta.env.BASE_URL.replace(/\/$/, '');
    let pathWithoutLocale = pathname;

    if (base) {
        pathWithoutLocale = pathWithoutLocale.replace(new RegExp(`^${base}`), '');
    }

    if (pathWithoutLocale.startsWith('/fr') || pathWithoutLocale === 'fr') return 'fr';
    if (pathWithoutLocale.startsWith('/en') || pathWithoutLocale === 'en') return 'en';
    return 'fr';
}

export function withLocalePrefix(href: string, locale: Locale): string {
    const base = import.meta.env.BASE_URL.replace(/\/$/, '');
    const prefix = `${base}/${locale}`;

    if (href === '/') {
        return prefix;
    }

    const cleanHref = href.replace(/^\/(fr|en)/, '') || '/';
    return cleanHref === '/' ? prefix : `${prefix}${cleanHref}`;
}

export function toggleLocaleHref(currentPath: string, currentLocale: Locale): string {
    const targetLocale = currentLocale === 'fr' ? 'en' : 'fr';
    const base = import.meta.env.BASE_URL.replace(/\/$/, '');

    let pathWithoutLocale = currentPath;
    if (base) {
        pathWithoutLocale = pathWithoutLocale.replace(new RegExp(`^${base}`), '');
    }
    pathWithoutLocale = pathWithoutLocale.replace(/^\/(fr|en)/, '') || '/';

    const newPath = pathWithoutLocale === '/' ? `/${targetLocale}` : `/${targetLocale}${pathWithoutLocale}`;
    return `${base}${newPath}`;
}
