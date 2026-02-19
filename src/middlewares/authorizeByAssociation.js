import { ROLE_HIERARCHY } from "../constants/RoleHierarchy.js";
import { AuthorizationError } from "../errors/AuthorizationError.js";
import { NotFoundError } from "../errors/NotFoundError.js";
import { companyClientModel } from "../modules/companyClient/companyClientModel.js";

export function authorizeByAssociation(minimumRole) {

    if (!ROLE_HIERARCHY[minimumRole]) {
        throw new AuthorizationError("Invalid minimum role");
    }

    return async (req, res, next) => {

        try {

            const userId = req.user.id;
            const { clientCompanyId } = req.params;

            const associationContext =
                await companyClientModel.findUserAssociationContext(
                    userId,
                    clientCompanyId
                );

            if (!associationContext) {
                throw new NotFoundError("Association not found");
            }

            if (!associationContext.role) {
                throw new AuthorizationError("User not associated with company");
            }

            if (
                ROLE_HIERARCHY[associationContext.role] <
                ROLE_HIERARCHY[minimumRole]
            ) {
                throw new AuthorizationError("Insufficient role level");
            }

            req.associationContext = associationContext;

            next();

        } catch (error) {
            next(error);
        }
    };
}