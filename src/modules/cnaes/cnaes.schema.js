import z from "zod";

export const cnaesSchema = z.object({
    cnaeId: z.coerce.number().int().positive(),
    cnpjId: z.coerce.number().int().positive(),
})