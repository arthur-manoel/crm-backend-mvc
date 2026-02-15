import { NotFoundError } from '../../errors/NotFoundError.js';
import { dashboardModel } from './dashboardModel.js';

export const dashboardService = {

    async dashboard(userId) {

        const rows = await dashboardModel.dashboard(userId);

        const normalizeNumbers = (row) => ({
            totalCompanies: Number(row.totalCompanies),
            totalActiveLinks: Number(row.totalActiveLinks),
            totalPendingLinks: Number(row.totalPendingLinks),
            totalCompanyOpening: Number(row.totalCompanyOpening),
            totalCompanyChange: Number(row.totalCompanyChange),
            totalCompanyClosing: Number(row.totalCompanyClosing),
        });

        return normalizeNumbers(rows);
    },

    async processTypes() {
        const rows = await dashboardModel.processTypes();
        return rows;
    },

    async getClientDetails(clientId) {

        const details = await dashboardModel.getClientDetails(clientId);

        if (!details.length) {
            throw new NotFoundError("Client not found");
        }

        return details;
        
    }
};
