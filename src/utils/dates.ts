/**
 * Date utility functions for Poppy-Website
 */

export interface ParsedDate {
    date: Date;
    hasDay: boolean;
    hasMonth: boolean;
}

export function parsePartialDate(
    value: string | Date | undefined,
): ParsedDate | null {
    if (value == null) return null;

    if (value instanceof Date) {
        return { date: value, hasDay: true, hasMonth: true };
    }

    const str = String(value).trim();
    if (!str) return null;

    const parts = str.split("-");
    const year = parseInt(parts[0], 10);
    const month = parts.length >= 2 ? parseInt(parts[1], 10) : 1;
    const day = parts.length >= 3 ? parseInt(parts[2], 10) : 1;

    return {
        date: new Date(year, month - 1, day),
        hasDay: parts.length >= 3,
        hasMonth: parts.length >= 2,
    };
}

export function formatPartialDate(
    parsed: ParsedDate | null,
    lang: "fr" | "en",
    fallback?: string,
): string {
    if (!parsed) {
        return fallback ?? (lang === "fr" ? "En cours" : "Ongoing");
    }

    const locale = lang === "fr" ? "fr-FR" : "en-US";

    if (!parsed.hasMonth) {
        return parsed.date.getFullYear().toString();
    }

    if (!parsed.hasDay) {
        return new Intl.DateTimeFormat(locale, {
            year: "numeric",
            month: "long",
        }).format(parsed.date);
    }

    return new Intl.DateTimeFormat(locale, {
        year: "numeric",
        month: "long",
        day: "numeric",
    }).format(parsed.date);
}

export function buildDateLabel(
    startRaw: string | Date | undefined,
    endRaw: string | Date | undefined,
    lang: "fr" | "en",
): string {
    const start = parsePartialDate(startRaw);
    const end = parsePartialDate(endRaw);

    const ongoingLabel = lang === "fr" ? "En cours" : "Ongoing";
    const formattedStart = start ? formatPartialDate(start, lang) : null;
    const formattedEnd = end
        ? formatPartialDate(end, lang)
        : ongoingLabel;

    return formattedStart
        ? `${formattedStart} — ${formattedEnd}`
        : formattedEnd;
}

export function dateToTimestamp(
    value: string | Date | undefined,
): number {
    const parsed = parsePartialDate(value);
    return parsed ? parsed.date.valueOf() : Infinity;
}
