import z from 'zod';

export const uploadParamsSchema = z.object({
    empresaClienteId: z.coerce.number().int().positive(),
})

export const uploadBodySchema = z.object({
    documentTypeId: z.coerce.number().int().positive(),
    generationLinkId: z.coerce.number().int().positive(),
});

