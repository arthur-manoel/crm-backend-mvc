import db from "../database/db.js";

const endereco = async (req, res) => {

    try {
        
        const id_endereco = req.params;

        const sql = "SELECT * FROM endereco WHERE id_endereco = ?";

        const [rows] = await db.execute(sql, [id_endereco]);

        res.json(rows)

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }

}

const adicionar_endereco = async (req, res) => {

    try {
    
        const { id_cnpj, id_cliente, cep, rua, numero,	complemento, bairro, cidade, estado } = req.body;

        const sql = "INSERT INTO endereco (id_cnpj, id_cliente, cep, rua, numero, complemento, bairro, cidade, estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    
        const [rows] = await db.execute(sql, [id_cnpj, id_cliente, cep, rua, numero, complemento, bairro, cidade, estado]);

        res.json({
            message: "Endereço adicionado com sucesso",
            id_endereco: rows.insertId
        });

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const adicionar_endereco_vazio = async (req, res) => {

    try {
    
        const { id_cnpj, id_cliente } = req.body;

        const sql = "INSERT INTO endereco (id_cnpj, id_cliente) VALUES (?, ?)";
    
        const [rows] = await db.execute(sql, [id_cnpj, id_cliente]);

        res.json({
            message: "Endereço adicionado com sucesso",
            id_endereco: rows.insertId
        });

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const atualizar_endereco_cliente = async (req, res) => {

    try {

        const { id_endereco, id_cliente } = req.body;

        const sql = `UPDATE endereco e
                    JOIN cliente c ON e.id_cliente = c.id_cliente
                    SET 
                        e.cep = c.cep,
                        e.rua = c.rua,
                        e.cidade = c.cidade,
                        e.estado = c.estado,
                        e.numero = c.numero_casa,
                        e.complemento = c.complemento,
                        e.bairro = c.bairro
                    WHERE e.id_cliente = c.id_cliente
                        AND e.id_endereco = ?
                        AND c.id_cliente = ?
`;
        const [rows] = await db.execute(sql, [id_endereco, id_cliente]);

        res.json({message: "Empresa atualizada com sucesso!"})

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }

}

const atualizar_endereco = async (req, res) => {

    try {

        const { id_endereco, id_cnpj, id_cliente, cep, rua, numero, complemento, bairro, cidade, estado } = req.body;
        
        const sql = "UPDATE endereco SET id_cnpj = ?, id_cliente = ?, cep = ?, rua = ?, numero = ?, complemento = ?, bairro = ?, cidade = ?, estado = ? WHERE id_endereco = ?";

        const [rows] = await db.execute(sql, [id_cnpj, id_cliente, cep, rua, numero, complemento, bairro, cidade, estado, id_endereco]);

        res.json(rows)
        
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }

}

const excluir_endereco = async (req, res) => {

    try {
        
        const { id } = req.params;

        const sql = "DELETE FROM endereco WHERE id_endereco = ?";

        const [rows] = await db.execute(sql, [id]);

        res.json({ message: "Endereço excluído com sucesso" });

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

export { endereco, adicionar_endereco, adicionar_endereco_vazio, atualizar_endereco_cliente ,atualizar_endereco, excluir_endereco };