import { z } from 'zod';

export const addressBodySchema = z.object({
  zipCode: z.string().regex(/^\d{5}-?\d{3}$/, "Invalid ZIP code"),

  street: z.string().trim().min(3),

  number: z.string()
    .trim()
    .min(1)
    .regex(/^[0-9A-Za-z\-]+$/, "Invalid house number"),

  complement: z.string().trim().optional(),

  neighborhood: z.string().trim().min(2),

  city: z.string().trim().min(2),

  state: z.string()
    .length(2)
    .transform((val) => val.toUpperCase()),
});

export const addressParamsSchema = z.object({
  clientId: z.coerce.number().int().positive(),
  companyId: z.coerce.number().int().positive(),
});

export const addressIdParamsSchema = z.object({
  addressId: z.coerce.number().int().positive()
});

export const addressPatchSchema = z.object({
  zipCode: z.string().regex(/^\d{5}-?\d{3}$/).optional(),

  street: z.string().min(3).optional(),
  
  number: z.string().min(1).optional(),

  complement: z.string().optional(),

  neighborhood: z.string().min(2).optional(),

  city: z.string().min(2).optional(),

  state: z.string().length(2).transform(v => v.toUpperCase()).optional()
  }).refine(data => Object.keys(data).length > 0, {
    message: "Send at least one field to update"
});

export const addressIdsSchema = z.object({
  addressId: z.coerce.number().positive(),

  companyId: z.coerce.number().positive(),

  clientId: z.coerce.number().positive(),
});

export const deleteAddressSchema = z.object({
  addressId: z.coerce.number().int().positive(),

  clientId: z.coerce.number().int().positive(),

  companyId: z.coerce.number().int().positive(),
});
