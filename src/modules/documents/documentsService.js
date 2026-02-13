import { documentsModel } from "./documentsModel.js";
import { NotFoundError } from "../../errors/NotFoundError.js";
import { DomainError } from "../../errors/DomainError.js";

export const documentsService = {

  async list(clientCompanyId, documentTypeId) {

    const documents = await documentsModel.listByCompany(
      clientCompanyId,
      documentTypeId
    );

    if (!documents.length) {
      throw new NotFoundError("No documents found for this company");
    }

    return documents;
  },

  async getRequestedDocuments(ids) {

    const documents = await documentsModel.getRequestedDocuments(ids);

    if (documents.length !== ids.length) {
      throw new DomainError("Invalid document type");
    }

    return documents;
  },

  async getDocumentTypes() {
    return documentsModel.getDocumentTypes();
  }

};
