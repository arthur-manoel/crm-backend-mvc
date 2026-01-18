import { documentosModel } from "./documentosModel.js";
import { NotFoundError } from "../../errors/NotFoundError.js";
import { DomainError } from "../../errors/domainError.js";

export const documentosService = {

  async listar(cnpjId, tipoDocumentoId) {

    const documentos = await documentosModel.listarPorCnpj(
      cnpjId,
      tipoDocumentoId
    );

    if (!documentos.length) {
      throw new NotFoundError("Nenhum documento encontrado para esta empresa");
    }

    return documentos;
  },

  async documentosSolicitados(ids) {
    
    const documentos = await documentosModel.documentosSolicitados(ids);

    if (documentos.length !== ids.length) {
      throw new DomainError("Documento(s) inválido(s)")
    }

    return documentos;
  }

};