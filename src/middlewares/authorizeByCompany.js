
// TEMP: domain not refactored yet
import { empresaUsuarioModel } from '../modules/empresaUsuario/empresaUsuarioModel.js';
import { AuthorizationError } from '../errors/AuthorizationError.js';
import { ROLE_HIERARCHY } from '../constants/RoleHierarchy.js';

export function authorizeByCompany(minimumRole) {

  return async (req, res, next) => {

    try {

      const userId = req.user.id;
      const { companyId } = req.params;

      if (!ROLE_HIERARCHY[minimumRole]) {
        throw new Error('Invalid minimum role');
      }

      if (!companyId) {
        throw new AuthorizationError();
      }

      const companyUser = await empresaUsuarioModel.buscarPapel(userId, companyId);

      if (!companyUser) {
        throw new AuthorizationError();
      }

      if (ROLE_HIERARCHY[companyUser.role] < ROLE_HIERARCHY[minimumRole]) {
        throw new AuthorizationError();
      }

      next();

    } catch (error) {
      next(error);
    }
  };
}
