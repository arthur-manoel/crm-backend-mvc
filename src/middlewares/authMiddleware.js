import dotenv from "dotenv";

dotenv.config();

const SECRET = process.env.SECRET;

export const authMiddleware = {
    

    VerificarToken(req, res, next) {

    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ error: "Token não fornecido" });
    }

    jwt.verify(token, SECRET, (err, decoded) => {
        if (err) {
        return res.status(401).json({ error: "Token inválido ou expirado" });
    }

    req.user = decoded;

    const newToken = jwt.sign({ id: decoded.id }, SECRET, {
        expiresIn: "1h",
        });

    res.setHeader("Authorization", "Bearer " + newToken);


    next()

    });
    },
    
}