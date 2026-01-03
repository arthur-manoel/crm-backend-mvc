import bcrypt from "bcrypt";
import db from "../database/db.js";

const usuarios = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM usuario");
    res.json({ data: rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export { usuarios };
