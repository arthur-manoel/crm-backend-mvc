import db from '../../database/db.js';

export const documentosModel = {

  async listarPorCnpj(cnpjId, tipoDocumentoId = null) {

    let sql = `
      SELECT 
        d.*, 
        td.nome AS tipo_documento
      FROM documento d
      INNER JOIN tipo_documento td 
        ON td.id_tipo_documento = d.tipo_documento_id
      WHERE d.cnpj_id = ?
    `;

    const params = [cnpjId];

    if (tipoDocumentoId) {
      sql += " AND d.tipo_documento_id = ?";
      params.push(tipoDocumentoId);
    }

    const [rows] = await db.execute(sql, params);
    return rows;
    
  },

  async documentosSolicitados(ids) {
    
    const sql = `
          SELECT nome
          FROM tipo_documento 
          WHERE id_tipo_documento IN (${ids.map(() => '?').join(',')})
        `;

    const [rows] = await db.execute(sql, ids);
    
    return rows;

  },

  async tiposDocumento() {

    const sql = "SELECT id_tipo_documento, nome FROM tipo_documento";

    const [rows] = await db.execute(sql);

    return rows;
  }
};
