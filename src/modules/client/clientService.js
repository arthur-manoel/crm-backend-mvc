import { DomainError } from "../../errors/DomainError.js";
import { NotFoundError } from "../../errors/NotFoundError.js";
import { clientModel } from "./clientModel.js";

export const clientService = {
    
    async validateBirthDate(date) {

        // Rejects invalid Date objects
        if (Number.isNaN(date.getTime())) {
            throw new DomainError("Invalid birth date");
        }

        const today = new Date();

        // Birth date cannot be in the future
        if (date > today) {
            throw new DomainError("Birth date cannot be in the future");
        }

        let age = today.getFullYear() - date.getFullYear();
        const m = today.getMonth() - date.getMonth();

        if (m < 0 || (m === 0 && today.getDate() < date.getDate())) {
            age--;
        }

        // Business rule: age limits
        if (age > 100) {
            throw new DomainError("Client must be at most 100 years old");
        }

        if (age < 18) {
            throw new DomainError("Client must be at least 18 years old");
        }
    },
    
    async validateDuplicates({ cpf, rg, email, currentId = null }) {

        const cpfExists = await clientModel.findByCPF(cpf);
        if (cpfExists && cpfExists.id !== Number(currentId)) {
            throw new DomainError("CPF already registered");
        }

        const rgExists = await clientModel.findByRG(rg);
        if (rgExists && rgExists.id !== Number(currentId)) {
            throw new DomainError("RG already registered");
        }

        const emailExists = await clientModel.findByEmail(email);
        if (emailExists && emailExists.id !== Number(currentId)) {
            throw new DomainError("Email already registered");
        }
    },
    
    async ensureClientExists(clientId) {

        const client = await clientModel.findById(clientId);

        if (!client) {
            throw new NotFoundError("Client not found");
        }

        return client;
    },

    async createClient(data) {

        await this.validateBirthDate(data.birth_date);
        await this.validateDuplicates(data);

        return clientModel.createClient(data);
    },

    async listClients(userId) {
        return clientModel.listByUser(userId);
    },

    async updateClient(data) {

        await this.validateDuplicates({ ...data, currentId: data.id });
        await this.ensureClientExists(data.id);

        return clientModel.updateClient(data);
    },

    async deleteClient(clientId, userId) {

        await this.ensureClientExists(clientId);

        return clientModel.deleteClient(clientId, userId);
    }
}
