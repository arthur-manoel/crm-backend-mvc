import { DomainError } from "../../errors/DomainError.js";
import { linkService } from "./linkService.js";

const createLink = async (req, res) => {
  try {

    const { clientCompanyId } = req.params;
    const { linkTypeId, status } = req.body;

    const result = await linkService.createLink({
      clientCompanyId: Number(clientCompanyId),
      linkTypeId,
      status
    });

    return res.status(201).json({
      message: "Link created successfully",
      data: result
    });

  } catch (error) {

    if (error instanceof DomainError) {
      return res.status(error.status).json({ error: error.message });
    }

    return res.status(500).json({ error: error.message });

  }
};

const getLinksByClientCompany = async (req, res) => {
  try {
    const { clientCompanyId } = req.params;
    const { linkId } = req.query;

    const links = await linkService.getAllByClientCompany(
      Number(clientCompanyId),
      linkId ? Number(linkId) : undefined
    );

    return res.status(200).json({ data: links });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export { createLink, getLinksByClientCompany };