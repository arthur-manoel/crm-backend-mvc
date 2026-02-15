import z from "zod";

export const clientIdSchema = z.object({
    clientId: z.coerce.number().int()
});
