import { DomainError } from "../../errors/DomainError.js";
import { companyClientModel } from "../companyClient/companyClientModel.js";
import { processModel } from "./processModel.js";
import db from "../../database/db.js";

export const processService = {

  async getAllByCompany(companyId, processId) {
    return processModel.findAllByCompany(companyId, processId);
  },

  async createProcess({ clientId, companyId, processTypeId, status }) {
    const conn = await db.getConnection();

    try {

        const clientCompany = await companyClientModel.findByClientAndCompany(
            clientId,
            companyId
        );

        if (!clientCompany) {
            throw new DomainError("Company is not linked to this client");
        }

        const validType = await processModel.validateProcessType(processTypeId);

        if (!validType) {
            throw new DomainError("Invalid process type");
        }

        const clientCompanyId = clientCompany.id;
        const generatedLink = `https://facilita-compet.vercel.app/${clientId}`;

        const expiresAt = new Date();

        expiresAt.setMonth(expiresAt.getMonth() + 1);
        const formattedExpiresAt = expiresAt
            .toISOString()
            .slice(0, 19)
            .replace("T", " ");

        await conn.beginTransaction();

        const linkResult = await processModel.createGeneratedLink(
            generatedLink,
            clientId,
            clientCompanyId,
            formattedExpiresAt,
            processTypeId,
            conn
        );

        const generatedLinkId = linkResult.insertId;

        await processModel.createLinkStatus(status, generatedLinkId, conn);

        const processResult = await processModel.createProcess({
            clientId,
            companyId,
            processTypeId,
            generatedLinkId,
            conn
        });

        await conn.commit();

        return {
            processId: processResult.insertId,
            link: generatedLink,
            expiresAt: formattedExpiresAt
        };

    } catch (error) {
        await conn.rollback();
        throw error;
    } finally {
        conn.release();
    }
  }
};
