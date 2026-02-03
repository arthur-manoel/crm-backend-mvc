import { DomainError } from "../../errors/DomainError.js";
import { NotFoundError } from "../../errors/NotFoundError.js";
import { companyClientModel } from "../companyClient/companyClientModel.js";
import { enderecoModel } from "./enderecoModel.js"

export const enderecoService = {

    async buscarEnderecoPorId(idEndereco) {

        const endereco = await enderecoModel.buscarPorId(idEndereco);

        if (!endereco) {
            throw new NotFoundError("Endereço não encontrado");
        }

        return endereco;
    },

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

     async atualizarEndereco(clienteId, cnpjId, idEndereco, dados) {

        const vinculo = await companyClientModel.findByClientAndCompany(clienteId, cnpjId);

        if (!vinculo) {
            throw new DomainError("Empresa não possui vínculo com cliente");
        }

        const endereco = await enderecoModel.validarEndereco(idEndereco, clienteId, cnpjId);
        
        if (!endereco) {
            throw new NotFoundError("Endereço não encontrado");
        }

        const normalizar = (v) => {
            if (v === undefined || v === null || v === "") return null;
            return String(v).trim();
        };

        const dadosAtualizados = {
            cep: normalizar(dados.cep ?? endereco.cep),
            rua: normalizar(dados.rua ?? endereco.rua),
            numero: normalizar(dados.numero ?? endereco.numero),
            complemento: normalizar(dados.complemento ?? endereco.complemento),
            bairro: normalizar(dados.bairro ?? endereco.bairro),
            cidade: normalizar(dados.cidade ?? endereco.cidade),
            estado: normalizar(dados.estado ?? endereco.estado),
        };

        const camposAlterados = Object.keys(dadosAtualizados).filter(campo =>
            normalizar(dadosAtualizados[campo]) !== normalizar(endereco[campo])
        );

        if (camposAlterados.length === 0) {
            throw new DomainError("Nenhuma alteração detectada");
        }

        const duplicidade = await enderecoModel.validarDuplicidade(
            idEndereco,
            cnpjId,
            dadosAtualizados.cep,
            dadosAtualizados.rua,
            dadosAtualizados.numero,
            dadosAtualizados.complemento,
            dadosAtualizados.bairro,
            dadosAtualizados.cidade,
            dadosAtualizados.estado
        );

        if (duplicidade) {
            throw new DomainError("Endereço já existe para esta empresa");
        }

        const camposParaUpdate = Object.fromEntries(
            camposAlterados.map(campo => [campo, dadosAtualizados[campo]])
        );

        await enderecoModel.atualizarEndereco(idEndereco, camposParaUpdate);

        return;
    },

    async deletarEndereco(clienteId, cnpjId, idEndereco) {

        const vinculo = await companyClientModel.findByClientAndCompany(clienteId, cnpjId);

        if (!vinculo) {
            throw new DomainError("Empresa não possui vínculo com cliente");
        }

        const endereco = await enderecoModel.validarEndereco(idEndereco, clienteId, cnpjId);

        if (!endereco) {
            throw new NotFoundError("Endereço não encontrado");
        }

        await enderecoModel.excluirEnderecoPorId(idEndereco);

        return;
    },
}