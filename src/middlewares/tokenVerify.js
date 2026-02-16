import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const SECRET = process.env.SECRET;


export function verifyToken(req, res, next) {

    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ error: "Token not provided" });
    }

    try {

    req.user = jwt.verify(token, SECRET);
    next();

  } catch {
    return res.status(401).json({ error: "Invalid or expired token" });
  }

}
