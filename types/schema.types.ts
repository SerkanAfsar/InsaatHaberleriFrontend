import {
  addBlogSchema,
  addCategorySchema,
  addCategorySourceSchema,
  addMemberDetailSchema,
  addRoleSchema,
  changePasswordSchema,
  contactSchema,
  forgotPasswordSchema,
  loginShema,
  registerSchema,
  resetPasswordSchema,
  updatePasswordSchema,
} from "@/schemas";
import { z } from "zod";

export type AddCategoryType = z.infer<typeof addCategorySchema>;

export type AddCategorySourceType = z.infer<typeof addCategorySourceSchema>;

export type LoginType = z.infer<typeof loginShema>;

export type AddNewsType = z.infer<typeof addBlogSchema>;

export type AddRoleType = z.infer<typeof addRoleSchema>;

export type AddAppUserType = z.infer<ReturnType<typeof addMemberDetailSchema>>;

export type UpdatePasswordType = z.infer<typeof updatePasswordSchema>;

export type ChangePasswordType = z.infer<typeof changePasswordSchema>;

export type ResetPasswordType = z.infer<typeof resetPasswordSchema>;

export type ForgotPasswordType = z.infer<typeof forgotPasswordSchema>;

export type RegisterClientMemberType = z.infer<typeof registerSchema>;

export type ContactFormType = z.infer<typeof contactSchema>;
