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

const allProcessByCnpj = async (req, res) => {

  try {
    
    const { cnpjId } = req.params;
    const { idProcess } = req.query;

    const processes = await processoService.allProcessByCnpj(cnpjId, idProcess);

    return res.status(200).json(processes);

  } catch (error) {
    return res.status(500).json({ error: "Erro interno" });
  }
}

export { createProcess, allProcessByCnpj };