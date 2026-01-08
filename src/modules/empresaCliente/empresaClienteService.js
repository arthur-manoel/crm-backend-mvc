import { DomainError } from "../../errors/domainError.js";
import  { empresaClienteModel } from "./empresaClienteModel.js";
import { empresaService } from "../empresa/empresaService.js";
import { clienteService } from "../cliente/clienteService.js";

export const empresaClienteService = {

    async cadastrarEmpresaCliente(clienteId, cnpjId) {

        await empresaService.validarExistenciaEmpresa(cnpjId);
        await clienteService.validarExistenciaCliente(clienteId);
    
        const empresaVinculos = await empresaClienteModel.buscarVinculoEmpresa(clienteId, cnpjId);

        if (empresaVinculos) {
            throw new DomainError("Vinculo já existente");
        }

        const novoVinculo = await empresaClienteModel.criarEmpresaCliente(clienteId, cnpjId);

    }
    
}