import { z } from "zod";
import { cnpj } from "cpf-cnpj-validator";

export const clientCompanyParamsSchema = z.object({
  clientId: z.coerce.number().int().positive(),
  companyId: z.coerce.number().int().positive()
});

export const companyIdParamSchema = z.object({
  companyId: z.coerce.number().int().positive()
});

export const createCompanySchema = z.object({
    name: z.string().min(3).max(255).trim(),

    cnpj: z.string()
    .transform(v => v.replace(/\D/g, ''))
    .refine(val => cnpj.isValid(val), { 
        message: "Invalid CNPJ" 
    }),

    activityDescription: z.string().max(255).trim()
});

export const updateCompanySchema = z.object({
    name: z.string().min(3).max(255).trim(),
    activityDescription: z.string().min(1).max(255).trim()
});
