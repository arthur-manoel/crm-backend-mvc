import { DomainError } from "../../errors/domainError.js";
import { NotFoundError } from "../../errors/NotFoundError.js";
import { empresaService } from "./empresaService.js";

const cadastroEmpresa = async (req, res) => {
    try {
        
        const { nome, cnpj, descricao_atividade } = req.body;
        const userId = req.user.id;

        const data_criacao = new Date()
        const novaEmpresa = await empresaService.cadastrarEmpresa(nome, cnpj, data_criacao, descricao_atividade, userId);

        return res.status(201).json(novaEmpresa);

    } catch (error) {

        if (error instanceof DomainError || error instanceof NotFoundError) {
            return res.status(error.status).json({ error: error.message });
        }
        
        return res.status(500).json({ error: "Erro interno" });
    }
}

const empresas = async (req, res) => {

    try {

        const { clienteId, cnpjId } = req.params;

        const empresasCadastradas = await empresaService.empresas(clienteId, cnpjId);

        return res.status(200).json({ empresa: empresasCadastradas });

    } catch (error) {
        if (error instanceof DomainError || error instanceof NotFoundError) {
            return error.status(error.status).json({ error: error.message })
        }
        return res.status(500).json({ error: "Erro interno" });
    }
}

const atualizarEmpresa = async (req, res) => {

    try {
    
        const { nome, descricao_atividade } = req.body;

        const { cnpjId } = req.params;

        const empresaAtualizada = await empresaService.atualizarEmpresa({nome, descricao_atividade, cnpjId});

        return res.status(204).send();

    } catch (error) {

        if (error instanceof NotFoundError) {

            return res.status(error.status).json({error: error.message});
        }

        return res.status(500).json({ error: "Erro interno" });
    }
}

const excluirEmpresa = async (req, res) => {

    try {
        
        const { id } = req.params;

        const empresaExcluida = await empresaService.excluirEmpresa(id);

        return res.status(204).send();

    } catch (error) {
        
        if (error instanceof NotFoundError) {
            return res.status(error.status).json({ error: error.message });
        }

        return res.status(500).json({ error: "Erro interno" });
    }
}

export { cadastroEmpresa, empresas, atualizarEmpresa, excluirEmpresa };