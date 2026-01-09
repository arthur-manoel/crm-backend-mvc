import z from "zod";

export const cadastrarEmpresaClienteSchema = z.object({
    cnpjId: z.coerce.number().int().positive()
});

export const atualizarEmpresaClienteSchema = z.object({
    clienteIdNovo: z.coerce.number().int().positive(),
    cnpjIdNovo: z.coerce.number().int().positive(),
    clienteIdAntigo: z.coerce.number().int().positive(),
    cnpjIdAntigo: z.coerce.number().int().positive()
})