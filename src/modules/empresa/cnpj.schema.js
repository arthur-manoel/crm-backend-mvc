import { z } from "zod";
import { cnpj } from "cpf-cnpj-validator";

export const cnpjSchema = z.object({
    nome: z.string().min(3).max(255).trim(),

    cnpj: z.string()
    .transform(v => v.replace(/\D/g, ''))
    .refine(val => cnpj.isValid(val), { 
        message: "CNPJ inválido" 
    }),
    descricao_atividade: z.string().max(255).trim()
})