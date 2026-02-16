import z from 'zod';

export const uploadParamsSchema = z.object({
    clientCompanyId: z.coerce.number().int().positive(),
});

export const uploadBodySchema = z.object({
    documentTypeId: z.coerce.number().int().positive(),
    generatedLinkId: z.coerce.number().int().positive(),
});
