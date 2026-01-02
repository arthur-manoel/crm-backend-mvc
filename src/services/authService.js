import { authModel } from "../models/authModel.js";
import bcrypt from "bcrypt";
import { gerarToken } from "./tokenService.js";

export const authService = {

    async login(email, senha) {
        
        const usuario = await authModel.buscarporemail(email);

        if (!usuario) {
            throw new Error("INVALID_CREDENTIALS");
        }

        const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

        if (!senhaCorreta) {
            throw new Error("INVALID_CREDENTIALS");
        }

        const { id, email: userEmail, role, nome } = usuario;

        const payload = { id, email: userEmail, role, nome };

        const token = gerarToken(payload);

        return { token, user: payload };
    }
}