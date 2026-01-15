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

    },

    async buscarVinculo(idVinculo) {

        const [rows] = await db.execute("SELECT id_cnpj_cnae FROM cnpj_cnae WHERE id_cnpj_cnae = ?", [idVinculo]);

        return rows[0] || null;
    },

    async buscarVinculoPorId(cnaeId, cnpjId, idIgnorar = null) {

        let sql = "SELECT id_cnpj_cnae FROM cnpj_cnae WHERE cnae_id = ? AND cnpj_id = ?";

        const params = [cnaeId, cnpjId];

        if (idIgnorar) {
            sql += " AND id_cnpj_cnae != ?";
            params.push(idIgnorar);
        }
        
        const [rows] = await db.execute(sql, params);

        return rows[0] || null;
    },

    async buscarCnaePorId(cnaeId) {

        const sql = "SELECT id_cnae FROM cnae WHERE id_cnae = ?";

        const [rows] = await db.execute(sql, [cnaeId]);

        return rows[0] || null;
    },

    async criarVinculo(cnaeId, cnpjId) {

        const sql = "INSERT INTO cnpj_cnae (cnae_id, cnpj_id) VALUES (?, ?)";

        const [rows] = await db.execute(sql, [cnaeId, cnpjId]);

        return rows.insertId;
    },


    async atualizarVinculo(cnaeId, idVinculo) {

        const sql = "UPDATE cnpj_cnae SET cnae_id = ? WHERE id_cnpj_cnae = ?";

        const [rows] = await db.execute(sql, [cnaeId, idVinculo]);

        return rows.affectedRows;
    }

}