import { DomainError } from "../../errors/domainError.js";
import { cnaesModel } from "./cnaesModel.js"

export const cnaesService = {

    async cnaes(codigosArray, descricao, limite, offset) {

        const { invalidos } = await cnaesModel.validarCodigos(codigosArray);

        if (invalidos.length > 0) {
            throw new DomainError("Código inválido");
        }

        const cnaes = await cnaesModel.cnaes(codigosArray, descricao, limite, offset);

        return cnaes;

    },

    async VinculoCnaeCnpj(cnae_id, cnpjId) {

        // const 

    }

}