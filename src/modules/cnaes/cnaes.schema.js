import z from "zod";

export const cnaeVinculoSchema = z.object({
    cnaeId: z.coerce.number().int().positive(),
    cnpjId: z.coerce.number().int().positive(),
})

export const atualizarVinculoSchema = z.object({
    idVinculo: z.coerce.number().int().positive(),
    cnpjId: z.coerce.number().int().positive()
})

export const cnaeIdSchema = z.object({
    cnaeId: z.coerce.number().int().positive()
})