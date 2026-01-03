import bcrypt from "bcrypt";
import { usuarioModel } from "./usuarioModel.js";

export const usuarioService = {

    async cadastrar({name, email, phone, password, role}) {

        const existe = await usuarioModel.buscaEmail(email);

        if (existe) {
            throw new Error("Email já cadastrado");
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
    }
}