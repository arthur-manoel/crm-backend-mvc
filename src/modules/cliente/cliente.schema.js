import { z } from "zod";
import { cpf } from "cpf-cnpj-validator";

export const clienteSchema = z.object({

    nome: z.string().min(3).max(255).trim(),

    fone: z.string()
    .transform(v => v.replace(/\D/g, ''))
    .refine(v => /^\d{10,11}$/.test(v), {
        message: "Telefone inválido"
  })
,

    cpf: z.string()
    .transform(v => v.replace(/\D/g, ''))
    .refine(val => cpf.isValid(val), { 
        message: "CPF inválido" 
    }),

    data_nascimento: z.coerce.date({
        invalid_type_error: "Data de nascimento inválida"
    }),

    cep: z.string()
    .length(8, 'CEP deve ter 8 dígitos')
    .regex(/^\d+$/, 'CEP deve conter apenas números'),

    cidade: z.string().min(3).max(30).trim(),

    estado: z.string()
    .trim()
    .length(2)
    .toUpperCase(),

    rg: z.string()
    .trim()
    .regex(/^\d{7,9}$/, "RG inválido"),

    email: z.string()
    .trim()
    .toLowerCase()
    .email()
    .max(200),

    numero_casa: z.string().trim().max(10),

    endereco: z.string().max(50).trim(),

    complemento: z.string().max(50).trim().optional(), 
    
    rua: z.string().max(255).trim(), 

    bairro: z.string().max(255).trim()

})