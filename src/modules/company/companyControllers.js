import { DomainError } from "../../errors/DomainError.js";
import { NotFoundError } from "../../errors/NotFoundError.js";
import { companyService } from "./companyService.js";

const createCompany = async (req, res) => {
    try {

        const { name, cnpj, activityDescription } = req.body;
        const userId = req.user.id;

        const createdAt = new Date();

        const company = await companyService.createCompany(
            name,
            cnpj,
            createdAt,
            activityDescription,
            userId
        );

        return res.status(201).json(company);

    } catch (error) {

        if (error instanceof DomainError || error instanceof NotFoundError) {
            return res.status(error.status).json({ error: error.message });
        }

        return res.status(500).json({ error: "Internal server error" });
    }
};

const getClientCompany = async (req, res) => {
    try {

        const { clientId, companyId } = req.params;

        const company = await companyService.getClientCompany(clientId, companyId);

        return res.status(200).json({ company });

    } catch (error) {

        if (error instanceof DomainError || error instanceof NotFoundError) {
            return res.status(error.status).json({ error: error.message });
        }

        return res.status(500).json({ error: "Internal server error" });
    }
};

const getCompanyActivities = async (req, res) => {
    try {

        const { companyId } = req.params;

        const activities = await companyService.getCompanyActivities(companyId);

        return res.status(200).json({ activities });

    } catch (error) {

        if (error instanceof NotFoundError) {
            return res.status(error.status).json({ error: error.message });
        }

        return res.status(500).json({ error: "Internal server error" });
    }
};

const updateCompany = async (req, res) => {
    try {

        const { name, activityDescription } = req.body;
        const { companyId } = req.params;

        await companyService.updateCompany({
            name,
            activityDescription,
            companyId
        });

        return res.status(204).send();

    } catch (error) {

        if (error instanceof NotFoundError) {
            return res.status(error.status).json({ error: error.message });
        }

        return res.status(500).json({ error: "Internal server error" });
    }
};

const deleteCompany = async (req, res) => {
    try {

        const { companyId } = req.params;

        await companyService.deleteCompany(companyId);

        return res.status(204).send();

    } catch (error) {

        if (error instanceof NotFoundError) {
            return res.status(error.status).json({ error: error.message });
        }

        return res.status(500).json({ error: "Internal server error" });
    }
};

export {
    createCompany,
    getClientCompany,
    getCompanyActivities,
    updateCompany,
    deleteCompany
};
