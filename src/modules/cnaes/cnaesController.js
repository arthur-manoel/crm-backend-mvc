import { cnaeService } from "./cnaesService.js";
import { DomainError } from "../../errors/DomainError.js";
import { NotFoundError } from "../../errors/NotFoundError.js";

export const listCnaes = async (req, res) => {
  try {

    let { code, description, limit, offset } = req.query;

    let codes = [];

    if (code) {
      codes = Array.isArray(code) ? code : [code];
    }

    limit = limit ? parseInt(limit) : undefined;
    offset = offset ? parseInt(offset) : undefined;

    const result = await cnaeService.list(codes, description, limit, offset);

    return res.json(result);

  } catch (error) {
    if (error instanceof DomainError || error instanceof NotFoundError) {
      return res.status(error.status).json({ error: error.message });
    }

    return res.status(500).json({ error: "Internal server error" });
  }
};

export const createCnaeLink = async (req, res) => {
  try {

    const { cnaeId, companyId } = req.params;

    const result = await cnaeService.createLink(cnaeId, companyId);

    return res.status(201).json({
      link: result,
      message: "Link created successfully"
    });

  } catch (error) {
    if (error instanceof DomainError || error instanceof NotFoundError) {
      return res.status(error.status).json({ error: error.message });
    }

    return res.status(500).json({ error: "Internal server error" });
  }
};

export const updateCnaeLink = async (req, res) => {
  try {

    const { linkId, companyId } = req.params;
    const { cnaeId } = req.body;

    await cnaeService.updateLink(linkId, cnaeId, companyId);

    return res.status(204).send();

  } catch (error) {
    if (error instanceof DomainError || error instanceof NotFoundError) {
      return res.status(error.status).json({ error: error.message });
    }

    return res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteCnaeLink = async (req, res) => {
  try {

    const { linkId, companyId } = req.params;

    await cnaeService.deleteLink(linkId, companyId);

    return res.status(204).send();

  } catch (error) {
    if (error instanceof DomainError || error instanceof NotFoundError) {
      return res.status(error.status).json({ error: error.message });
    }

    return res.status(500).json({ error: "Internal server error" });
  }
};
