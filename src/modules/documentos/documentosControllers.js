import { documentosService } from "./documentosService.js";
import { DomainError } from "../../errors/DomainError.js";
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

const documentosSolicitados = async (req, res) => {

  try {

    const { ids } = req.body;

    const documentos = await documentosService.documentosSolicitados(ids);

    return res.json(documentos);

  } catch (error) {

    if (error instanceof DomainError || error instanceof NotFoundError) {
      return res.status(error.status).json({ error: error.message });
    }

    return res.status(500).json({ error: "Erro interno" });
  }

};

const tipsoDocumentos = async (req, res) => {

  const documentos = await documentosService.tiposDocumento();

  return res.status(200).json(documentos);

}
export { listarDocumentos, documentosSolicitados, tipsoDocumentos };