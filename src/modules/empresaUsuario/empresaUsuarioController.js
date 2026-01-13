import { empresaUsuarioService } from './empresaUsuarioService.js'; 
import { AuthorizationError } from '../../errors/AuthorizationError.js';

const criarEmpresaUsuario = async (req, res) => { 

    try { 

        const usuarioLogadoId = req.user.id; 
        const { cnpjId } = req.params; 
        const { usuario_id, papel } = req.body; 
        
        await empresaUsuarioService.adicionarUsuarioEmpresa({ 
            usuarioLogadoId, 
            usuarioId: usuario_id, 
            cnpjId, 
            papel 
        }); 
        
        return res.status(201).send(); 
        
    } catch (error) { 

        if (error instanceof AuthorizationError) {
            return res.status(403).json({ message: error.message });
        }
        
        return res.status(500).json({ message: error.message });

    } 
};

export { criarEmpresaUsuario };
