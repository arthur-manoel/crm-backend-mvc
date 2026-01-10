import db from "../../database/db.js";

export const cnaesModel = {

    async validarCodigos(codigosArray) {
        
        if (!codigosArray.length) return { invalidos: [] };
        
        const placeholders = codigosArray.map(() => "?").join(",");
        const sql = `SELECT numero FROM cnae WHERE numero IN (${placeholders})`;
            
        const [rows] = await db.execute(sql, codigosArray);

        const validos = rows.map(r => r.numero);
        const invalidos = codigosArray.filter(c => !validos.includes(c));

        return { invalidos };
    },

    async cnaes(codigosArray, descricao, limite, offset) {

        let params = []
        let sql = "SELECT * FROM cnae WHERE 1=1";

        if (codigosArray.length) {

            const placeholder = codigosArray.map(() => "?").join(",");

            sql += ` AND numero IN (${placeholder})`;
            params.push(...codigosArray);
        }

        if (descricao) {
            sql += " AND nome LIKE ?";
            params.push(`%${descricao.toLowerCase()}%`);
        }

        if (limite) {
            sql += " LIMIT ?";
            params.push(limite);
        }

        if (offset) {
            sql += " OFFSET ?";
            params.push(offset);
        }

        const [rows] = await db.execute(sql, params);

        return rows;

    }

}