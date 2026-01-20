import { linkService } from "./linkService.js";
import { DomainError } from "../../errors/DomainError.js";
import { NotFoundError } from "../../errors/NotFoundError.js";

const links = async (req, res) => {

    try {

        const { clienteCnpjId } = req.params;
    
        const links = await linkService.links(clienteCnpjId)

        return res.status(200).json(links)

    } catch (error) {

        if (error instanceof DomainError || error instanceof NotFoundError) {

            return res.status(error.status).json({ error: error.message });
        }
        
        return res.status(500).json({ error: "Erro interno" });

    }
}

export { links }