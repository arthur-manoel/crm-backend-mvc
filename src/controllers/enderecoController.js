import db from "../database/db.js";

const endereco = async (req, res) => {

    try {
        
        const id_endereco = req.params;

        const sql = "SELECT * FROM endereco WHERE id_endereco";

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

        res.json(rows)

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const atualizar_endereco = async (req, res) => {

    try {

        const { id_cnpj, id_cliente, cep, rua, numero, complemento, bairro, cidade, estado } = req.body;
        
        const sql = "UPDATE endereco SET id_cnpj = ?, id_cliente = ?, cep = ?, rua = ?, numero = ?, complemento = ?, bairro = ?, cidade = ?, estado = ?";

        const [rows] = await db.execute(sql, [id_cnpj, id_cliente, cep, rua, numero, complemento, bairro, cidade, estado]);

        res.json(rows)
        
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }

}

const excluir_endereco = async (req, res) => {

    try {
        
        const { id_endereco } = req.body;

        const sql = "DELETE FROM endereco WHERE id_endereco = ?";

        const [rows] = await db.execute(sql, [id_endereco]);

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

export { endereco, adicionar_endereco, atualizar_endereco, excluir_endereco };