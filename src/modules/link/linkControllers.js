import { linkService } from "./linkService.js";
import { DomainError } from "../../errors/DomainError.js";
import { NotFoundError } from "../../errors/NotFoundError.js";

const getLinks = async (req, res) => {
    try {

        const { clientCompanyId } = req.params;

        const links = await linkService.getLinks(clientCompanyId);

        return res.status(200).json({ data: links });

    } catch (error) {

        if (error instanceof DomainError || error instanceof NotFoundError) {
        return res.status(error.status).json({ error: error.message });
        }

        return res.status(500).json({ error: "Internal server error" });
    }
};

export { getLinks };