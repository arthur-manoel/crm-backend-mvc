import { DomainError } from "../../errors/DomainError.js";
import { NotFoundError } from "../../errors/NotFoundError.js";
import { uploadModel } from "./uploadModel.js";
import { companyClientModel } from "../companyClient/companyClientModel.js";
import { r2Client } from "../../r2.js";
import { v4 as uuid } from "uuid";
import { PutObjectCommand } from "@aws-sdk/client-s3";

export const uploadService = {

  async insertDocument({
    file,
    documentTypeId,
    clientCompanyId,
    generatedLinkId,
  }) {

    
    const link =
    await companyClientModel.findById(clientCompanyId); 
    
    if (!link) {
      throw new NotFoundError("Client-company link not found.");
    }
    
    const generatedLink =
    await uploadModel.findGeneratedLink(generatedLinkId);
    
    if (!generatedLink) {
      throw new DomainError("Invalid generated link process.");
    }
    
    const bucket = process.env.R2_BUCKET_NAME;
    const prefix = process.env.UPLOAD_PREFIX || "uploads";
    console.log(clientCompanyId, documentTypeId, generatedLinkId)

    const ext = file.originalname?.includes(".")
      ? "." + file.originalname.split(".").pop()
      : "";
      
      const key = `${prefix}/${clientCompanyId}/${uuid()}${ext}`;
      
      await r2Client.send(
        new PutObjectCommand({
          Bucket: bucket,
          Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      })
    );
    
    const publicUrl = `${process.env.R2_PUBLIC_BASE_URL}/${key}`;
    
    const documentId = await uploadModel.insertDocument({
      link: publicUrl,
        documentTypeId,
        clientCompanyId,
        generatedLinkId,
      });
      
      return { documentId };
    },
  };
  