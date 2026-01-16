import { documentosModel } from "./documentosModel.js";
import { NotFoundError } from "../../errors/NotFoundError.js";

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
  }

};