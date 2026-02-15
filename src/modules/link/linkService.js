import { DomainError } from "../../errors/DomainError.js";
import { NotFoundError } from "../../errors/NotFoundError.js";
import { linkModel } from "./linkModel.js";

export const linkService = {

  async getLinks(clientCompanyId) {

    const association = await linkModel.clientCompanyExists(clientCompanyId);

    if (!association) {
      throw new DomainError("Association not found");
    }

    const links = await linkModel.findByClientCompanyId(clientCompanyId);

    if (!links || links.length === 0) {
      throw new NotFoundError("No links found for this association");
    }

    return links;
  }
};
