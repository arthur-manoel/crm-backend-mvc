import { empresaUsuarioModel } from './empresaUsuarioModel.js';
import { AuthorizationError } from '../../errors/AuthorizationError.js';
import { DomainError } from '../../errors/domainError.js';

export const empresaUsuarioService = {

  async adicionarUsuarioEmpresa({ usuarioLogadoId, usuarioId, cnpjId, papel }) {

    const autorizarVinculo = await empresaUsuarioModel.buscarPapel(
      usuarioLogadoId,
      cnpjId
    );

    if (!autorizarVinculo || autorizarVinculo.papel !== 'ADMIN') {
      throw new AuthorizationError();
    }

    const existeVinculo = await empresaUsuarioModel.buscarPapel(usuarioId, cnpjId);

    if (existeVinculo) {
        throw new DomainError("Vinculo já existente");
    }
    return empresaUsuarioModel.criarVinculo({
      usuarioId,
      cnpjId,
      papel
    });
    
  }
};
