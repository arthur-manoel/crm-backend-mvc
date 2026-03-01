import { z } from "zod";

export const createLinkBodySchema = z.object({
  linkTypeId: z.coerce.number().int().positive(),
  status: z.enum(["pending", "active"]).optional().default("pending")
});

export const createLinkParamsSchema = z.object({
  clientCompanyId: z.coerce.number().int().positive()
});

export const linkIdQuerySchema = z.object({
  linkId: z.coerce.number().int().positive().optional()
});