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

    if (idade < 18) {
        throw new DomainError("Cliente deve ser maior de idade");
    }
}


export const clienteService = {

    async cadastrarCliente({ nome, fone, cpf, userId, data_nascimento, cep, cidade, estado, rg, email, numero_casa, endereco, complemento, rua, bairro }) {

        validarDataNascimento(data_nascimento);

        const existeCPF = await clienteModel.buscarCPF(cpf)

        if (existeCPF) {
            throw new DomainError("CPF já cadastrado");
        }

        const existeRG = await clienteModel.buscarRG(rg);

        if (existeRG) {
            throw new DomainError("RG já cadastrado")
        }

        const existeEmail = await clienteModel.buscarEmail(email);

        if (existeEmail) {
            throw new DomainError("Email já cadastrado")
        }

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
    }
}