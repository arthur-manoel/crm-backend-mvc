import { authModel } from "./authModel.js";
import bcrypt from "bcrypt";
import { generateToken } from "./tokenService.js";
import { DomainError } from "../../errors/DomainError.js";

// Fake hash used to prevent user enumeration via timing attacks.
// Ensures bcrypt comparison always runs, even when the email does not exist.

export const authService = {

    async create({ name, email, phone, password, role }) {

        const existingUser = await authModel.findByEmail(email);

        if (existingUser) {
        throw new DomainError("Email already registered");
        }

        if (![1, 2].includes(role)) {
        throw new DomainError("Invalid user role");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        return await authModel.create({
        name,
        email,
        phone,
        hashedPassword,
        roleId: role
        });
    },
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
