import { DomainError } from "../../errors/DomainError.js";
import { processoService } from "./processoService.js";

const createProcess = async (req, res) => {
  try {

    const { clienteId, cnpjId } = req.params;
    const { tipoProcessoId, status } = req.body;

    const process = await processoService.createProcess({
      clienteId,
      cnpjId, 
      tipoProcessoId,
      status
    })

    return res.status(201).json({ 
      message: "Processo criado", 
      process
    });

  } catch (error) {
    if (error instanceof DomainError) {
      return res.status(error.status).json({ error: error.message });
    }

    return res.status(500).json({ error: "Erro interno" })
  }
}

export { createProcess };