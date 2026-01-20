import { DomainError } from "../../errors/domainError.js";
import { NotFoundError } from "../../errors/NotFoundError.js";
import { enderecoService } from "./enderecoService.js";

const criarEndereco = async (req, res) => {

    try {
        
        const { cep, rua, numero, complemento, bairro, cidade, estado } = req.body;

        const { clienteId, cnpjId } = req.params;

        const novoEndereco = await enderecoService.criarEndereco(clienteId, cnpjId, cep, rua, numero, complemento, bairro, cidade, estado);

        return res.status(201).json({ message: "Endereço criado com sucesso", novoEndereco })

    } catch (error) {

        if (error instanceof DomainError || error instanceof NotFoundError) {
            return res.status(error.status).json({ error: error.message });
        }
        
        return res.status(500).json({ error: "Erro interno" })
        
    }
}

const buscarEndereco = async (req, res) => {

    try {
        const { idEndereco } = req.params;

        const endereco = await enderecoService.buscarEnderecoPorId(idEndereco);

        return res.status(200).json(endereco);

    } catch (error) {

        if (error instanceof NotFoundError) {
            return res.status(error.status).json({ error: error.message });
        }

        return res.status(500).json({ error: "Erro interno" });
    }
};

const atualizarEndereco = async (req, res) => {

    try {

        const dados = req.body;
        const { idEndereco, clienteId, cnpjId } = req.params;

        await enderecoService.atualizarEndereco(clienteId, cnpjId, idEndereco, dados)
        return res.status(204).send();

    } catch (error) {

        if (error instanceof NotFoundError || error instanceof DomainError) {
            return res.status(error.status).json({ error: error.message });
        }

        return res.status(500).json({ error: error.message });
    }
};

const deletarEndereco = async (req, res) => {

    try {

        const { idEndereco, clienteId, cnpjId } = req.params;

        await enderecoService.deletarEndereco(clienteId, cnpjId, idEndereco);
        return res.status(204).send();

    } catch (error) {

        if (error instanceof NotFoundError || error instanceof DomainError) {
            return res.status(error.status).json({ error: error.message });
        }

        return res.status(500).json({ error: error.message });
    }
};

export { criarEndereco, buscarEndereco, atualizarEndereco, deletarEndereco };