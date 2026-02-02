import { companyModel } from "../modules/company/companyModel.js"

export async function checkCompanyExists(req, res, next) {
    try {
            const { cnpjId } = req.params; 

            const company = await companyModel.findById(cnpjId);
            if (!company) {
                return res.status(404).json({ message: "Company not found" });
            }

            req.company = company;
            next();

        } catch (error) {
            next(error);
        }
}
