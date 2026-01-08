import { DomainError } from "../../errors/domainError.js";
import { NotFoundError } from "../../errors/NotFoundError.js";
import { clienteModel } from "./clienteModel.js";


export const clienteService = {
    
    async validarDataNascimento(data) {
    
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
    },
    
    async validarDuplicidade({ cpf, rg, email, idAtual = null }) {
    
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
    },
    
    async validarExistenciaCliente(idCliente) {
    
        const existeCliente = await clienteModel.buscarClientePorId(idCliente);
    
        if (!existeCliente) {
            throw new NotFoundError("Cliente não existe");
        }
    
    },

    async cadastrarCliente({ nome, fone, cpf, userId, data_nascimento, cep, cidade, estado, rg, email, numero_casa, endereco, complemento, rua, bairro }) {

        this.validarDataNascimento(data_nascimento);

        await this.validarDuplicidade({cpf, rg, email});

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
        
        await this.validarDuplicidade({ cpf, rg, email, idAtual: id });

        await this.validarExistenciaCliente(id);

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
        });

        return clienteAtualizado;
    },

    async excluirCliente(id_cliente, userId) {

        await this.validarExistenciaCliente(id_cliente);

        const deletar = await clienteModel.excluirCliente(id_cliente, userId);

        return deletar;
    }
}
