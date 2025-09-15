const db = require("../../Model/db");

const clientes = (req, res) => {

    const userId = req.user.id;

    const sql = "SELECT * FROM cliente WHERE Usuario_idUsuario = ?";

    db.query(sql, [userId], (err, result) => {

        if (err) return res.status(500).json({error: "Erro no servidor"});

        res.json(result)
    });
};

const cadastrarcliente = (req, res) => {

    const { Nome, Fone, CPF } = req.body;
    const userId = req.user.id;

    const sql = "INSERT INTO cliente (Nome, Fone, CPF, Usuario_idUsuario) VALUES(?, ?, ?, ?)";

    db.query(sql, [Nome, Fone, CPF, userId], (err, result) => {

        if (err) return res.status(500).json({ error:err.message });

        res.json({message: "Cliente cadastrado com sucesso!", id: result.insertId});
    })

}

const excluircliente = (req, res) => {

    const id = req.params.id;

    sql = "DELETE FROM Cliente WHERE idCliente = ?";

    db.query(sql, [id], (err, result) => {

        if (err) return res.status(500).json({error: "Erro no servidor"});

        if (result.affectedRows === 0) return res.status(404).json({error: "Cliente não encontrado"});

        res.json("Cliente excluido com sucesso!");

    });

};

const atualizarcliente = (req, res) => {

    const { Nome, Fone, CPF } = req.body;
    const { id } = req.params;
    const userId = req.user.id;

    const sql = `
        UPDATE Cliente
        SET Nome = ?, Fone = ?, CPF = ?
        WHERE idCliente = ? AND Usuario_idUsuario = ?
    `;

    db.query(sql, [Nome, Fone, CPF, id, userId], (err, result) => {

        if (err) return res.status(500).json({error: "Erro no servidor"});

        if (result.affectedRows === 0) return res.status(500).json({error: "Erro no servidor"});

        res.json("Cliente atualizado com sucesso!");

    });

};

module.exports = { clientes, cadastrarcliente, excluircliente, atualizarcliente };
