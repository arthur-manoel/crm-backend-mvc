import { DomainError } from "../../errors/DomainError.js";
import { cnaesModel } from "./cnaesModel.js"
import { empresaService } from "../empresa/empresaService.js";
import { NotFoundError } from "../../errors/NotFoundError.js";

export const cnaesService = {

    async cnaes(codigosArray, descricao, limite, offset) {

        const { invalidos } = await cnaesModel.validarCodigos(codigosArray);

        if (invalidos.length > 0) {
            throw new DomainError("Código inválido");
        }

        const cnaes = await cnaesModel.cnaes(codigosArray, descricao, limite, offset);

        return cnaes;

    },

    async criarVinculoCnaeCnpj(cnaeId, cnpjId) {

        const vinculo = await cnaesModel.buscarVinculoPorId(cnaeId, cnpjId);

        if (vinculo) {
            throw new DomainError("Vinculo já estabelecido");
         }
         
         const existeEmpresa = await empresaService.validarExistenciaEmpresa(cnpjId);
         
         if (!existeEmpresa) {
             throw new NotFoundError("Empresa não encontrada");
            }
            
            const existeCnae = await cnaesModel.buscarCnaePorId(cnaeId);
        
        if (!existeCnae) {
            throw new NotFoundError("Cnae não encontrado");
        }
        
        const novaEmpresa = await cnaesModel.criarVinculo(cnaeId, cnpjId);
        
        return {
            id: novaEmpresa,
            cnaeId,
            cnpjId
        };
        
    },
    
    async atualizarVinculo(idVinculo, cnaeId, cnpjId) {
        
        const vinculoAtual = await cnaesModel.buscarVinculo(idVinculo);

        if (!vinculoAtual) {
            throw new NotFoundError("Vinculo não encontrado")
        }
        
        if (vinculoAtual.cnpj_id !== cnpjId) {
            throw new DomainError("Vínculo não pertence a esta empresa");
        }

           const existeCnae = await cnaesModel.buscarCnaePorId(cnaeId);
        
        if (!existeCnae) {
           throw new NotFoundError("Cnae não encontrado");
        }

        const duplicidade = await cnaesModel.buscarVinculoPorId(cnaeId, cnpjId, idVinculo);
        
        if (duplicidade) {
            throw new DomainError("Vinculo já estabelecido");
        }
        

        const affectedRows = await cnaesModel.atualizarVinculo(cnaeId, idVinculo);

        return affectedRows;

    },

    async excluirVinculo(idVinculo, cnpjId) {

        const vinculo = await cnaesModel.buscarVinculo(idVinculo);

        if (!vinculo) {
            throw new NotFoundError("Vinculo não encontradao");
        }

        if (vinculo.cnpj_id !== cnpjId) {
            throw new DomainError("Vinculo não pertence a essa empresa")
        }

        const excluirVinculo = await cnaesModel.excluirVinculo(idVinculo);

        return excluirVinculo;

    }
    
}