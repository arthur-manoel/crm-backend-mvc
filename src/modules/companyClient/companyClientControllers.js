import { DomainError } from "../../errors/DomainError.js";
import { NotFoundError } from "../../errors/NotFoundError.js";
import { companyClientService } from "./companyClientService.js";

export const listClientCompanies = async (req, res) => {

  try {
    const { id } = req.params;
    const companies = await companyClientService.listClientCompanies(id);
    return res.status(200).json(companies);

  } catch (error) {

    if (error instanceof DomainError || error instanceof NotFoundError) {
      return res.status(error.status).json({ error: error.message });
    }

    return res.status(500).json({ error: "Internal server error" });

  }
};

export const createCompanyClient = async (req, res) => {

  try {

    const { clientId, companyId } = req.params;

    await companyClientService.createLink(clientId, companyId);

    return res.status(204).send();

  } catch (error) {

    if (error instanceof DomainError || error instanceof NotFoundError) {
      return res.status(error.status).json({ error: error.message });
    }
    
    return res.status(500).json({ error: error.message });

  }
};

export const updateCompanyClient = async (req, res) => {

  try {

    const { linkId, companyId } = req.params;
    const { clientId } = req.body;

    await companyClientService.updateLink(linkId, clientId, companyId);

    return res.status(204).send();

  } catch (error) {

    if (error instanceof DomainError || error instanceof NotFoundError) {

      return res.status(error.status).json({ error: error.message });
    }
    return res.status(500).json({ error: error.message });

  }
};

export const deleteCompanyClient = async (req, res) => {

  try {

    const { linkId } = req.params;

    await companyClientService.deleteLink(linkId);
    return res.status(204).send();

  } catch (error) {

    if (error instanceof DomainError || error instanceof NotFoundError) {
      return res.status(error.status).json({ error: error.message });
    }

    return res.status(500).json({ error: error.message });
  }
};
