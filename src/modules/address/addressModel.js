import db from "../../database/db.js";

export const addressModel = {

  async findById(addressId) {

    const sql = "SELECT * FROM addresses WHERE id = ?";

    const [rows] = await db.execute(sql, [addressId]);
    return rows[0] || null;
  },

  async findAddress(companyId, clientId) {

    const sql = `
      SELECT *
      FROM addresses
      WHERE client_id = ?
      AND company_id = ?
    `;

    const [rows] = await db.execute(sql, [clientId, companyId]);
    return rows[0] || null;
  },

  async findLink(clientId, companyId) {

    const sql = `
      SELECT id
      FROM client_companies
      WHERE client_id = ? AND company_id = ?
    `;

    const [rows] = await db.execute(sql, [clientId, companyId]);
    return rows[0] || null;
  },

  async createAddress(companyId, clientId, zipCode, street, number, complement, neighborhood, city, state) {

    const sql = `
      INSERT INTO addresses
      (company_id, client_id, zip_code, street, number, complement, neighborhood, city, state)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    const [rows] = await db.execute(sql, [
      companyId,
      clientId,
      zipCode,
      street,
      number,
      complement,
      neighborhood,
      city,
      state
    ]);

    return {
      id: rows.insertId,
      company_id: companyId,
      client_id: clientId,
      zip_code: zipCode,
      street,
      number,
      complement,
      neighborhood,
      city,
      state
    };
  },

  async validateAddress(addressId, clientId, companyId) {

    const sql = `
      SELECT *
      FROM addresses
      WHERE id = ?
      AND client_id = ?
      AND company_id = ?
    `;

    const [rows] = await db.execute(sql, [addressId, clientId, companyId]);
    return rows[0] || null;
  },

  async validateDuplicate(addressId, companyId, zipCode, street, number, complement, neighborhood, city, state) {

    const sql = `
      SELECT id
      FROM addresses
      WHERE id != ?
        AND company_id = ?
        AND zip_code = ?
        AND street = ?
        AND number = ?
        AND complement <=> ?
        AND neighborhood = ?
        AND city = ?
        AND state = ?
    `;

    const [rows] = await db.execute(sql, [
      addressId,
      companyId,
      zipCode,
      street,
      number,
      complement,
      neighborhood,
      city,
      state
    ]);
    return rows[0] || null;
  },

  async updateAddress(addressId, fields) {

    const sets = [];
    const values = [];

    for (const [key, value] of Object.entries(fields)) {
      sets.push(`${key} = ?`);
      values.push(value);
    }

    if (sets.length === 0) return 0;

    const sql = `
      UPDATE addresses
      SET ${sets.join(", ")}
      WHERE id = ?
    `;

    values.push(addressId);

    const [rows] = await db.execute(sql, values);
    return rows.affectedRows;
  },

  async deleteAddressById(addressId) {

    const sql = "DELETE FROM addresses WHERE id = ?";

    const [rows] = await db.execute(sql, [addressId]);
    return rows.affectedRows;
  },

  async deleteByCompany(companyId, conn) {

    const sql = "DELETE FROM addresses WHERE company_id = ?";

    const [rows] = await conn.execute(sql, [companyId]);
    return rows.affectedRows;
  }
};
