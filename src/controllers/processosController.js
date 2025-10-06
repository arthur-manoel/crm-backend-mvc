import db from "../database/db.js";

const processos = async (req, res) => {

    try {
        
        const sql = "SELECT * FROM processo";
        const [rows] = await db.execute(sql);

        res.json(rows);

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const processo = async (req, res) => {

    try {
        
        const { id } = req.params;

        const sql = "SELECT * FROM processo WHERE id_processo = ?";
        const [rows] = await db.execute(sql, [id]);

        res.json(rows);
   
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const abrirprocesso = async (req, res) => {

    try {
        
        const { id_cliente, id_cnpj, id_tipo_processo } = req.body;

        //pegar data
        const sql = "INSERT INTO processo (id_cliente, id_cnpj, id_tipo_processo) VALUES (?, ?, ?)";
        await db.execute(sql, [id_cliente, id_cnpj, id_tipo_processo]);

        res.json({ message: "processo cadastrado com sucesso" });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }

}

const excluirprocesso = async (req, res) => {

    try {
        
        const { id } = req.params;

        const sql = "DELETE FROM processo WHERE id_processo = ?";
        await db.execute(sql, [id]);

        res.json({ message: "Processo excluido com sucesso" })

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }

}

const atualizarprocesso = async (req, res) => {

  try {
    
    const { id } = req.params;
    const { id_cliente, id_cnpj, id_tipo_processo } = req.body;

    const sql = "UPDATE processo SET id_cliente = ?, id_cnpj = ?, id_tipo_processo = ? WHERE id_processo = ?";
    await db.execute(sql, [id_cliente, id_cnpj, id_tipo_processo, id]);

    res.json({ message: "Processo atualizado com sucesso" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export { processos, processo, abrirprocesso, atualizarprocesso, excluirprocesso };