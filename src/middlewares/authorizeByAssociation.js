import { ROLE_HIERARCHY } from "../constants/RoleHierarchy.js";
import { AuthorizationError } from "../errors/AuthorizationError.js";
import { companyUserModel } from "../modules/companyUser/companyUserModel.js";
import { companyClientModel } from "../modules/companyClient/companyClientModel.js";

export function authorizeByAssociation(minimumRole) {
    return async (req, res, next) => {

        try {
            
            const userId = req.user.id;
            const { clientCompanyId } = req.params;

            if (!ROLE_HIERARCHY[minimumRole]) {
                throw new AuthorizationError("Invalid minimum role")
            }

            const association = await companyClientModel.findById(clientCompanyId);
            
            if (!association) {
                throw new AuthorizationError("Association not found");
            }
            
            const companyUser = await companyUserModel.findRole(userId, association.company_id);

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
    }
}