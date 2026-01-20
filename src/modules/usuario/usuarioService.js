import bcrypt from "bcrypt";
import { usuarioModel } from "./usuarioModel.js";
import { DomainError } from "../../errors/DomainError.js";

export const usuarioService = {

    async cadastrar({name, email, phone, password, role}) {

        const existe = await usuarioModel.buscaEmail(email);

        if (existe) {
            throw new DomainError("Email já cadastrado");
    }
    
        if (![1, 2].includes(role)) {
            throw new DomainError("Nível de usuário inválido");
        }
        const senhaHashed = await bcrypt.hash(password, 10);

        const novoUsuario = await usuarioModel.cadastrar({
            name,
            email,
            phone,
            senhaHashed,
            nivel_usuario_id: role,
        });
        
        return novoUsuario;
    },

    async usuarios() {

        const usuarios = await usuarioModel.usuarios();

        return usuarios;
        
    }
}