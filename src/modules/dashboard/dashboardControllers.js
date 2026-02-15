import { dashboardService }  from './dashboardService.js';
import { DomainError } from '../../errors/DomainError.js';
import { NotFoundError } from '../../errors/NotFoundError.js';

const dashboard = async (req, res) => {

  try {

    const userId = req.user.id;

    const information = await dashboardService.dashboard(userId);

    return res.json(information);

  } catch (error) {

    if (error instanceof DomainError || error instanceof NotFoundError) {
        return res.status(error.status).json({ error: error.message });
    }

    return res.status(500).json({ error: "Internal server error" });
  }
};

const processTypes = async (req, res) => {

    try {

        const processTypes = await dashboardService.processTypes();

        return res.status(200).json(processTypes);

    } catch (error) {

        if (error instanceof DomainError || error instanceof NotFoundError) {
            return res.status(error.status).json({ error: error.message });
        }

        return res.status(500).json({ error: "Internal server error" });
      }
}

const getClientDetails = async (req, res) => {

  try {
    
    const { clientId } = req.params;

    const result = await dashboardService.getClientDetails(clientId);

    return res.status(200).json(result);

  } catch (error) {

    if (error instanceof DomainError || error instanceof NotFoundError) {
      return res.status(error.status).json({ error: error.message })
    }

    return res.status(500).json({ error: error.message })
  }

}

export { dashboard, processTypes, getClientDetails };
