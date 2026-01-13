import z from "zod";

export const idSchema = z.object({
  id: z.coerce.number().int().positive()
});

export const cadastrarEmpresaClienteSchema = z.object({
    clienteId: z.coerce.number().int().positive(),
    cnpjId: z.coerce.number().int().positive()
});

export const atualizarEmpresaClienteParamsSchema = z.object({
  idVinculo: z.coerce.number().int().positive(),
  cnpjId: z.coerce.number().int().positive()
});

export const atualizarEmpresaClienteBodySchema = z.object({
  clienteId: z.coerce.number().int().positive()
});