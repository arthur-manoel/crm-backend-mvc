import { DomainError } from "../../errors/DomainError.js";
import { NotFoundError } from "../../errors/NotFoundError.js";
import { AuthorizationError } from "../../errors/AuthorizationError.js";
import { companyClientModel } from "./companyClientModel.js";
import { companyService } from "../company/companyService.js";
import { clientService } from "../client/clientService.js";

import db from "../../database/db.js";

export const companyClientService = {

  async listClientCompanies(clientId) {
    const companies = await companyClientModel.findCompaniesByClient(clientId);

    if (companies.length === 0) {
      throw new NotFoundError("Client has no linked companies");
    }

    return companies;
  },

  async createLink(clientId, companyId) {

    await clientService.ensureClientExists(clientId);

    const existingLink =
      await companyClientModel.findByClientAndCompany(clientId, companyId);

    if (existingLink) {
      throw new DomainError("Company already linked to this client");
    }

    return companyClientModel.create(clientId, companyId);
  },

  async updateLink(linkId, clientId, companyId) {
    
    await clientService.validateClientExists(clientId);

    const link = await companyClientModel.findById(linkId);

    if (!link) {
      throw new NotFoundError("Company-client link not found");
    }

    if (link.company_id !== companyId) {
      throw new AuthorizationError("Unauthorized access to this link");
    }

    const duplicate =
      await companyClientModel.findByClientAndCompany(clientId, companyId, linkId);

    if (duplicate) {
      throw new DomainError("Duplicate company-client link");
    }

    const affected =
      await companyClientModel.updateClient(linkId, clientId);

    if (affected === 0) {
      throw new DomainError("Failed to update link");
    }

    return affected;
  },

  async deleteLink(linkId) {

    const deleted = await companyClientModel.deleteById(linkId);
    return deleted;
  }
};
