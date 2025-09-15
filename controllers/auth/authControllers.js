require("dotenv").config();

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../../Model/db");

const SECRET = process.env.SECRET;

const login =  async (req, res) => {

    const { Email, Senha } = req.body;

    const sql = "SELECT * FROM Usuario WHERE Email = ?";

    db.query(sql, [Email], async (err, result) => {

        try {
            if (err) return res.status(500).json({error: "error no servidor"});

            if (result.length === 0) return res.status(401).json({error: "Email ou senha inválidos"});

            const usuario = result[0];
            const senhaCorreta = await bcrypt.compare(Senha, usuario.Senha);

            if (!senhaCorreta) return res.status(401).json("Informações incorretas")

            const token = jwt.sign({id: usuario.idUsuario, email: usuario.Email}, SECRET, {expiresIn: "1h"});

            res.json(token);

        } catch(err) {
            return res.status(500).json({error: err.message});
        }

    });
};

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

module.exports = { login,  VerificarToken};