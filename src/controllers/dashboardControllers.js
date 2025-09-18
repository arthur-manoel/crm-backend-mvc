import db from "../database/db.js";

const dashboard = (req, res) => {
    const sql = `
        SELECT
            (SELECT COUNT(*) FROM Cliente) AS totalClientes, 
            (SELECT COUNT(*) FROM Cliente_CNPJ) AS totalCNPJS
    `;

    db.query(sql, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        const totalClientes = result[0].totalClientes;
        const totalCNPJS = result[0].totalCNPJS;

        res.json({
            totalClientes,
            totalCNPJS
        });
    });
};

export default dashboard;
