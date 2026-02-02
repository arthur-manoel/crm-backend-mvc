import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const SECRET = process.env.SECRET;

if (!SECRET) {
    throw new Error("Required environment variable 'SECRET' is not defined.");
}

// Generate a JWT for the given payload. Token expiration: 30 days.
export function generateToken(payload) {
    
    return jwt.sign(payload, SECRET, {
        expiresIn: "30d"
    });
}
