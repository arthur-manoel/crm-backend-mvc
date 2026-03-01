import bcrypt from "bcrypt";
import { userModel } from "./userModel.js";
import { DomainError } from "../../errors/DomainError.js";
import { NotFoundError } from "../../errors/NotFoundError.js";

export const userService = {
  
  async list() {

    return await userModel.findAll();

  },

  async patchUser(userId, data) {

    const user = await userModel.findById(userId);

    
    if (!user) {
      throw new NotFoundError("User not found");
    }

    const isPasswordCorrect = await bcrypt.compare(
      data.currentPassword,
      user.password_hash
    );
    
    if (!isPasswordCorrect) {
        throw new DomainError("Authentication failed", 401);
      }
      
      const fieldsToUpdate = {};
      
      // email
      if (data.email && data.email !== user.email) {
        
        const emailExists = await userModel.findByEmail(data.email);
        
        if (emailExists && emailExists.id !== user.id) {
        throw new DomainError("Email already in use");
        }

        fieldsToUpdate.email = data.email.toLowerCase().trim();
    }

    // name
    if (data.name && data.name !== user.name) {
        fieldsToUpdate.name = data.name.trim();
    }

    // phone
    if (data.phone && data.phone !== user.phone) {
      fieldsToUpdate.phone = data.phone.trim();
    }
    
    // password
    if (data.newPassword) {
      
        const isSamePassword = await bcrypt.compare(
            data.newPassword,
            user.password_hash
          );

          if (isSamePassword) {
            throw new DomainError("New password must be different from current password");
        }

        const hashedPassword = await bcrypt.hash(data.newPassword, 10);
        
        fieldsToUpdate.password_hash = hashedPassword;
      }

      if (Object.keys(fieldsToUpdate).length === 0) {
        throw new DomainError("No changes detected");
      }
      
      await userModel.patchUser(userId, fieldsToUpdate);
    },

    async deleteUser(userId, data) {

      const user = await userModel.findById(userId)
      if (!user) {
        throw new NotFoundError("User not found");
      }

      const isPasswordCorrect = await bcrypt.compare(
        data.currentPassword,
        user.password_hash
      );

      if (!isPasswordCorrect) {
        throw new DomainError("Authentication failed", 401);
      }

      await userModel.deleteById(userId);
    }
};
