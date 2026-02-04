import { z } from 'zod';

export const companyUserBodySchema = z.object({
  userId: z.coerce.number().int().positive(),
  role: z.enum(['ADMIN', 'EDITOR', 'VIEWER'])
});

export const companyUserParamsSchema = z.object({
  companyId: z.coerce.number().int().positive(),
  linkId: z.number().int().positive(),
});

export const companyIdSchema = z.object({
  companyId: z.coerce.number().int().positive(),
});