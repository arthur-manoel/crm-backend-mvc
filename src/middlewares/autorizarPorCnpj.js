import { empresaUsuarioModel } from '../modules/empresaUsuario/empresaUsuarioModel.js';
import { AuthorizationError } from '../errors/AuthorizationError.js';
import { PAPEL_HIERARQUIA } from '../constants/papeisCnpj.js';

export function autorizarPorCnpj(papelMinimo) {

  return async (req, res, next) => {

    try {

      const usuarioId = req.user.id;
      const { cnpjId } = req.params;
      
      if (!PAPEL_HIERARQUIA[papelMinimo]) {
        throw new Error('Papel mínimo inválido');
      }
      
      if (!cnpjId) {
        throw new AuthorizationError();
      }
      
      const vinculo = await empresaUsuarioModel.buscarPapel(usuarioId, cnpjId);
      
      if (!vinculo) {
        throw new AuthorizationError();
      }

      if (PAPEL_HIERARQUIA[vinculo.papel] < PAPEL_HIERARQUIA[papelMinimo]) {
        throw new AuthorizationError();
      }

      next();

    } catch (error) {
      next(error);
    }
  };
}
