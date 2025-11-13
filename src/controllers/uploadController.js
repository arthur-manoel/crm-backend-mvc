import multer from "multer";
import path from "path";
import db from "../database/db.js";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { r2Client } from "../r2.js";
import { v4 as uuid } from "uuid";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },

  filename: (req, file, cb) => {
    const identificador = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, identificador + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB (ajuste se quiser)
});

const inserir_documentos = async (req, res) => {
  try {

    const { tipo_documento_id, cliente_id, cnpj_id, geracao_link_id } = req.body;

    const sql = "INSERT INTO documento (tipo_documento_id, cliente_id, cnpj_id, geracao_link_id) VALUES (?, ?, ?, ?)";

    const [rows] = await db.execute(sql, [tipo_documento_id, cliente_id, cnpj_id, geracao_link_id]);

    res.json(rows);

  } catch (error) {
    console.error("Erro ao inserir documento:", error);
    return res.status(500).json({ message: error.message || "Erro interno." });
  }
};


const uploadArquivos = async (req, res, next) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ message: "Arquivo não enviado (campo 'arquivo')." });
    }

    const { cliente_id } = req.params;

    const { geracao_link_id } = req.body;

    const bucket = process.env.R2_BUCKET_NAME;
    const prefix = process.env.UPLOAD_PREFIX || "uploads";

    // Gera um nome único (mantenha a extensão original se souber)
    const original = req.file.originalname || "arquivo.bin";
    const ext = original.includes(".") ? original.split(".").pop() : "";
    const key = `${prefix}/${cliente_id}/${uuid()}${ext ? "." + ext : ""}`;

    // Monta o PUT no R2
    const put = new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: req.file.buffer,
      ContentType: req.file.mimetype || "application/octet-stream",
      // Se o bucket for público por policy e você quer leitura pública:
      // ACL: "public-read"  // (R2 geralmente ignora ACL e usa bucket policy)
    });

    await r2Client.send(put);

    // URL pública, se você tiver um custom domain configurado (opcional)
    const publicBase = process.env.R2_PUBLIC_BASE_URL; // ex.: https://files.seudominio.com
    const publicUrl = publicBase ? `${publicBase}/${key}` : null;

    const sql =
      "UPDATE documento SET link = ? WHERE geracao_link_id = ?";

    const [rows] = await db.execute(sql, [
      publicUrl,
      geracao_link_id
    ]);

     return res.status(201).json({
      message: "Arquivo enviado com sucesso!",
      key,
      publicUrl,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const criarLink = async (req, res) => {
  const { link, id_cliente, id_cnpj, id_tipo_processo } = req.body;
  const cnae_id = 3282; // CNAE fixado como 3282

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
      link: linkGerado,
    });
  } catch (error) {
    console.error("Erro ao criar link:", error);
    res.status(500).json({ error: "Erro ao criar link" });
  }
};

export { uploadArquivos, criarLink, inserir_documentos };
