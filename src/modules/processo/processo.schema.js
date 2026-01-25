import { z } from "zod";

export const createProcessBodySchema = z.object({

    tipoProcessoId: z
        .coerce
        .number()
        .int()
        .refine(id => [50, 51, 52, 53].includes(id), {
        message: "tipoProcessoId inválido"
        }),

    status: z
        .enum(["pendente", "ativo"])
        .optional()
        .default("pendente"),
    }
);

export const createProcessParamsSchema = z.object({
    clienteId: z
        .coerce
        .number()
        .int()
        .positive(),

    cnpjId: z
        .coerce
        .number()
        .int()
        .positive(),

})

export const cnpjIdParamsSchema = z.object({
    cnpjId: z.coerce.number().int().positive()
})

export const idProcessQuerySchema = z.object({
    idProcess: z.coerce.number().int().positive().optional()
})