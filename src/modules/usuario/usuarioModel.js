import db from "../../database/db.js";

export const usuarioModel = {

    async cadastrar(dados) {

    const { name, email, phone, senhaHashed, nivel_usuario_id } = dados;
    const sql =
      "INSERT INTO usuario (nome, email, telefone, senha, nivel_usuario_id) VALUES (?, ?, ?, ?, ?)";

    const [result] = await db.execute(sql, [
      name,
      email,
      phone,
      senhaHashed,
      nivel_usuario_id,
    ]);

    return { id: result.insertId, ...dados };
    },

    async buscaEmail(email) {

      const sql = "SELECT * FROM usuario WHERE email = ? ";

      const [result] = await db.execute(sql, [email]);

      return result[0] || null
      
    },
    
    async usuarios() {

      const sql = "SELECT * FROM usuario";

      const [rows] = await db.execute(sql);

      return rows;
    }
}