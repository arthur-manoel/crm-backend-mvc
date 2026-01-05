import { z } from "zod";

export const cadastroSchema = z.object({
  name: z.string().min(3).max(255).trim(),

  email: z.string().trim().toLowerCase().email().max(255),

  phone: z.string().regex(/^\d{10,11}$/).optional(),

  password: z.string().min(6).max(255),

  role: z.number().int()
})