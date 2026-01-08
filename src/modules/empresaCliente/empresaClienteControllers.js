import { DomainError } from "../../errors/domainError.js";
import { NotFoundError } from "../../errors/NotFoundError.js";
import { empresaClienteService } from "./empresaClienteService.js";

const cadastrarEmpresaCliente = async (req, res) => {
    try {
    
        const { id } = req.params
        const { cnpj_id } = req.body;

        await empresaClienteService.cadastrarEmpresaCliente(id, cnpj_id);
        
        return res.status(204).send();

    } catch (error) {

        if (error instanceof DomainError || error instanceof NotFoundError) {
            return res.status(error.status).json({ error: error.message });
        }

        return res.status(500).json({ error: error.message });
    }
}

export { cadastrarEmpresaCliente };