import { DomainError } from "../../errors/domainError.js";
import { cnpjModel } from "./empresaModel.js";

async function validarDuplicidade({cnpj, idAtual = null}) {

    const existeCNPJ = await cnpjModel.buscarCNPJ(cnpj)

    if (existeCNPJ && existeCNPJ.id_cnpj !== Number(idAtual)) {
        throw new DomainError("CNPJ já cadastrado");
    }
}

export const cnpjService = {

    async cadastrarEmpresa(nome, cnpj, data_criacao, descricao_atividade) {

        await validarDuplicidade({cnpj});

        const novaEmpresa = await cnpjModel.cadastrarEmpresa(nome, cnpj, data_criacao, descricao_atividade);

        return novaEmpresa;
    },

    async empresas() {

        return await cnpjModel.empresas();

    }
}