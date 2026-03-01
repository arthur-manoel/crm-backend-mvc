import { z } from "zod";

export const patchUserSchema = z.object({
  currentPassword: z.string().min(1),

  email: z.string().email().optional(),

  name: z.string().min(2).optional(),

  phone: z.string().min(8).optional(),

  newPassword: z.string().min(6).optional(),
})
.refine(
  (data) =>
    data.email !== undefined ||
    data.name !== undefined ||
    data.phone !== undefined ||
    data.newPassword !== undefined,
    {
    message: "At least one field must be provided"
  }
);

export const deleteUserSchema = z.object({
  currentPassword: z.string().min(1),
});