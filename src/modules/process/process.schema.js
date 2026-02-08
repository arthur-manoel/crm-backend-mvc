import { z } from "zod";

export const createProcessBodySchema = z.object({
  processTypeId: z.coerce
    .number()
    .int()
    .refine(id => [50, 51, 52, 53].includes(id), {
      message: "Invalid processTypeId"
    }),

  status: z.enum(["pending", "active"]).optional().default("pending")
});

export const createProcessParamsSchema = z.object({
  clientId: z.coerce.number().int().positive(),
  companyId: z.coerce.number().int().positive()
});

export const companyIdParamsSchema = z.object({
  companyId: z.coerce.number().int().positive()
});

export const processIdQuerySchema = z.object({
  processId: z.coerce.number().int().positive().optional()
});
