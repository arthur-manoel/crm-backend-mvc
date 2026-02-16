import express from 'express';
import { verifyToken } from '../../middlewares/tokenVerify.js';
import { insertDocument } from './uploadController.js';
import { validateParams } from '../../middlewares/validateParams.js';
import { validateBody } from '../../middlewares/validateBody.js';
import { uploadBodySchema, uploadParamsSchema } from './upload.schema.js';
import multer from 'multer';

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, //50mb
});

const router = express.Router();

router.post("/upload/documents/:clientCompanyId",
    verifyToken,
    validateParams(uploadParamsSchema),
    upload.single("file"),
    validateBody(uploadBodySchema),
    insertDocument
);

export default router;
