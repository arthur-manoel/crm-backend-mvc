import { cnaesService } from "./cnaesService.js";
import { DomainError } from "../../errors/domainError.js";

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
            return res.status(400).json({ erro: error.message });
        }
        return res.status(500).json({ erro: "Erro interno do servidor" });
    }
};

export { listarCnaes };
