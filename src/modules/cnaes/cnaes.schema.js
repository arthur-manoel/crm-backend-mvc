import z from "zod";

export const cnaeLinkParamsSchema = z.object({
  linkId: z.coerce.number().int().positive(),
  companyId: z.coerce.number().int().positive(),
});

export const createCnaeLinkParamsSchema = z.object({
  cnaeId: z.coerce.number().int().positive(),
  companyId: z.coerce.number().int().positive(),
});

export const updateCnaeLinkBodySchema = z.object({
  cnaeId: z.coerce.number().int().positive(),
});
