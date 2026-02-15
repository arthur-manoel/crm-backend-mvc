import { documentsService } from "./documentsService.js";
import { DomainError } from "../../errors/DomainError.js";
import { NotFoundError } from "../../errors/NotFoundError.js";

const listDocuments = async (req, res) => {

  try {

    const { clientCompanyId } = req.params;
    const { documentTypeId } = req.query;

    const documents = await documentsService.list(
      clientCompanyId,
      documentTypeId
    );

    return res.json(documents);

  } catch (error) {

    if (error instanceof DomainError || error instanceof NotFoundError) {
      return res.status(error.status).json({ error: error.message });
    }

    return res.status(500).json({ error: "Internal server error" });
  }

};

const requestedDocuments = async (req, res) => {

  try {

    const { ids } = req.body;

    const documents = await documentsService.getRequestedDocuments(ids);

    return res.json(documents);

  } catch (error) {

    if (error instanceof DomainError || error instanceof NotFoundError) {
      return res.status(error.status).json({ error: error.message });
    }

    return res.status(500).json({ error: "Internal error" });
  }

};

const listDocumentTypes = async (req, res) => {

  const documents = await documentsService.getDocumentTypes();
  return res.status(200).json(documents);

}

export { listDocuments, requestedDocuments, listDocumentTypes };
