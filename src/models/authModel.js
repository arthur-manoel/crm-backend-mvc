import db from "../database/db.js";

export const authModel = {

    async buscarporemail(email) {

          const sql = `
        SELECT 
           u.id_usuario AS id,
            u.email,
            u.nome,
            n.nome AS role,
            u.senha
        FROM usuario u
        JOIN nivel_usuario n ON u.nivel_usuario_id = n.id_nivel_usuario 
        WHERE u.email = ?
  `;

        const [rows] = await db.execute(sql, [email]);
        
        return rows[0] || null;
    }

}