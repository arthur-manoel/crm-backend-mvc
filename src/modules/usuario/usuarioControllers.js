import { usuarioService } from "./usuarioService.js";
import { DomainError } from "../../errors/domainError.js";

const usuarios = async (req, res) => {
  try {

    const usuarios = await usuarioService.usuarios();
    console.log(usuarios)
    res.json({ data: usuarios });

  } catch (err) {
    res.status(500).json({ error: "Erro interno" });
  }
};

const cadastro = async (req, res) => {
  
  try {

    const { name, email, phone, password, role } = req.body;
    
    const novoUsuario = await usuarioService.cadastrar({
      name, 
      email, 
      phone, 
      password, 
      role,
    });

    res.status(201).json({
      message: "Usuário cadastrado com sucesso!",
      user: novoUsuario
    });

  } catch (error) {
    if (error instanceof DomainError) {
      return res.status(error.status).json({ error: error.message });
    }

    res.status(500).json({ error: "Erro interno" });
  }
};

export { usuarios, cadastro };
