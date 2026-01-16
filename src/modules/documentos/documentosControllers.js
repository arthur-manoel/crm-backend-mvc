import { documentosService } from "./documentosService.js";
import { DomainError } from "../../errors/domainError.js";
import { NotFoundError } from "../../errors/NotFoundError.js";

const listarDocumentos = async (req, res) => {

  try {

    const { cnpjId } = req.params;
    const { tipoDocumentoId } = req.query;

    const documentos = await documentosService.listar(
      cnpjId,
      tipoDocumentoId
    );

    return res.json(documentos);

  } catch (error) {

    if (error instanceof DomainError || error instanceof NotFoundError) {
      return res.status(error.status).json({ error: error.message });
    }

    return res.status(500).json({ error: "Erro interno" });
  }

};

export { listarDocumentos };