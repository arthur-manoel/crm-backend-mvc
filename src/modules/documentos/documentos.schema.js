import z from "zod";

export const documentosParamsSchema = z.object({
  cnpjId: z.coerce.number().int().positive(),
});

export const documentosQuerySchema = z.object({
  tipoDocumentoId: z.preprocess(
    (v) => {
      if (v === undefined || v === "") return undefined;
      return v;
    },
    z.coerce.number().int().positive().optional()
  )
});

export const documentosSolicitadosSchema = z.object({
  ids: z.array(z.coerce.number().int().positive()).min(1)
});