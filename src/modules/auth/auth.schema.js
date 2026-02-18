import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

export const createUserSchema = z.object({
  name: z.string().min(3).max(255).trim(),

  email: z.string().trim().toLowerCase().email().max(255),

  phone: z.string().regex(/^\d{10,11}$/).optional(),

  password: z.string().min(6).max(255),

  role: z.coerce.number().int().positive()
});