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

export { dashboard };