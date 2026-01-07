import { DomainError } from "../../errors/domainError.js";
import { NotFoundError } from "../../errors/NotFoundError.js";
import { cnpjService } from "./empresaService.js";

const cadastroEmpresa = async (req, res) => {
    try {
        
        const { nome, cnpj, descricao_atividade } = req.body;

        const data_criacao = new Date()
        const novaEmpresa = await cnpjService.cadastrarEmpresa(nome, cnpj, data_criacao, descricao_atividade);

        return res.status(201).json(novaEmpresa);

    } catch (error) {

        if (error instanceof DomainError) {
            return res.status(error.status).json({ error: error.message });
        }
        
        return res.status(500).json({ error: "Erro interno" });
    }
}

const empresas = async (req, res) => {

    try {

        const empresasCadastradas = await cnpjService.empresas();

        return res.status(200).json({ empresas: empresasCadastradas });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const atualizarEmpresa = async (req, res) => {

    try {
        
        const { nome, descricao_atividade } = req.body;

        const { id } = req.params;

        const empresaAtualizada = await cnpjService.atualizarEmpresa({nome, descricao_atividade, id});

        return res.status(204).send();

    } catch (error) {

        if (error instanceof NotFoundError) {

            return res.status(error.status).json({error: error.message});
        }

        return res.status(500).json({ error: "Erro interno", error: error.message });
    }

}

export { cadastroEmpresa, empresas, atualizarEmpresa };