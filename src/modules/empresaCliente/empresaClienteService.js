import { DomainError } from "../../errors/DomainError.js";
import  { empresaClienteModel } from "./empresaClienteModel.js";
import { empresaService } from "../empresa/empresaService.js";
import { clienteService } from "../cliente/clienteService.js";
import { NotFoundError } from "../../errors/NotFoundError.js";
import { processoModel } from "../processo/processoModel.js";
import db from "../../database/db.js";
import { AuthorizationError } from "../../errors/AuthorizationError.js";

export const empresaClienteService = {

    async empresasCliente(clienteId) {

        const empresasCliente = await empresaClienteModel.empresasCliente(clienteId);

        if (empresasCliente.length === 0) {
            throw new NotFoundError("Cliente não possui vinculos");
        }

        return empresasCliente;
    },

    async cadastrarEmpresaCliente(clienteId, cnpjId) {

        await empresaService.validarExistenciaEmpresa(cnpjId);
        await clienteService.validarExistenciaCliente(clienteId);
    
        const empresaVinculos = await empresaClienteModel.buscarVinculoEmpresa(clienteId, cnpjId);

        if (empresaVinculos) {
            throw new DomainError("Vinculo já existente");
        }

        const novoVinculo = await empresaClienteModel.criarEmpresaCliente(clienteId, cnpjId);

        return novoVinculo;
    },

    async atualizarEmpresaCliente(idVinculo, clienteId, cnpjId) {

        
        await empresaService.validarExistenciaEmpresa(cnpjId);

        await clienteService.validarExistenciaCliente(clienteId);

        const empresaVinculos = await empresaClienteModel.buscarVinculoEmpresa(idVinculo);

        if (!empresaVinculos) {
            throw new NotFoundError("Vínculo não encontrado");
        }

        if (empresaVinculos.cnpj_id !== cnpjId) {
            throw new AuthorizationError("Acesso não autorizado a este vínculo");
        }
        
        const duplicado = await empresaClienteModel.buscarPorClienteECnpj(
            clienteId,
            cnpjId,
            idVinculo
        );

        if (duplicado) {
            throw new DomainError("Vínculo já existente");
        }

        const linhasAfetadas = await empresaClienteModel.atualizarClienteEmpresa(idVinculo, clienteId, cnpjId);

        if (linhasAfetadas === 0) {
            throw new DomainError("Falha ao atualizar vínculo")
        }
        return linhasAfetadas;

    },

    async excluirVinculoClienteEmpresa(idVinculo) {

        const conn = await db.getConnection();

        try {

            const vinculo = await empresaClienteModel.buscarVinculoEmpresa(idVinculo);

            if (!vinculo) {
                throw new NotFoundError("Vinculo não encontrado");
            }

            await conn.beginTransaction();

            await processoModel.excluirGeracaoLink(idVinculo, conn);

            const linhasExcluidas = await empresaClienteModel.excluirVinculoPorId(idVinculo, conn);

            await conn.commit();

            return linhasExcluidas;

        } catch (error) {
            await conn.rollback();
            throw error;
        }
        finally {
            conn.release();
        }
    }
    
}   