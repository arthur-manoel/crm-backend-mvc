import { DomainError } from "../../errors/DomainError.js";
import { NotFoundError } from "../../errors/NotFoundError.js";
import { uploadService } from "./uploadService.js";

const insertDocument = async (req, res) => {

    try {

        const { empresaClienteId } = req.params;
        const { documentTypeId, generationLinkId } = req.body;

        const file = req.file;

        const linkId = await uploadService.insertDocument({
            file,
            documentTypeId,
            empresaClienteId,
            generationLinkId
        });

        return res.status(201).json(linkId);

    } catch (error) {
        
        if (error instanceof DomainError || error instanceof NotFoundError) {
            return res.status(error.status).json({ error: error.message });
        }

        return res.status(500).json({ error: "Internal server error" });
    }
}

export { insertDocument }