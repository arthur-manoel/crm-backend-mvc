import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const SECRET = process.env.SECRET;

if (!SECRET) {
    throw new Error("O secret/variável de ambiente obrigatório 'SECRET' não foi definido.")
}

export function gerarToken(payload) {
    
    return jwt.sign(payload, SECRET, {
        expiresIn: "30d"
    });
}