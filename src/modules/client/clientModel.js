import db from "../../database/db.js";

export const clientModel = {

    async createClient(data) {

        const { name, phone, cpf, userId, birth_date, zip_code, city, state, rg, email, house_number, address, complement, street, neighborhood } = data;

        // Inserts a new client linked to the authenticated user
        const sql = "INSERT INTO clients (name, phone, cpf, user_id, birth_date, zip_code, city, state, rg, email, house_number, address, complement, street, neighborhood) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

        const [rows] = await db.execute(sql, [
            name, 
            phone, 
            cpf, 
            userId, 
            birth_date, 
            zip_code, 
            city, 
            state, 
            rg, 
            email, 
            house_number, 
            address,
            complement,
            street,
            neighborhood,
        ]);

        return { id: rows.insertId, ...data };
    },

    async findByCPF(cpf) {
        // Used to prevent duplicated CPF
        const sql = "SELECT * FROM clients WHERE cpf = ?";

        const [rows] = await db.execute(sql, [cpf]);

        return rows[0] || null;
    },

    async findByRG(rg) {
        // Used to prevent duplicated RG
        const sql = "SELECT * FROM clients WHERE rg = ?";

        const [rows] = await db.execute(sql, [rg]);
        
        return rows[0] || null;
    },

    async findByEmail(email) {
        // Used to prevent duplicated email
        const sql = "SELECT * FROM clients WHERE email = ?";

        const [rows] = await db.execute(sql, [email]);

        return rows[0] || null;
    },

    async findById(clientId) {
        // Checks if client exists
        const sql = "SELECT id FROM clients WHERE id = ?";

        const [rows] = await db.execute(sql, [clientId]);

        return rows[0] || null;
    },

    async listByUser(userId) {
        // Lists only clients owned by the user
        const sql = `
        SELECT
            id,
            name,
            phone
        FROM clients
        WHERE user_id = ?
        ORDER BY name ASC;
        `;

        const [rows] = await db.execute(sql, [userId]);

        return rows;
    },

    async updateClient(data) {

        const { name, phone, cpf, userId, birth_date, zip_code, city, state, rg, email, house_number, address, complement, street, neighborhood, id } = data;
        
        // Updates client only if it belongs to the user
        const sql = `
            UPDATE clients
            SET name = ?, phone = ?, cpf = ?, birth_date = ?, zip_code = ?, city = ?, state = ?, rg = ?, email = ?, house_number = ?, address = ?, complement = ?, street = ?, neighborhood = ?
            WHERE id = ? AND user_id = ?
        `;

        const [rows] = await db.execute(sql, [
            name, phone, cpf, birth_date, zip_code, city, state, rg,
            email, house_number, address, complement, street, neighborhood,
            id, userId
        ]);

        return rows.affectedRows;
    },

    async deleteClient(clientId, userId) {
        // Hard delete restricted to owner
        const sql = "DELETE FROM clients WHERE id = ? AND user_id = ?";

        const [rows] = await db.execute(sql, [clientId, userId]);

        return rows.affectedRows;
    }

}
