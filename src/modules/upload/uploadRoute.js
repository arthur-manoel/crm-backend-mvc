import express from 'express';
import { verifyToken } from '../../middlewares/tokenVerify.js';
import { insertDocument } from './uploadController.js';
import { validateParams } from '../../middlewares/validateParams.js';
import { validateBody } from '../../middlewares/validateBody.js';
import { uploadBodySchema, uploadParamsSchema } from './upload.schema.js';
import multer from 'multer';

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 50MB (ajuste se quiser)
});

const router = express.Router();

router.post("/upload/documentos/:empresaClienteId",
    verifyToken,
    validateParams(uploadParamsSchema),
    upload.single("arquivo"),
    validateBody(uploadBodySchema),
    insertDocument
);

export default router;