import { z } from "zod";

export const linkParamsSchema = z.object({
  clientCompanyId: z.coerce.number().int().positive(),
});
