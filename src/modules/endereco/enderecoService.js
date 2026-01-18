import { DomainError } from "../../errors/domainError.js";
import { NotFoundError } from "../../errors/NotFoundError.js";
import { enderecoModel } from "./enderecoModel.js"

export const enderecoService = {

    async criarEndereco(clienteId, cnpjId, cep, rua, numero, complemento, bairro, cidade, estado) {

        const existeEndereco = await enderecoModel.buscarEndereco(cnpjId, clienteId);

        if (existeEndereco) {
            throw new DomainError("Empresa já possui endereco cadastrado");
        }

        const vinculo = await enderecoModel.buscarVinculo(clienteId, cnpjId);

        if (!vinculo) {
            throw new NotFoundError("Vinculo empresa-cliente não existe");
        }

        const novoEndereco = await enderecoModel.criarEndereco(cnpjId, clienteId, cep, rua, numero, complemento, bairro, cidade, estado);

        return novoEndereco;
    },

    async buscarEnderecoPorId(idEndereco) {

        const endereco = await enderecoModel.buscarPorId(idEndereco);

        if (!endereco) {
            throw new NotFoundError("Endereço não encontrado");
        }

        return endereco;
    }
}