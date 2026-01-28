import { empresaModel } from "../modules/empresa/empresaModel.js"

export async function checkCompanyExists(req, res, next) {
    try {
            const { cnpjId } = req.params; 

            const company = await empresaModel.buscarPorId(cnpjId);
            if (!company) {
                return res.status(404).json({ message: "Company not found" });
            }

            req.company = company;
            next();

        } catch (error) {
            next(error);
        }
}
