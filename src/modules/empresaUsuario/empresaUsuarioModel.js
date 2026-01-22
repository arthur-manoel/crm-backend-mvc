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

  },

  async contarAdmins(cnpjId) {
    const sql = `
      SELECT COUNT(*) AS total
      FROM cnpj_usuario
      WHERE cnpj_id = ? AND papel = 'ADMIN'
    `;
    const [rows] = await db.execute(sql, [cnpjId]);
    return rows[0].total;
  },

  async updateVinculo(id, papel) {
    const sql = `
      UPDATE cnpj_usuario
      SET papel = ?
      WHERE id = ?
    `;
    const [rows] = await db.execute(sql, [papel, id]);
    return rows.affectedRows;
  }
};