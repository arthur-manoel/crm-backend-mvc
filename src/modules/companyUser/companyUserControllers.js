import { companyUserService } from "./companyUserService.js";
import { AuthorizationError } from "../../errors/AuthorizationError.js";
import { DomainError } from "../../errors/DomainError.js";

const createCompanyUser = async (req, res) => {
  try {

    const loggedUserId = req.user.id;
    const { companyId } = req.params;
    const { userId, role } = req.body;

    await companyUserService.addUserToCompany({
      loggedUserId,
      userId,
      companyId,
      role
    });

    return res.status(201).send();

  } catch (error) {

    if (error instanceof DomainError || error instanceof AuthorizationError) {
      return res.status(error.status).json({ error: error.message });
    }

    return res.status(500).json({ error: error.message });
  }
};

const updateCompanyUser = async (req, res) => {
  try {

    const loggedUserId = req.user.id;
    const { companyId, linkId } = req.params;
    const { userId, role } = req.body;

    await companyUserService.updateCompanyUserRole({
      loggedUserId,
      linkId,
      userId,
      companyId,
      role
    });

    return res.status(204).send();

  } catch (error) {

    if (error instanceof DomainError || error instanceof AuthorizationError) {
      return res.status(error.status).json({ error: error.message });
    }

    return res.status(500).json({ error: error.message });
  }
};

const deleteCompanyUser = async (req, res) => {
  try {

    const loggedUserId = req.user.id;
    const { companyId, linkId } = req.params;

    await companyUserService.removeUserFromCompany({
      linkId,
      loggedUserId,
      companyId
    });

    return res.status(204).send();

  } catch (error) {

    if (error instanceof DomainError || error instanceof AuthorizationError) {
      return res.status(error.status).json({ error: error.message });
    }

    return res.status(500).json({ error: error.message });
  }
};

export {
  createCompanyUser,
  updateCompanyUser,
  deleteCompanyUser
};
