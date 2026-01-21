import { dashboardService }  from './dashboardService.js';
import { DomainError } from '../../errors/DomainError.js';
import { NotFoundError } from '../../errors/NotFoundError.js';

const dashboard = async (req, res) => {

  try {

    const usuarioId = req.user.id;

    const informacoes = await dashboardService.dashboard(usuarioId);

    return res.json(informacoes);

  } catch (error) {

    if (error instanceof DomainError || error instanceof NotFoundError) {
        return res.status(error.status).json({ error: error.message });
    }

    return res.status(500).json({ error: error.message });
  }
};

const processTypes = async (req, res) => {

    try {

        const tiposProcesso = await dashboardService.processTypes();

        return res.status(200).json(tiposProcesso);

    } catch (error) {

        if (error instanceof DomainError || error instanceof NotFoundError) {
            return res.status(error.status).json({ error: error.message });
        }

        return res.status(500).json({ error: error.message });
      }
}

const getClientDetails = async (req, res) => {

  try {
    
    const { clienteId } = req.params;

    const result = await dashboardService.getClientDetails(clienteId);

    return res.status(200).json(result);

  } catch (error) {

    if (error instanceof DomainError || error instanceof NotFoundError) {
      return res.status(error.status).json({ error: error.message })
    }

    return res.status(500).json({ error: "Erro interno" })
  }

}

export { dashboard, processTypes, getClientDetails };