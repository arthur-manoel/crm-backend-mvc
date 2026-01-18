import { z } from 'zod';

export const enderecoBodySchema = z.object({

  cep: z.string().regex(/^\d{5}-?\d{3}$/, "CEP inválido"), 
  
  rua: z.string().trim().min(3),
  
  numero: z.string()
  .trim()
  .min(1)
  .regex(/^[0-9A-Za-z\-]+$/, "Número da casa inválido"),
  
  complemento: z.string().trim().optional(),
  
  bairro: z.string().trim().min(2),
  
  cidade: z.string().trim().min(2),
  
  estado: z.string()
    .length(2)
    .transform((val) => val.toUpperCase()),

});

export const enderecoParamsSchema = z.object({
    clienteId: z.coerce.number().int().positive(),
    cnpjId: z.coerce.number().int().positive(),
});


export const enderecoIdParamsSchema = z.object({
    idEndereco: z.coerce.number().int().positive()
});
