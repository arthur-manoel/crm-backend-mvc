import db from "../../database/db.js";

export const uploadModel = {

  async insertDocument({
    link,
    documentTypeId,
    empresaClienteId,
    generationLinkId,
  }) {

    const sql = `
      INSERT INTO documento (
        link,
        tipo_documento_id,
        cliente_cnpj_id,
        geracao_link_id
      )
      VALUES (?, ?, ?, ?)
    `;

    const [result] = await db.execute(sql, [
      link,
      documentTypeId,
      empresaClienteId,
      generationLinkId,
    ]);

    return result.insertId;

  },

  async findGenerationLink(generationLinkId) {
    const sql = `
      SELECT id_geracao_link
      FROM geracao_link
      WHERE id_geracao_link = ?
    `;

    const [rows] = await db.execute(sql, [generationLinkId]);

    return rows[0] ?? null;
  },
};
