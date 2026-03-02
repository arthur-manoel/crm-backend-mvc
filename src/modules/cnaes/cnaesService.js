import { DomainError } from "../../errors/DomainError.js";
import { NotFoundError } from "../../errors/NotFoundError.js";
import { cnaeModel } from "./cnaesModel.js";
import { companyService } from "../company/companyService.js";

export const cnaeService = {

  async list(codes, description, limit, offset) {

    const { invalidCodes } = await cnaeModel.validateCodes(codes);

    if (invalidCodes.length > 0) {
      throw new DomainError("Invalid CNAE code");
    }

    return await cnaeModel.find(codes, description, limit, offset);
  },

  async createLink(cnaeId, companyId) {

    const existingLink = await cnaeModel.findLink(cnaeId, companyId);

    if (existingLink) {
      throw new DomainError("Link already exists");
    }

    const cnaeExists = await cnaeModel.findById(cnaeId);

    if (!cnaeExists) {
      throw new NotFoundError("CNAE not found");
    }

    const linkId = await cnaeModel.createLink(cnaeId, companyId);

    return {
      id: linkId,
      cnaeId,
      companyId
    };
  },

  async updateLink(linkId, cnaeId, companyId) {

    const currentLink = await cnaeModel.findLinkById(linkId);

    if (!currentLink) {
      throw new NotFoundError("Link not found");
    }

    if (currentLink.company_id !== companyId) {
      throw new DomainError("Link does not belong to this company");
    }

    const cnaeExists = await cnaeModel.findById(cnaeId);

    if (!cnaeExists) {
      throw new NotFoundError("CNAE not found");
    }

    const duplicate = await cnaeModel.findLink(cnaeId, companyId, linkId);

    if (duplicate) {
      throw new DomainError("Link already exists");
    }

    await cnaeModel.updateLink(cnaeId, linkId);
  },

  async deleteLink(linkId, companyId) {

    const link = await cnaeModel.findLinkById(linkId);

    if (!link) {
      throw new NotFoundError("Link not found");
    }

    if (link.company_id !== companyId) {
      throw new DomainError("Link does not belong to this company");
    }

    await cnaeModel.deleteLink(linkId);
  }

};
