import { DomainError } from "../../errors/DomainError.js";
import { NotFoundError } from "../../errors/NotFoundError.js";
import { addressService } from "./addressService.js";

const createAddress = async (req, res) => {
  try {
    const { zipCode, street, number, complement, neighborhood, city, state } = req.body;
    const { clientId, companyId } = req.params;

    const newAddress = await addressService.createAddress(
      clientId,
      companyId,
      zipCode,
      street,
      number,
      complement,
      neighborhood,
      city,
      state
    );

    return res.status(201).json({
      message: "Address created successfully",
      newAddress
    });

  } catch (error) {
    if (error instanceof DomainError || error instanceof NotFoundError) {
      return res.status(error.status).json({ error: error.message });
    }

    return res.status(500).json({ error: error });
  }
};

const getAddress = async (req, res) => {
  try {
    
    const { addressId } = req.params;
    const address = await addressService.getAddressById(addressId);

    return res.status(200).json(address);
  } catch (error) {

    if (error instanceof NotFoundError) {
      return res.status(error.status).json({ error: error.message });
    }
    
    return res.status(500).json({ error: "Internal error" });
  }
};

const updateAddress = async (req, res) => {
  try {
    const data = req.body;
    const { addressId, clientId, companyId } = req.params;

    await addressService.updateAddress(clientId, companyId, addressId, data);
    return res.status(204).send();

  } catch (error) {
    if (error instanceof DomainError || error instanceof NotFoundError) {
      return res.status(error.status).json({ error: error.message });
    }

    return res.status(500).json({ error: error.message });
  }
};

const deleteAddress = async (req, res) => {
  try {
    const { addressId, clientId, companyId } = req.params;

    await addressService.deleteAddress(clientId, companyId, addressId);
    return res.status(204).send();

  } catch (error) {
    if (error instanceof DomainError || error instanceof NotFoundError) {
      return res.status(error.status).json({ error: error.message });
    }

    return res.status(500).json({ error: error.message });
  }
};

export {
  createAddress,
  getAddress,
  updateAddress,
  deleteAddress
};
