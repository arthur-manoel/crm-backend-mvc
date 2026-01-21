import { DomainError } from "../../errors/DomainError.js";
import { NotFoundError } from "../../errors/NotFoundError.js";
import { linkModel } from "./linkModel.js";

export const linkService = {

    async links(clienteCnpjId, cnpjId) {

        
        const link = await linkModel.isCnpjAssociated(clienteCnpjId, cnpjId);

        if (!link) {
            throw new DomainError("CNPJ não associado ao cliente");
        }

        const affectedRows = await linkModel.links(clienteCnpjId);

        if (affectedRows === 0) {
            throw new NotFoundError("Links não encontrado")
        }

        return { affectedRows };

    }
}