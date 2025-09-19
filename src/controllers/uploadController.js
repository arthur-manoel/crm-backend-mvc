import multer from "multer";
import path from "path";

const uploadArquivos = (req, res, next) => {

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

    upload(req, res, (err) => {
        if (err) return res.status(500).send("Erro ao enviar arquivo! " + err.message);
        if (!req.file) return res.status(400).send("Arquivo não encontrado");
        res.send("Arquivo enviado com sucesso!");
    });

};

export { uploadArquivos };
