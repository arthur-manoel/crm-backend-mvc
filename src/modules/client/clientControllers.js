import { DomainError } from "../../errors/DomainError.js"; 
import { NotFoundError } from "../../errors/NotFoundError.js";
import { clientService } from "./clientService.js";

const createClient = async (req, res) => {

    try {
        const userId = req.user.id;

        const client = await clientService.createClient({
            ...req.body,
            userId
        });

        return res.status(201).json({ client });

    } catch (error) {

        if (error instanceof DomainError) {
            return res.status(error.status).json({ error: error.message });
        }

        return res.status(500).json({ error: error.message });
    }
}

const listClients = async (req, res) => {
    try {
        const clients = await clientService.listClients(req.user.id);
        return res.status(200).json({ clients });
    } catch {
        return res.status(500).json({ error: "Internal error" });
    }
}

const updateClient = async (req, res) => {

    try {
        await clientService.updateClient({
            ...req.body,
            id: req.params.id,
            userId: req.user.id
        });

        return res.status(204).send();

    } catch (error) {

        if (error instanceof DomainError || error instanceof NotFoundError) {
            return res.status(error.status).json({ error: error.message });
        }

        return res.status(500).json({ error: error.message });
    }
}

const deleteClient = async (req, res) => {

    try {
        await clientService.deleteClient(req.params.id, req.user.id);
        return res.status(204).send();
    } catch (error) {
        if (error instanceof NotFoundError) {
            return res.status(error.status).json({ error: error.message });
        }
        return res.status(500).json({ error: error.message });
    }
}

export { createClient, listClients, updateClient, deleteClient }
