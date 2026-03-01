import { DomainError } from "../../errors/DomainError.js";
import { linkModel } from "./linkModel.js";
import db from "../../database/db.js";

export const linkService = {
  async getAllByClientCompany(clientCompanyId, linkId) {
    return linkModel.findAllByClientCompany(clientCompanyId, linkId);
  },

  async createLink({ clientCompanyId, linkTypeId, status }) {
    const conn = await db.getConnection();

    try {

      const validType = await linkModel.validateLinkType(linkTypeId);
      if (!validType) {
        throw new DomainError("Invalid link type");
      }

      // calcula expiração (1 mês por padrão)
      const expiresAt = new Date();
      expiresAt.setMonth(expiresAt.getMonth() + 1);
      const formattedExpiresAt = expiresAt.toISOString().slice(0, 19).replace("T", " ");

      await conn.beginTransaction();

      const linkResult = await linkModel.createGeneratedLink(
        clientCompanyId,
        formattedExpiresAt,
        linkTypeId,
        conn
      );

      const generatedLinkId = linkResult.insertId;

      await linkModel.createLinkStatus(status, generatedLinkId, conn);

      await conn.commit();

      return {
        linkId: generatedLinkId,
        expiresAt: formattedExpiresAt
      };
    } catch (err) {
      await conn.rollback();
      throw err;
    } finally {
      conn.release();
    }
  }
};