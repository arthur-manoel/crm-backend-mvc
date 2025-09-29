import multer from "multer";
import path from "path";
import db from "../database/db.js"


const storage = multer.diskStorage({
    
    destination: (req, file, cb) => {
        
        cb(null, "uploads");
        
    },

    filename: (req, file, cb) => {
        const identificador = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, identificador + path.extname(file.originalname));
    }

    });

const upload = multer({ storage }).single("arquivo");

const uploadArquivos = (req, res, next) => {

    upload(req, res, async (err) => {

        if (err) return res.status(500).send("Erro ao enviar arquivo! " + err.message);
        if (!req.file) return res.status(400).send("Arquivo não encontrado");
        
        try {

            const link = `uploads/${req.file.filename}`;
            const { cliente_id } = req.params;

            const { tipo_documento_id, cnpj_id } = req.body;

            const sql = "INSERT INTO documento (link, tipo_documento_id, cliente_id, cnpj_id) VALUES (?, ?, ?, ?)";

            const [rows] = await db.execute(sql, [link, tipo_documento_id, cliente_id, cnpj_id]);
            
            res.send("arquivo enviado com sucesso!")

        } catch (error) {
            res.status(500).json({message: error});
        }
    });

};

export { uploadArquivos };
