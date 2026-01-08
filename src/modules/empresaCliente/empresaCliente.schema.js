import z from "zod";

export const empresaClienteSchema = z.object({
    cnpj_id: z.coerce.number().int().positive()
});