import { z, defineCollection } from "astro:content";

const partialDate = z.preprocess((val) => {
    if (val instanceof Date) return val.toISOString().slice(0, 10);
    if (typeof val === "number") return val.toString();
    return val;
}, z.string());

const projectsCollection = defineCollection({
    type: 'content',
    schema: z.object({
        locale: z.enum(['fr', 'en']).default('fr'),
        title: z.string(),
        description: z.string(),
        "start-date": partialDate.optional(),
        "end-date": partialDate.optional(),
        tags: z.array(z.string()).default([]),
        image: z.string().optional(),
        url: z.string().url().optional(),
        featured: z.boolean().default(false),
    }),
});

const servicesCollection = defineCollection({
    type: 'content',
    schema: z.object({
        locale: z.enum(['fr', 'en']).default('fr'),
        title: z.string(),
        description: z.string(),
        icon: z.string().optional(),
        order: z.number().default(999),
        available: z.boolean().default(true),
        status: z.string().optional(),
        reason: z.string().optional(),
    }),
});

export const collections = {
    projects: projectsCollection,
    services: servicesCollection,
};
