import { cnaesService } from "./cnaesService.js";
import { DomainError } from "../../errors/domainError.js";
import { NotFoundError } from "../../errors/NotFoundError.js";

const listarCnaes = async (req, res) => {

    try {
    
        let { codigo, descricao, limite, offset } = req.query;

        let codigosArray = [];

        if (codigo) {
            codigosArray = Array.isArray(codigo) ? codigo : [codigo];
        }

        limite = limite ? parseInt(limite) : undefined;
        offset = offset ? parseInt(offset) : undefined;

        const cnaes = await cnaesService.cnaes(codigosArray, descricao, limite, offset);

        return res.json(cnaes);

    } catch (error) {
        if (error instanceof DomainError) {
            return res.status(error.status).json({ erro: error.message });
        }
        return res.status(500).json({ error: error.message });
    } 
};

const criarVinculo = async (req, res) => {

    try {
        
        const { cnaeId, cnpjId } = req.params;

        const novoVinculo = await cnaesService.criarVinculoCnaeCnpj(cnaeId, cnpjId);

        return res.status(201).json({ Vinculo: novoVinculo, message: "Vinculo estabelecido" });

    } catch (error) {

        if (error instanceof DomainError || error instanceof NotFoundError) {
            return res.status(error.status).json({ error: error.message });
        }

        return res.status(500).json({ error: error.message });
    }
}

const atualizarVinculo = async (req, res) => {

    try {

        const { idVinculo, cnpjId } = req.params;
        const { cnaeId } = req.body;

        await cnaesService.atualizarVinculo(idVinculo, cnaeId, cnpjId);

        return res.status(204).send();  

    } catch (error) {

        if (error instanceof DomainError || error instanceof NotFoundError) {
            return res.status(error.status).json({ error: error.message });
        }

        return res.status(500).json({ error: error.message });

    }
}

const excluirVinculo = async (req, res) => {

    try {
        const { idVinculo, cnpjId } = req.params;

        await cnaesService.excluirVinculo(idVinculo, cnpjId);

        return res.status(204).send()

    } catch (error) {

        if (error instanceof DomainError || error instanceof NotFoundError) {
            return res.status(error.status).json({ error: error.message });
        }

        return res.status(500).json({ error: "Erro Interno" })
    }

}

export { listarCnaes, criarVinculo, atualizarVinculo, excluirVinculo };
