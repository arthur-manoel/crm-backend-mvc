import z from "zod";

export const documentsParamsSchema = z.object({
  clientCompanyId: z.coerce.number().int().positive(),
});

export const documentsQuerySchema = z.object({
  documentTypeId: z.preprocess(
    (v) => {
      if (v === undefined || v === "") return undefined;
      return v;
    },
    z.coerce.number().int().positive().optional()
  )
});

export const requestedDocumentsSchema = z.object({
  ids: z.array(z.coerce.number().int().positive()).min(1)
});
