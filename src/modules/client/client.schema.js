import { z } from "zod";
import { cpf } from "cpf-cnpj-validator";

export const clientSchema = z.object({

    name: z.string().min(3).max(255).trim(),

    phone: z.string()
    .transform(v => v.replace(/\D/g, ''))
    .refine(v => /^\d{10,11}$/.test(v), {
        message: "Invalid phone"
  })
,

    cpf: z.string()
    .transform(v => v.replace(/\D/g, ''))
    .refine(val => cpf.isValid(val), { 
        message: "Invalid CPF" 
    }),

    birth_date: z.coerce.date({
        invalid_type_error: "Invalid birth date"
    }),

    zip_code: z.string()
    .length(8, 'ZIP code must have 8 digits')
    .regex(/^\d+$/, 'ZIP code must contain only numbers'),

    city: z.string().min(3).max(30).trim(),

    state: z.string()
    .trim()
    .length(2)
    .toUpperCase(),

    rg: z.string()
    .trim()
    .regex(/^\d{7,9}$/, "Invalid RG"),

    email: z.string()
    .trim()
    .toLowerCase()
    .email()
    .max(200),

    house_number: z.string().trim().max(10),

    address: z.string().max(50).trim(),

    complement: z.string().max(50).trim().optional(), 
    
    street: z.string().max(255).trim(), 

    neighborhood: z.string().max(255).trim()

})
