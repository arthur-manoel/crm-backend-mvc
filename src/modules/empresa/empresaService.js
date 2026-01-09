import { DomainError } from "../../errors/domainError.js";
import { NotFoundError } from "../../errors/NotFoundError.js";
import { empresaModel } from "./empresaModel.js";
import { empresaClienteModel } from "../empresaCliente/empresaClienteModel.js";
import { empresaCnaeModel } from "../empresaCnae/empresaCnaeModel.js";
import { enderecoModel } from "../endereco/enderecoModel.js";
import { processoModel } from "../processos/processoModel.js";

import db from "../../database/db.js";

export const empresaService = {
    
    async validarDuplicidade({cnpj, idAtual = null}) {
    
        const existeCNPJ = await empresaModel.buscarCNPJ(cnpj)
    
        if (existeCNPJ && existeCNPJ.id_cnpj !== Number(idAtual)) {
            throw new DomainError("CNPJ já cadastrado");
        }
    },

    async validarExistenciaEmpresa(idCnpj) {
      const empresa = await empresaModel.buscarPorId(idCnpj);
    
      if (!empresa) {
        throw new NotFoundError("Empresa não encontrada");
      }
    
      return empresa;
    },

    async cadastrarEmpresa(nome, cnpj, data_criacao, descricao_atividade) {
        
        await this.validarDuplicidade({cnpj});

        const novaEmpresa = await empresaModel.cadastrarEmpresa(nome, cnpj, data_criacao, descricao_atividade);

        return novaEmpresa;
    },

    async empresas() {

        return await empresaModel.empresas();

    },

    async atualizarEmpresa(dados) {

        const { nome, descricao_atividade, id } = dados;

        await this.validarExistenciaEmpresa(id);

        const empresaAtualizada = await empresaModel.atualizarEmpresa({nome, descricao_atividade, id});

        return empresaAtualizada;
    },
    
    async excluirEmpresa(idCnpj) {

        const conn = await db.getConnection();


        try {
            
            await this.validarExistenciaEmpresa(idCnpj)

            await conn.beginTransaction();

            
            await processoModel.excluirProcesso(idCnpj, conn);
            await empresaClienteModel.excluirEmpresaCliente(idCnpj, conn);
            await empresaCnaeModel.excluirEmpresaCnae(idCnpj, conn);
            await enderecoModel.excluirEndereco(idCnpj, conn);

            const empresaExcluida = await empresaModel.excluirEmpresa(idCnpj, conn)

            await conn.commit();

            console.log(empresaExcluida)
            return empresaExcluida;
            
        } catch (error) {
            await conn.rollback();
            throw error;
        }
        finally {
            conn.release();
        }

    }
}
