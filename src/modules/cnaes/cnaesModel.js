import db from "../../database/db.js";

export const cnaeModel = {

  async validateCodes(codes) {
    if (!codes || codes.length === 0) return { invalidCodes: [] };

    const placeholders = codes.map(() => "?").join(",");
    const sql = `SELECT code FROM cnaes WHERE code IN (${placeholders})`;

    const [rows] = await db.execute(sql, codes);

    const validCodes = rows.map(r => r.number);
    const invalidCodes = codes.filter(c => !validCodes.includes(c));

    return { invalidCodes };
  },

  async find(codes = [], description, limit, offset) {
    let sql = "SELECT * FROM cnaes WHERE 1=1";
    const params = [];

    if (codes.length) {
      const placeholders = codes.map(() => "?").join(",");
      sql += ` AND code IN (${placeholders})`;
      params.push(...codes);
    }

    if (description) {
      sql += " AND LOWER(name) LIKE ?";
      params.push(`%${description.toLowerCase()}%`);
    }

    if (limit !== undefined) {
      sql += " LIMIT ?";
      params.push(limit);
    }

    if (offset !== undefined) {
      sql += " OFFSET ?";
      params.push(offset);
    }

    const [rows] = await db.execute(sql, params);
    return rows;
  },

  async findLinkById(linkId) {
    const sql = `
      SELECT id, company_id
      FROM company_cnaes
      WHERE id = ?
    `;

    const [rows] = await db.execute(sql, [linkId]);
    return rows[0] || null;
  },

  async findLink(cnaeId, companyId, ignoreId = null) {
    let sql = `
      SELECT id
      FROM company_cnaes
      WHERE cnae_id = ? AND company_id = ?
    `;
    const params = [cnaeId, companyId];

    if (ignoreId) {
      sql += " AND id != ?";
      params.push(ignoreId);
    }

    const [rows] = await db.execute(sql, params);
    return rows[0] || null;
  },

  async findById(cnaeId) {
    const sql = "SELECT id FROM cnaes WHERE id = ?";
    const [rows] = await db.execute(sql, [cnaeId]);
    return rows[0] || null;
  },

  async createLink(cnaeId, companyId) {
    const sql = `
      INSERT INTO company_cnaes (cnae_id, company_id)
      VALUES (?, ?)
    `;

    const [result] = await db.execute(sql, [cnaeId, companyId]);
    return result.insertId;
  },

  async updateLink(cnaeId, linkId) {
    const sql = `
      UPDATE company_cnaes
      SET cnae_id = ?
      WHERE id = ?
    `;

    const [result] = await db.execute(sql, [cnaeId, linkId]);
    return result.affectedRows;
  },

  async deleteLink(linkId) {
    const sql = `
      DELETE FROM company_cnaes
      WHERE id = ?
    `;

    const [result] = await db.execute(sql, [linkId]);
    return result.affectedRows;
  }

};
