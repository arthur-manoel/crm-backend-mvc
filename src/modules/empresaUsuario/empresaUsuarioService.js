import { empresaUsuarioModel } from './empresaUsuarioModel.js';
import { AuthorizationError } from '../../errors/AuthorizationError.js';
import { DomainError } from '../../errors/DomainError.js';
import { ROLE_HIERARCHY } from '../../constants/RoleHierarchy.js';

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

    if (!ROLE_HIERARCHY[papel]) {
        throw new DomainError(
            `Papel '${papel}' é inválido. Escolha entre: ${Object.keys(ROLE_HIERARCHY).join(', ')}`
        );
    }

    const authorizeCompanyLink = await empresaUsuarioModel.buscarPapel(usuarioLogadoId, cnpjId);
    if (!authorizeCompanyLink || ROLE_HIERARCHY[authorizeCompanyLink.papel] < ROLE_HIERARCHY['ADMIN']) {
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
  },
  
  async deleteUserCompanyLink({ idVinculo, usuarioLogadoId, cnpjId }){

    const authorizeCompanyLink = await empresaUsuarioModel.buscarPapel(usuarioLogadoId, cnpjId);

    if (!authorizeCompanyLink || authorizeCompanyLink.papel !== 'ADMIN') {
    throw new AuthorizationError("Você não tem permissão para remover este vínculo");
  }

    const vinculo = await empresaUsuarioModel.findLinkById( idVinculo);

    if (!vinculo || vinculo.cnpj_id !== Number(cnpjId)) {
      throw new DomainError("Vínculo não existente");
  }

    if (vinculo.papel === 'ADMIN') {

        const totalAdmins = await empresaUsuarioModel.contarAdmins(cnpjId);

        if (totalAdmins <= 1) {
            throw new DomainError("Não é possível remover o último admin do CNPJ");
        }
    }

    const deleted = await empresaUsuarioModel.deleteVinculo(idVinculo);

    return deleted;
  }
};