import z from "zod";

export const clientIdSchema = z.object({
    clienteId: z.coerce.number().int() 
})