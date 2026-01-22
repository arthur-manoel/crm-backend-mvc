import { empresaUsuarioModel } from './empresaUsuarioModel.js';
import { AuthorizationError } from '../../errors/AuthorizationError.js';
import { DomainError } from '../../errors/DomainError.js';
import { PAPEL_HIERARQUIA } from '../../constants/papeisCnpj.js';

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
    
  },

  async UpdateCompanyLink({ usuarioLogadoId, idVinculo, usuarioId, cnpjId, papel }) {

    if (!PAPEL_HIERARQUIA[papel]) {
        throw new DomainError(
            `Papel '${papel}' é inválido. Escolha entre: ${Object.keys(PAPEL_HIERARQUIA).join(', ')}`
        );
    }

    const authorizeCompanyLink = await empresaUsuarioModel.buscarPapel(usuarioLogadoId, cnpjId);
    if (!authorizeCompanyLink || PAPEL_HIERARQUIA[authorizeCompanyLink.papel] < PAPEL_HIERARQUIA['ADMIN']) {
        throw new AuthorizationError("Você não tem permissão para alterar este vínculo");
    }

    const vinculo = await empresaUsuarioModel.buscarPapel(usuarioId, cnpjId);
    if (!vinculo) {
        throw new DomainError("Vínculo não existente");
    }

    if (vinculo.papel === 'ADMIN' && papel !== 'ADMIN') {
        const totalAdmins = await empresaUsuarioModel.contarAdmins(cnpjId);
        if (totalAdmins <= 1) {
            throw new DomainError("Não é possível remover o último admin do CNPJ");
        }
    }

    if (vinculo.papel === papel) return vinculo;

    const updated = await empresaUsuarioModel.updateVinculo(idVinculo, papel);

    return updated;
}

};
