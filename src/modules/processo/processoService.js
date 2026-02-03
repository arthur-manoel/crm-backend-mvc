import { DomainError } from "../../errors/DomainError.js";
import { companyClientModel } from "../companyClient/companyClientModel.js";
import { processoModel } from "./processoModel.js";
import db from "../../database/db.js";

export const processoService = {

    async allProcessByCnpj(cnpjId, idProcess) {

        return processoModel.allProcessByCnpjId(cnpjId, idProcess);
    },

    async createProcess({ clienteId, cnpjId, tipoProcessoId, status }) {

        const conn = await db.getConnection();
        
        try {
            
            const existsCompany = await companyClientModel.findByClientAndCompany(clienteId, cnpjId);

            if (!existsCompany) {
                throw new DomainError("A empresa não está vinculada ao cliente");
            }

            const validateType = await processoModel.validateProcessType(tipoProcessoId);

            if (!validateType) {
                throw new DomainError("Tipo de processo inválido");
            }

            const clienteEmpresaId = existsCompany.id_cliente_cnpj;
   
            const linkGerado = `https://facilita-compet.vercel.app${clienteId}`;

            const dataExpiracao = new Date();

            dataExpiracao.setMonth(dataExpiracao.getMonth() + 1);
            const dataExpiracaoFormatada = dataExpiracao.toISOString().slice(0, 19).replace("T", " ");
        
            await conn.beginTransaction();

            const linkResult = await processoModel.createGeracaoLink(
                linkGerado, 
                clienteId, 
                clienteEmpresaId, 
                dataExpiracaoFormatada, 
                tipoProcessoId, 
                conn
            );

            const geracaoLinkId = linkResult.insertId;

            await processoModel.createStatusLink(status, geracaoLinkId, conn);

            const process = await processoModel.insertProcess({
                clienteId,
                cnpjId,
                tipoProcessoId,
                geracaoLinkId,
                conn
            });

            await conn.commit();

            return {
                processo: process.insertId,
                link: linkGerado,
                data_expiracao: dataExpiracaoFormatada
            };

        } catch (error) {
            await conn.rollback();
            throw error;
        }
        finally {
            conn.release();
        }
    }
};