import { z } from "zod";

export const usuarioSchema = z.object({
  name: z
    .string()
    .min(3, { message: "O nome deve ter no mínimo 3 caracteres" })
    .max(255, { message: "O nome deve ter no máximo 255 caracteres" })
    .trim(),

  email: z
    .string()
    .email({ message: "Email inválido" })
    .max(255, { message: "O email deve ter no máximo 255 caracteres" })
    .toLowerCase()
    .trim(),

  phone: z
    .string()
    .regex(/^(\d{10,11})$/, { message: "Telefone inválido. Use apenas números, ex: 81987654321" })
    .optional(),

  password: z
    .string()
    .min(6, { message: "A senha deve ter no mínimo 6 caracteres" })
    .max(255, { message: "A senha deve ter no máximo 255 caracteres" })
    .trim(),

  role: z
  .number()
  .int()
  .refine(val => val === 1 || val === 2, { message: "Nível de usuário inválido" })
});
