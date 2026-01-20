import { DomainError } from "../../errors/DomainError.js";
import { NotFoundError } from "../../errors/NotFoundError.js";
import { clienteService } from "./clienteService.js";

const cadastrarCliente = async (req, res) => {

    try {
        
        const { nome, fone, cpf, data_nascimento, cep, cidade, estado, rg, email, numero_casa, endereco, complemento, rua, bairro } = req.body;
        const userId = req.user.id;

        const novoCliente = await clienteService.cadastrarCliente({
            nome, 
            fone, 
            cpf, 
            userId, 
            data_nascimento, 
            cep, 
            cidade, 
            estado, 
            rg, 
            email, 
            numero_casa, 
            endereco, 
            complemento, 
            rua, 
            bairro,
        })
    
        return res.status(201).json({ message: "Cliente cadastrado com sucesso!", novoCliente })

    } catch (error) {

        if (error instanceof DomainError) {
            return res.status(error.status).json({ error: error.message })
        }

        return res.status(500).json({ error: error.message })
    }

}

const clientes = async (req, res) => {
    try {

    const userId = req.user.id;

    const clientes = await clienteService.clientes(userId);

    return res.status(200).json({ clientes })

    } catch (error) {
        return res.status(500).json({ error: "Erro interno" })
    }
}

const atualizarCliente = async (req, res) => {

    try {

        const { nome, fone, cpf, data_nascimento, cep, cidade, estado, rg, email, numero_casa, endereco, complemento, rua, bairro } = req.body;
        
        const { id } = req.params;
        const userId = req.user.id;

        const clienteAtualizado = await clienteService.atualizarCliente({            
            nome, 
            fone, 
            cpf, 
            userId, 
            data_nascimento, 
            cep, 
            cidade, 
            estado, 
            rg, 
            email, 
            numero_casa, 
            endereco, 
            complemento, 
            rua, 
            bairro,
            id,
    })

        return res.status(204).send();
        
    } catch (error) {

        if (error instanceof DomainError || error instanceof NotFoundError) {
            return res.status(error.status).json({ error: error.message })
        }

        return res.status(500).json({ error: "Erro interno", error: error.message })
    }
}

const excluirCliente = async (req, res) => {

    try {

        const id_cliente = req.params.id;
        const userId = req.user.id;

        const clienteExcluido = await clienteService.excluirCliente(id_cliente, userId);

        return res.status(204).send();

    } catch (error) {
        if (error instanceof NotFoundError) {
            return res.status(error.status).json({ error: error.message });
        }

        return res.status(500).json({ error: "Erro interno", error: error.message })
    }

}

export { cadastrarCliente, clientes, atualizarCliente, excluirCliente }