import db from "../../database/db.js";

export const empresaUsuarioModel = {
  async criarVinculo({ usuarioId, cnpjId, papel }) {

    const sql = `
      INSERT INTO cnpj_usuario (usuario_id, cnpj_id, papel)
      VALUES (?, ?, ?)
    `;

    const [result] = await db.execute(sql, [usuarioId, cnpjId, papel]);
    return result.insertId;

  },

  async buscarPapel(usuarioId, cnpjId) {

    const sql = `
      SELECT papel
      FROM cnpj_usuario
      WHERE usuario_id = ? AND cnpj_id = ?
    `;

    const [rows] = await db.execute(sql, [usuarioId, cnpjId]);
    return rows[0] || null;

  }
};