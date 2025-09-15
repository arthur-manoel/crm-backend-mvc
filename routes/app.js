const express = require("express");
const jwt = require("jsonwebtoken");
const db = require("../db");
const bcrypt = require("bcrypt");


const {router: authRouter, VerificarToken} = require("./auth") 

const app = express();

app.use(express.json());
app.use("/", authRouter);

app.get("/clientes", VerificarToken, (req, res) => {

    const sql = "SELECT * FROM cliente";

    db.query(sql, (err, result) => {

        if (err) return res.status(500).json({error: "Erro no servidor"});

        res.json(result)
    });
});

app.listen(3000, () => {

    console.log("Servidor rodando na porta 3000");

});

app.post("/cadastrarclientes", VerificarToken, (req, res) => {

    const { Nome, Fone, CPF } = req.body;

    const sql = "INSERT INTO cliente (Nome, Fone, CPF) VALUES(?, ?, ?)";

    db.query(sql, [Nome, Fone, CPF], (err, result) => {

        if (err) return res.status(500).json({ error:err.message });

        res.json({message: "Cliente cadastrado com sucesso!", id: result.insertId});
    })

})

app.get("/dashboard", VerificarToken, (req, res) => {

    const sql = `SELECT
                    (SELECT COUNT(*) FROM Cliente) AS totalClientes, 
                    (SELECT COUNT(*) FROM Cliente_CNPJ) AS totalCNPJS
                `;


    db.query(sql, (err, result) => {

        if (err) return res.status(500).json({error: err.message});

        const totalClientes = result[0].totalClientes;
        const totalCNPJS = result[0].totalCNPJS;

        res.json({
            totalClientes: totalClientes,
            totalCNPJS: totalCNPJS
        });
    });

});

