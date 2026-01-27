import { empresaUsuarioService } from './empresaUsuarioService.js'; 
import { AuthorizationError } from '../../errors/AuthorizationError.js';
import { DomainError } from '../../errors/DomainError.js';

const criarEmpresaUsuario = async (req, res) => { 

    try { 

        const usuarioLogadoId = req.user.id; 
        const { cnpjId } = req.params; 
        const { usuarioId, papel } = req.body; 
        
        await empresaUsuarioService.adicionarUsuarioEmpresa({ 
            usuarioLogadoId, 
            usuarioId, 
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

const updateEmpresaUsuario = async (req, res) => {

    try {
        
        const usuarioLogadoId = req.user.id;
        const { cnpjId, idVinculo } = req.params;
        const { usuarioId, papel } = req.body;

        await empresaUsuarioService.UpdateCompanyLink({
            usuarioLogadoId,
            idVinculo,
            usuarioId,
            cnpjId,
            papel
        })

        return res.status(204).send()

    } catch (error) {

            if (error instanceof DomainError || error instanceof AuthorizationError) {
                return res.status(error.status).json({ error: error.message });
            }

            return res.status(500).json({ error: error.message });
    }
}

const deleteEmpresaUsuario = async (req, res) => {
    try {
        
        const { idVinculo, cnpjId } = req.params;
        const usuarioLogadoId = req.user.id;

        await empresaUsuarioService.deleteUserCompanyLink({ idVinculo, usuarioLogadoId, cnpjId });

        return res.status(204).send();

    } catch (error) {

        if (error instanceof DomainError || error instanceof AuthorizationError) {
            return res.status(error.status).json({ error: error.message });
        }

        return res.status(500).json({ error: error.message });
    }   
}

export { criarEmpresaUsuario, updateEmpresaUsuario, deleteEmpresaUsuario };