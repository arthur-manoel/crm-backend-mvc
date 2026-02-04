import { companyUserModel } from "./companyUserModel.js";
import { AuthorizationError } from "../../errors/AuthorizationError.js";
import { DomainError } from "../../errors/DomainError.js";
import { ROLE_HIERARCHY } from "../../constants/RoleHierarchy.js";

export const companyUserService = {

  async addUserToCompany({ loggedUserId, userId, companyId, role }) {

    const loggedUserRole = await companyUserModel.findRole(
      loggedUserId,
      companyId
    );

    // Only admins can manage company users
    if (!loggedUserRole || loggedUserRole.role !== "ADMIN") {
      throw new AuthorizationError();
    }

    const existingLink = await companyUserModel.findRole(userId, companyId);

    if (existingLink) {
      throw new DomainError("User already linked to company");
    }

    return companyUserModel.createLink({
      userId,
      companyId,
      role
    });
  },

  async updateCompanyUserRole({ loggedUserId, linkId, userId, companyId, role }) {

    if (!ROLE_HIERARCHY[role]) {
      throw new DomainError("Invalid role");
    }

    const loggedUserRole = await companyUserModel.findRole(
      loggedUserId,
      companyId
    );

    if (
      !loggedUserRole ||
      ROLE_HIERARCHY[loggedUserRole.role] < ROLE_HIERARCHY.ADMIN
    ) {
      throw new AuthorizationError();
    }

    const link = await companyUserModel.findRole(userId, companyId);

    if (!link) {
      throw new DomainError("Link not found");
    }

    // Prevent removing the last admin of the company
    if (link.role === "ADMIN" && role !== "ADMIN") {
      const totalAdmins = await companyUserModel.countAdmins(companyId);
      if (totalAdmins <= 1) {
        throw new DomainError("Cannot remove the last company admin");
      }
    }

    if (link.role === role) return link;

    return companyUserModel.updateRole(linkId, role);
  },

  async removeUserFromCompany({ linkId, loggedUserId, companyId }) {

    const loggedUserRole = await companyUserModel.findRole(
      loggedUserId,
      companyId
    );

    if (!loggedUserRole || loggedUserRole.role !== "ADMIN") {
      throw new AuthorizationError();
    }

    const link = await companyUserModel.findLinkById(linkId);

    if (!link || link.company_id !== Number(companyId)) {
      throw new DomainError("Link not found");
    }

    // Prevent removing the last admin of the company
    if (link.role === "ADMIN") {
      const totalAdmins = await companyUserModel.countAdmins(companyId);
      if (totalAdmins <= 1) {
        throw new DomainError("Cannot remove the last company admin");
      }
    }

    return companyUserModel.deleteLink(linkId);
  }
};
