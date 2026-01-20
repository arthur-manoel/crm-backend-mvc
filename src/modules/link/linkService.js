import { NotFoundError } from "../../errors/NotFoundError.js";

export const linkService = {

    async links(clienteCnpjId) {

        const { affectedRows } = await linkModel.links(clienteCnpjId);

        if (affectedRows === 0) {
            throw new NotFoundError("Links não encontrado")
        }

        return { affectedRows };

    }
}