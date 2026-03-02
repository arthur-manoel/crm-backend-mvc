import z from "zod";

export const idParamSchema = z.object({
  id: z.coerce.number().int().positive()
});

export const createCompanyClientSchema = z.object({
  clientId: z.coerce.number().int().positive(),
  companyId: z.coerce.number().int().positive()
});

export const companyClientParamsSchema = z.object({
  linkId: z.coerce.number().int().positive(),
});

export const updateCompanyClientBodySchema = z.object({
  clientId: z.coerce.number().int().positive()
});

export const companyClientDeleteParamsSchema = z.object({
  clientCompanyId: z.coerce.number().int().positive(),
});
