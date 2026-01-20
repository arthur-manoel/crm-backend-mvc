import { authModel } from "./authModel.js";
import bcrypt from "bcrypt";
import { gerarToken } from "./tokenService.js";
import { DomainError } from "../../errors/DomainError.js";

const FAKE_HASH = "$2b$10$CwTycUXWue0Thq9StjUM0uJ8kF9E8Z4eQ1lZ9Ff8n3Z1nQGzKp6a";

export const authService = {

    async login(emailInput, senha) {

        
        const usuario = await authModel.buscarPorEmail(emailInput);

        const hashParaComparar = usuario ? usuario.senha : FAKE_HASH;
        const senhaCorreta = await bcrypt.compare(senha, hashParaComparar);

        if (!usuario || !senhaCorreta) {
            throw new DomainError("Falha de autenticação", 401);
        }

        const { id, email, role, nome } = usuario;

        const payload = { id, role };

        const token = gerarToken(payload);

        return { token, user: { id, nome, email, role } };
    }
}