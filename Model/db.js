const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "102066",
    database: "projetoeverton"
})

db.connect((err) => {

    if (err) {
        console.error("Erro ao se conectar", err);
    };

    console.log("Banco de dados conectado");
});

module.exports = db;