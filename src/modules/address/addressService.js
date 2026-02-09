import { DomainError } from "../../errors/DomainError.js";
import { NotFoundError } from "../../errors/NotFoundError.js";
import { companyClientModel } from "../companyClient/companyClientModel.js";
import { addressModel } from "./addressModel.js";

export const addressService = {

  async getAddressById(addressId) {
    const address = await addressModel.findById(addressId);
    if (!address) {
      throw new NotFoundError("Address not found");
    }
    return address;
  },

  async createAddress(clientId, companyId, zipCode, street, number, complement, neighborhood, city, state) {

    const existingAddress = await addressModel.findAddress(companyId, clientId);
    if (existingAddress) {
      throw new DomainError("Company already has an address");
    }

    const link = await addressModel.findLink(clientId, companyId);

    if (!link) {
      throw new NotFoundError("Company-client link does not exist");
    }

    return addressModel.createAddress(
      companyId,
      clientId,
      zipCode,
      street,
      number,
      complement,
      neighborhood,
      city,
      state
    );
  },

  async updateAddress(clientId, companyId, addressId, data) {
    const link = await companyClientModel.findByClientAndCompany(clientId, companyId);

    if (!link) {
      throw new DomainError("Company has no link with client");
    }

    const address = await addressModel.validateAddress(addressId, clientId, companyId);
    if (!address) {
      throw new NotFoundError("Address not found");
    }

    const normalize = (v) => {
      if (v === undefined || v === null || v === "") return null;
      return String(v).trim();
    };

    const updatedData = {
      zipCode: normalize(data.zipCode ?? address.zip_code),
      street: normalize(data.street ?? address.street),
      number: normalize(data.number ?? address.number),
      complement: normalize(data.complement ?? address.complement),
      neighborhood: normalize(data.neighborhood ?? address.neighborhood),
      city: normalize(data.city ?? address.city),
      state: normalize(data.state ?? address.state),
    };

    const changedFields = Object.keys(updatedData).filter(
      field => normalize(updatedData[field]) !== normalize(address[field])
    );

    if (changedFields.length === 0) {
      throw new DomainError("No changes detected");
    }

    const duplicate = await addressModel.validateDuplicate(
      addressId,
      companyId,
      updatedData.zipCode,
      updatedData.street,
      updatedData.number,
      updatedData.complement,
      updatedData.neighborhood,
      updatedData.city,
      updatedData.state
    );

    if (duplicate) {
      throw new DomainError("Address already exists for this company");
    }

    const fieldsToUpdate = Object.fromEntries(
      changedFields.map(field => [field, updatedData[field]])
    );

      const fieldMap = {
      zipCode: "zip_code",
      street: "street",
      number: "number",
      complement: "complement",
      neighborhood: "neighborhood",
      city: "city",
      state: "state"
    };

  const fieldsToUpdateDb = Object.fromEntries(
    changedFields.map(field => [fieldMap[field], updatedData[field]])
  );

  await addressModel.updateAddress(addressId, fieldsToUpdateDb);
  },

  async deleteAddress(clientId, companyId, addressId) {
    const link = await companyClientModel.findByClientAndCompany(clientId, companyId);

    if (!link) {
      throw new DomainError("Company has no link with client");
    }

    const address = await addressModel.validateAddress(addressId, clientId, companyId);

    if (!address) {
      throw new NotFoundError("Address not found");
    }

    await addressModel.deleteAddressById(addressId);
  }
};
