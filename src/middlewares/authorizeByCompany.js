
import { companyUserModel } from '../modules/companyUser/companyUserModel.js';
import { AuthorizationError } from '../errors/AuthorizationError.js';
import { ROLE_HIERARCHY } from '../constants/RoleHierarchy.js';
import { NotFoundError } from '../errors/NotFoundError.js';

export function authorizeByCompany(minimumRole) {

  return async (req, res, next) => {
    
    if (!ROLE_HIERARCHY[minimumRole]) {
      throw new AuthorizationError('Invalid minimum role');
    }

    try {

      const userId = req.user.id;
      const { companyId } = req.params;
      

      const companyContext = await companyUserModel.findUserCompanyContext(userId, companyId);
      if (!companyContext) {
        throw new NotFoundError("company not found")
      }

      if (!companyContext.role) {
        throw new AuthorizationError("user not associated with company");
      }


      if (ROLE_HIERARCHY[companyContext.role] < ROLE_HIERARCHY[minimumRole]) {
        throw new AuthorizationError();
      }

      req.companyContext = companyContext;

      next();

    } catch (error) {
      next(error);
    }
  };
}
