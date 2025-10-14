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

const criarLink = async (req, res) => {
  const { link, id_cliente, id_cnpj, id_tipo_processo } = req.body;
  const cnae_id = 3282;  // CNAE fixado como 3282

  try {
    // Verificar se o CNPJ existe
    const [clienteCnpjResult] = await db.execute(
      "SELECT id_cliente_cnpj FROM cliente_cnpj WHERE cnpj_id = ? LIMIT 1",
      [id_cnpj]
    );

    if (!clienteCnpjResult.length) {
      return res.status(400).json({ error: "CNPJ não encontrado" });
    }

    const id_cliente_cnpj = clienteCnpjResult[0].id_cliente_cnpj;

    // Gerar o link (já fornecido diretamente como parâmetro)
    const linkGerado = link;

    // Inserir o link gerado na tabela `geracao_link`
    const [linkResult] = await db.execute(
      `INSERT INTO geracao_link (link, tipo_link_id, cliente_id, cliente_cnpj_id, cnae_id)
       VALUES (?, 1, ?, ?, ?)`,
      [linkGerado, id_cliente, id_cliente_cnpj, cnae_id]
    );

    const geracao_link_id = linkResult.insertId;

    // Inserir na tabela `processo` (relacionando o link gerado com o processo)
    await db.execute(
      `INSERT INTO processo (id_cliente, id_cnpj, id_tipo_processo, data_atualizacao, geracao_link_id)
       VALUES (?, ?, ?, NOW(), ?)`,
      [id_cliente, id_cnpj, id_tipo_processo, geracao_link_id]
    );

    res.status(201).json({
      message: "Link gerado com sucesso!",
      link: linkGerado
    });
    
  } catch (error) {
    console.error("Erro ao criar link:", error);
    res.status(500).json({ error: "Erro ao criar link" });
  }
};


export { uploadArquivos, criarLink };
