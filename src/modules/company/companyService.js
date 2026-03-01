import { DomainError } from "../../errors/DomainError.js";
import { NotFoundError } from "../../errors/NotFoundError.js";
import { companyModel } from "./companyModel.js";
import db from "../../database/db.js";

import { companyUserModel } from "../companyUser/companyUserModel.js";
import { companyClientModel } from "../companyClient/companyClientModel.js";
import { cnaeModel } from "../cnaes/cnaesModel.js"; 
import { addressModel } from "../address/addressModel.js";

export const companyService = {
    
    async validateDuplicateCnpj({ cnpj, currentId = null }) {

        const existingCompany = await companyModel.findByCnpj(cnpj);

        // Prevents duplicate CNPJ on create or update
        if (existingCompany && existingCompany.id !== Number(currentId)) {
            throw new DomainError("CNPJ already registered");
        }
    },

    async validateCompanyExists(companyId) {

        const company = await companyModel.findById(companyId);

        if (!company) {
            throw new NotFoundError("Company not found");
        }

        return company;
    },

    async createCompany(name, cnpj, createdAt, activityDescription, userId) {

        await this.validateDuplicateCnpj({ cnpj });

        const newCompany = await companyModel.createCompany(
            name,
            cnpj,
            createdAt,
            activityDescription
        );

        // Creator is automatically assigned as ADMIN
        await companyUserModel.createLink({
            userId,
            companyId: newCompany.id,
            role: "ADMIN"
        });

        return newCompany;
    },

    async getClientCompany(clientId, companyId) {

        const company = await companyModel.findClientCompany(clientId, companyId);

        if (!company) {
            throw new NotFoundError("Client-company link not found");
        }

        return company;
    },

    async getCompanyActivities(companyId) {

        const activities = await companyModel.getCompanyActivities(companyId);

        if (activities.length === 0) {
            throw new NotFoundError("Company activities not found");
        }

        return activities;
    },

    async updateCompany(data) {

        const { name, activityDescription, companyId } = data;

        await this.validateCompanyExists(companyId);

        return companyModel.updateCompany({
            name,
            activityDescription,
            companyId
        });
    },
    
    async deleteCompany(companyId) {

        const conn = await db.getConnection();

        try {

            await this.validateCompanyExists(companyId);

            await conn.beginTransaction();

            // Manual cascade delete to preserve business rules
            await companyClientModel.deleteByCompany(companyId, conn);
            await cnaeModel.deleteByCompany(companyId, conn);
            await addressModel.deleteByCompany(companyId, conn);

            const deleted = await companyModel.deleteCompany(companyId, conn);

            await conn.commit();

            return deleted;

        } catch (error) {

            await conn.rollback();
            throw error;

        } finally {
            conn.release();
        }
    }
};