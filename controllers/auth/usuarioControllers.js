const bcrypt = require("bcrypt");
const db = require("../../Model/db") 

const getAll = (req, res) => {

    const sql = "SELECT * FROM Usuario";

    db.query(sql, (err, usuarios) => {

        if (err) return res.status(500).json({error: err.message});

        res.json({data: usuarios});

    });

};

const cadastro = async (req, res) => {

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
};

module.exports = { cadastro, getAll } 