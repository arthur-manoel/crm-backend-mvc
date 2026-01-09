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
    
        const { id } = req.params
        const { cnpjId } = req.body;

        await empresaClienteService.cadastrarEmpresaCliente(id, cnpjId);
        
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
        
        const { clienteIdNovo, cnpjIdNovo, clienteIdAntigo, cnpjIdAntigo } = req.body;

        await empresaClienteService.atualizarEmpresaCliente(clienteIdNovo, cnpjIdNovo, clienteIdAntigo, cnpjIdAntigo);

        return res.status(204).send();

    } catch (error) {

        if (error instanceof DomainError || error instanceof NotFoundError) {
            return res.status(error.status).json({ error: error.message });
        }

        return res.status(500).json({ error: error.message });

    }
}

export { cadastrarEmpresaCliente, empresasCliente, atualizarEmpresaCliente };