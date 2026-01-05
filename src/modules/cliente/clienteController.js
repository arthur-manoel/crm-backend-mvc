import { DomainError } from "../../errors/domainError.js";
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
    
        return res.json({ message: "Cliente cadastrado com sucesso!", novoCliente })

    } catch (error) {

        if (error instanceof DomainError) {
            return res.status(error.status).json({ error: error.message })
        }

        return res.status(500).json({ error: "Erro interno" })
    }

}

export { cadastrarCliente }