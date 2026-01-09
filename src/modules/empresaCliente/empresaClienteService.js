import { DomainError } from "../../errors/domainError.js";
import  { empresaClienteModel } from "./empresaClienteModel.js";
import { empresaService } from "../empresa/empresaService.js";
import { clienteService } from "../cliente/clienteService.js";
import { NotFoundError } from "../../errors/NotFoundError.js";
import { processoModel } from "../processos/processoModel.js";
import db from "../../database/db.js";

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

    async atualizarEmpresaCliente(clienteIdNovo, cnpjIdNovo, clienteIdAntigo, cnpjIdAntigo) {

        const vinculoAntigo = await empresaClienteModel.buscarVinculoEmpresa(
        clienteIdAntigo,
        cnpjIdAntigo
        );

        if (!vinculoAntigo) {
            throw new NotFoundError("Vínculo original não encontrado");
        }

        await empresaService.validarExistenciaEmpresa(cnpjIdNovo);

        await clienteService.validarExistenciaCliente(clienteIdNovo);

        const empresaVinculos = await empresaClienteModel.buscarVinculoEmpresa(clienteIdNovo, cnpjIdNovo);

        if (empresaVinculos) {
            throw new DomainError("Vínculo já existente");
        }
        
        const linhasAfetadas = await empresaClienteModel.atualizarClienteEmpresa(clienteIdNovo, cnpjIdNovo, clienteIdAntigo, cnpjIdAntigo);

        if (linhasAfetadas === 0) {
            throw new DomainError("Falha ao atualizar vínculo")
        }
        return linhasAfetadas;

    },

    async excluirVinculoClienteEmpresa(idClienteCnpj, userId) {

        const conn = await db.getConnection();

        try {

            const vinculo = await empresaClienteModel.buscarVinculoAutorizado(idClienteCnpj, userId);

            if (!vinculo) {
                throw new NotFoundError("Vinculo não encontrado");
            }

            await conn.beginTransaction();

            await processoModel.excluirGeracaoLink(idClienteCnpj, conn);
            const linhasExcluidas = await empresaClienteModel.excluirVinculoPorId(idClienteCnpj, conn);

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