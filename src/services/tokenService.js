import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const SECRET = process.env.SECRET;

export function gerarToken(payload) {
    
    return jwt.sign(payload, SECRET, {
        expiresIn: "30d"
    });
}