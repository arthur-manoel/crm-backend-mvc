import { DomainError } from "../../errors/domainError.js";
import { NotFoundError } from "../../errors/NotFoundError.js";
import { empresaClienteService } from "./empresaClienteService.js";

const empresasCliente = async (req, res) => {

    try {
        
        const { id }  = req.params;

        const empresas = await empresaClienteService.empresasCliente(id);

        return res.status(200).json(empresas);

    } catch (error) {

        if (error instanceof DomainError || error instanceof NotFoundError) {
            return res.status(error.status).json({ error: error.message });
        }

        return res.status(500).json({ error: "Erro interno" });
    }
}

const cadastrarEmpresaCliente = async (req, res) => {
    try {
    
        const { clienteId } = req.params
        const { cnpjId } = req.params;

        await empresaClienteService.cadastrarEmpresaCliente(clienteId, cnpjId);
        
        return res.status(204).send();

    } catch (error) {

        if (error instanceof DomainError || error instanceof NotFoundError) {
            return res.status(error.status).json({ error: error.message });
        }

        return res.status(500).json({ error: error.message });
    }
}

const atualizarEmpresaCliente = async (req, res) => {
    try {

        const { idVinculo, cnpjId } = req.params;
        const { clienteId } = req.body;

        await empresaClienteService.atualizarEmpresaCliente(
            idVinculo,
            clienteId,
            cnpjId
        );

        return res.status(204).send();

    } catch (error) {

        if (error instanceof DomainError || error instanceof NotFoundError) {
            return res.status(error.status).json({ error: error.message });
        }

        return res.status(500).json({ error: error.message });

    }
}

const excluirVinculoClienteEmpresa = async (req, res) => {
    try {

        const { idVinculo } = req.params;

        await empresaClienteService.excluirVinculoClienteEmpresa(idVinculo);

        return res.status(204).send();

    } catch (error) {
        if (error instanceof DomainError || error instanceof NotFoundError) {
            return res.status(error.status).json({error: error.message});
        }

        return res.status(500).json({ error: error.message });
    }
}

export { cadastrarEmpresaCliente, empresasCliente, atualizarEmpresaCliente, excluirVinculoClienteEmpresa };