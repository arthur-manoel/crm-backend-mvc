import { z } from 'zod';

export const criarVinculoEmpresaUsuarioSchema = z.object({
  usuario_id: z.number().int().positive(),
  papel: z.enum(['ADMIN', 'EDITOR', 'VIEWER'])
});
