require("dotenv").config({ path: __dirname + "/../.env" });

const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../db");


const router = express.Router();

const SECRET = process.env.SECRET;

router.post("/cadastro", async (req, res) => {

    const { Nome, Email, Senha } = req.body;
    
    try {

    const senhaHashed = await bcrypt.hash(Senha, 10);

    const sql = "INSERT INTO Usuario (Nome, Email, Senha) VALUES (?, ?, ?)";


    db.query(sql, [Nome, Email, senhaHashed ], (err, result) => {

        if (err) {

            if (err.code === "ER_DUP_ENTRY") {
                return res.status(500).json({error: "Email já cadastrado"});
            }
            
            return res.status(500).json({error: err.message});

        }

        res.json({message: "Cliente cadastrado o com sucesso !", id: result.insertId});
        
    });
    } catch (err) {

        res.status(500).json({error: err.message})

    }
});

router.post("/login", async (req, res) => {

    const { Email, Senha } = req.body;

    const sql = "SELECT * FROM Usuario WHERE Email = ?";

    db.query(sql, [Email], async (err, result) => {

        try {
            if (err) return res.status(500).json("Credenciais inválidas");

            if (result.length === 0) return res.json("Informações incorretas.");

            const usuario = result[0];
            const senhaCorreta = await bcrypt.compare(Senha, usuario.Senha);

            if (!senhaCorreta) return res.status(401).json("Informações incorretas")

            const token = jwt.sign({id: usuario.idUsuario, email: usuario.Email}, SECRET, {expiresIn: "1h"});

            res.json(token);

        } catch(err) {
            return res.status(500).json({error: err.message});
        }

    });
});

function VerificarToken(req, res, next) {

    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return res.status(401).json({error: "Token não fornecido"});

    jwt.verify(token, SECRET, (err, result) => {

        if (err) return res.status(403).json({error: "Token inválido"});
        
        req.user = result;

        next();

    });

};

module.exports = { router, VerificarToken };