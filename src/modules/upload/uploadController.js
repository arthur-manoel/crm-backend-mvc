import { DomainError } from "../../errors/DomainError.js"; 
import { NotFoundError } from "../../errors/NotFoundError.js";
import { uploadService } from "./uploadService.js";

const insertDocument = async (req, res) => {

    try {

        const { clientCompanyId } = req.params;
        const { documentTypeId, generatedLinkId } = req.body;

        const file = req.file;

        const document = await uploadService.insertDocument({
            file,
            documentTypeId,
            clientCompanyId,
            generatedLinkId
        });

        return res.status(201).json(document);

    } catch (error) {
        
        if (error instanceof DomainError || error instanceof NotFoundError) {
            return res.status(error.status).json({ error: error.message });
        }

        return res.status(500).json({ error: error.message });
    }
}

export { insertDocument };
