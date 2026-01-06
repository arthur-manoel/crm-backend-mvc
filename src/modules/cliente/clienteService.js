import { DomainError } from "../../errors/domainError.js";
import { clienteModel } from "./clienteModel.js";

function validarDataNascimento(data) {

    if (Number.isNaN(data.getTime())) {
        throw new DomainError("Data de nascimento inválida");
}

    const hoje = new Date();

    if (data > hoje) {
        throw new DomainError("Data de nascimento não pode ser no futuro");
    }

    let idade = hoje.getFullYear() - data.getFullYear();
    const m = hoje.getMonth() - data.getMonth();

    if (m < 0 || (m === 0 && hoje.getDate() < data.getDate())) {
        idade--;
    }

    if (idade > 100) {
        throw new DomainError("Cliente deve ter no máximo 100 anos")
    }
    if (idade < 18) {
        throw new DomainError("Cliente deve ser maior de idade");
    }
}


export async function validarDuplicidade({ cpf, rg, email, idAtual = null }) {

    const existeCPF = await clienteModel.buscarCPF(cpf);

    if (existeCPF && existeCPF.id_cliente !== Number(idAtual)) {
        throw new DomainError("CPF já cadastrado");
    }

    const existeRG = await clienteModel.buscarRG(rg);

    if (existeRG && existeRG.id_cliente !== Number(idAtual)) {
        throw new DomainError("RG já cadastrado");
    }

    const existeEmail = await clienteModel.buscarEmail(email);

    if (existeEmail && existeEmail.id_cliente !== Number(idAtual)) {
        throw new DomainError("Email já cadastrado");
    }
}


export const clienteService = {

    async cadastrarCliente({ nome, fone, cpf, userId, data_nascimento, cep, cidade, estado, rg, email, numero_casa, endereco, complemento, rua, bairro }) {

        validarDataNascimento(data_nascimento);

        await validarDuplicidade(cpf, rg, email, idAtual);

        const novoCliente = await clienteModel.cadastrarCliente({
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
            bairro
        })

        return novoCliente;
    },

    async clientes(userId) {
        

        const clientes = await clienteModel.clientes(userId);

        return clientes;

    },

    async atualizarCliente(dados) {
        
        const { nome, fone, cpf, userId, data_nascimento, cep, cidade, estado, rg, email, numero_casa, endereco, complemento, rua, bairro, id } = dados;
        
        await validarDuplicidade({ cpf, rg, email, idAtual: id });

        const clienteAtualizado = await clienteModel.atualizarCliente({           
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
            id
        })

            return clienteAtualizado;
    },

    async excluirCliente(id_cliente, userId) {

        const deletar = await clienteModel.excluirCliente(id_cliente, userId);

        if (deletar === 0) {
            throw new DomainError("Cliente não encontrado");
        }

        return { message: "Cliente excluido com sucesso" };
    }
}