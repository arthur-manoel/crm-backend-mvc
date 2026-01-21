import { NotFoundError } from '../../errors/NotFoundError.js';
import { dashboardModel } from './dashboardModel.js';

export const dashboardService = {

    async dashboard(usuarioId) {

        const rows = await dashboardModel.dashboard(usuarioId);

        const normalizarNumeros = (row) => ({
            totalCnpjs: Number(row.totalCnpjs),
            totalLinksAtivos: Number(row.totalLinksAtivos),
            totalLinksPendentes: Number(row.totalLinksPendentes),
            totalAberturaCnpj: Number(row.totalAberturaCnpj),
            totalAlteracaoCnpj: Number(row.totalAlteracaoCnpj),
            totalFechamentoCnpj: Number(row.totalFechamentoCnpj),
        });
        return normalizarNumeros(rows);
    },

    async processTypes() {
        const rows = await dashboardModel.processTypes();
        return rows;
    },

    async getClientDetails(clienteId) {

        const details = await dashboardModel.getClientDetails(clienteId);

        if (details === 0) {
            throw new NotFoundError("Cliente não encontrado");
        }

        return details;
        
    }
};