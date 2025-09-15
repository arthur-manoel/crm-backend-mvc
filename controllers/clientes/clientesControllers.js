const db = require("../../Model/db");

const clientes = (req, res) => {

    const userId = req.user.id;

    const sql = "SELECT * FROM cliente WHERE Usuario_idUsuario = ?";

    db.query(sql, [userId], (err, result) => {

        if (err) return res.status(500).json({error: "Erro no servidor"});

        res.json(result)
    });
};

const cadastrarclientes = (req, res) => {

    const { Nome, Fone, CPF } = req.body;
    const userId = req.user.id;

    const sql = "INSERT INTO cliente (Nome, Fone, CPF, Usuario_idUsuario) VALUES(?, ?, ?, ?)";

    db.query(sql, [Nome, Fone, CPF, userId], (err, result) => {

        if (err) return res.status(500).json({ error:err.message });

        res.json({message: "Cliente cadastrado com sucesso!", id: result.insertId});
    })

}

module.exports = { clientes, cadastrarclientes };