import { empresaUsuarioModel } from '../modules/empresaUsuario/empresaUsuarioModel.js';
import { AuthorizationError } from '../errors/AuthorizationError.js';
import { ROLE_HIERARCHY } from '../constants/RoleHierarchy.js';

export function authorizeByCompany(papelMinimo) {

  return async (req, res, next) => {

    try {
  
      const usuarioId = req.user.id;
      const { cnpjId } = req.params;
      
      if (!ROLE_HIERARCHY[papelMinimo]) {
        throw new Error('Papel mínimo inválido');
      } 
      
      if (!cnpjId) {
        throw new AuthorizationError();
      }
      
      const vinculo = await empresaUsuarioModel.buscarPapel(usuarioId, cnpjId);
      
      if (!vinculo) {
        throw new AuthorizationError();
      }

      if (ROLE_HIERARCHY[vinculo.papel] < ROLE_HIERARCHY[papelMinimo]) {
        throw new AuthorizationError();
      }

      next();

    } catch (error) {
      next(error);
    }
  };
}
