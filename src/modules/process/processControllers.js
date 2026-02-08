import { DomainError } from "../../errors/DomainError.js";
import { processService } from "./processService.js";

export const createProcess = async (req, res) => {

  try {
    const { clientId, companyId } = req.params;
    const { processTypeId, status } = req.body;

    const process = await processService.createProcess({
      clientId,
      companyId,
      processTypeId,
      status
    });

    return res.status(201).json({
      message: "Process created successfully",
      process
    });

  } catch (error) {
    if (error instanceof DomainError) {
      return res.status(error.status).json({ error: error.message });
    }

    return res.status(500).json({ error: error.message });
  }
};

export const getProcessesByCompany = async (req, res) => {
  try {
    
    const { companyId } = req.params;
    const { processId } = req.query;

    const processes = await processService.getAllByCompany(
      companyId,
      processId
    );

    return res.status(200).json(processes);

  } catch {
    return res.status(500).json({ error: "Internal server error" });
  }
};
