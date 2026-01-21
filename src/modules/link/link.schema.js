import { z } from 'zod';

export const linkParamsSchema = z.object({
    clienteCnpjId: z.coerce.number().int().positive(),
    cnpjId: z.coerce.number().int().positive(),
});