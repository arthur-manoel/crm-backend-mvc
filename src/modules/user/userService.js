import bcrypt from "bcrypt";
import { userModel } from "./userModel.js";
import { DomainError } from "../../errors/DomainError.js";

export const userService = {

  async list() {

    return await userModel.findAll();

  }

};
