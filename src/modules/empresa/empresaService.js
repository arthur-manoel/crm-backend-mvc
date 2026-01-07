import { DomainError } from "../../errors/domainError.js";
import { NotFoundError } from "../../errors/NotFoundError.js";
import { empresaModel } from "./empresaModel.js";

async function validarDuplicidade({cnpj, idAtual = null}) {

    const existeCNPJ = await empresaModel.buscarCNPJ(cnpj)

    if (existeCNPJ && existeCNPJ.id_cnpj !== Number(idAtual)) {
        throw new DomainError("CNPJ já cadastrado");
    }
}

export const cnpjService = {

    async cadastrarEmpresa(nome, cnpj, data_criacao, descricao_atividade) {

        await validarDuplicidade({cnpj});

        const novaEmpresa = await empresaModel.cadastrarEmpresa(nome, cnpj, data_criacao, descricao_atividade);

        return novaEmpresa;
    },

    async empresas() {

        return await empresaModel.empresas();

    },

    async atualizarEmpresa(dados) {

        const { nome, descricao_atividade, id } = dados;

        const empresaAtualizada = await empresaModel.atualizarEmpresa({nome, descricao_atividade, id});

        if (empresaAtualizada === 0) {
            throw new NotFoundError("Empresa não encontrada");
        }
    }
}