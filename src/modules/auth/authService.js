import { authModel } from "./authModel.js";
import bcrypt from "bcrypt";
import { generateToken } from "./tokenService.js";
import { DomainError } from "../../errors/DomainError.js";

// Fake hash used to prevent user enumeration via timing attacks.
// Ensures bcrypt comparison always runs, even when the email does not exist.

export const authService = {

    async login(emailInput, password) {

        
        const user = await authModel.findByEmail(emailInput);

        const hashToCompare = user ? user.password : FAKE_PASSWORD_HASH;
        const isPasswordCorrect = await bcrypt.compare(password, hashToCompare);

        if (!user || !isPasswordCorrect) {
            throw new DomainError("Authentication failed", 401);
        }

        const { id, email, role, name } = user;

        const payload = { id, role };

        const token = generateToken(payload);

        return { token, user: { id, name, email, role } };
    }
}
