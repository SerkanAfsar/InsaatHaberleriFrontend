import { NewsSites } from "@/types";
import { z } from "zod";

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export const addCategorySchema = z.object({
  categoryName: z
    .string({ error: "Kategori Adı Giriniz" })
    .min(1, { error: "Kategori Adı Giriniz" }),
  seoTitle: z
    .string({ error: "SEO başlığını giriniz" })
    .min(1, { error: "SEO başlığını giriniz" }),
  seoDescription: z
    .string({ error: "SEO açıklamasını giriniz" })
    .min(1, { error: "SEO açıklamasını giriniz" }),
});

export const addCategorySourceSchema = z.object({
  url: z
    .string({ error: "Web sitesi URL'si giriniz" })
    .min(1, { error: "Web sitesi URL'si giriniz" })
    .url({ error: "Geçerli bir web sitesi URL'si giriniz" }),
  categoryId: z
    .number({ error: "Kategori seçiniz" })
    .positive({ error: "Kategori ID sıfırdan büyük olmalıdır" }),
  newsSite: z.enum(NewsSites, { error: "Geçerli bir haber sitesi seçiniz" }),
});

export const loginShema = z.object({
  eMail: z.email({ error: "EMail Giriniz" }).min(1, { error: "EMail Giriniz" }),
  password: z
    .string({ error: "Şifre Giriniz" })
    .min(1, { error: "Şifre Giriniz" }),
});

export const addBlogSchema = z.object({
  title: z
    .string({ error: "Başlık Giriniz" })
    .min(1, { error: "Başlık Giriniz" }),
  subDescription: z
    .string({ error: "Alt Açıklama Giriniz" })
    .min(1, { error: "Alt Açıklama Giriniz" }),
  seoTitle: z
    .string({ error: "seoTitle Giriniz" })
    .min(1, { error: "seoTitle Giriniz" }),
  seoDescription: z
    .string({ error: "seoDescription Giriniz" })
    .min(1, { error: "seoDescription Giriniz" }),

  categoryId: z
    .number({ error: "Kategori seçiniz" })
    .positive({ error: "Kategori ID sıfırdan büyük olmalıdır" }),

  content: z
    .string({ error: "content Giriniz" })
    .min(1, { error: "content Giriniz" }),
  ImageFile: z
    .instanceof(File, { message: "Resim yükleyiniz" })
    .refine((file) => file.size <= MAX_FILE_SIZE, "Max 5MB olmalı")
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Sadece .jpg, .png, .webp kabul edilir",
    )
    .optional(),
});

export const addRoleSchema = z.object({
  roleName: z.string({ error: "Rol Adı Giriniz" }).min(1, {
    error: "Rol Adı Giriniz",
  }),
  claims: z.array(z.string()).min(1, { error: "Claim Tanımlayınız" }),
});

export const addMemberDetailSchema = (isAdd: boolean) =>
  z
    .object({
      email: z.email({ error: "E-Mail Formatı yanlış" }),
      name: z.string().min(1, { error: "İsim Giriniz" }),
      surname: z.string().min(1, { error: "Soyisim Giriniz" }),

      appUserId: z.string().optional(),
      password: isAdd
        ? z.string().min(6, { error: "Şifre en az 6 karakter olmalıdır" })
        : z.string().optional(),
      roles: isAdd
        ? z.array(z.string()).min(1, { error: "En Az 1 Rol Seçiniz" })
        : z
            .array(z.string())
            .min(1, { error: "En Az 1 Rol Seçiniz" })
            .optional(),
      // isAdd: z.boolean(),
    })
    .superRefine((data, ctx) => {
      const { email, password } = data;

      if (isAdd) {
        if (email.toLowerCase().includes(password!.toLowerCase())) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Şifre Kullanıcı Adını İçeremez",
            path: ["password"],
          });
        }

        if (password!.toLowerCase().startsWith("1234")) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Şifre Ardışık Sayılar İle Başlayamaz",
            path: ["password"],
          });
        }
      }
    });

export const updatePasswordSchema = z
  .object({
    oldPassword: z.string().min(1, { error: "Mevcut Şifrenizi Giriniz" }),
    newPassword: z
      .string()
      .min(1, { error: "Yeni Şifreniz En Az 6 Karakter Olmalıdır" }),
    newPasswordConfirm: z
      .string()
      .min(1, { error: "Şifre Tekrar En Az 6 Karakter Olmalıdır" }),
  })
  .superRefine((data, ctx) => {
    const { newPassword, newPasswordConfirm } = data;
    if (newPassword != newPasswordConfirm) {
      ctx.addIssue({
        code: "custom",
        path: ["newPasswordConfirm"],
        message: "Yeni Şifre ile Yeni Şifre Tekrar Aynı Olmalıdır...",
      });
    }
  });

export const changePasswordSchema = z
  .object({
    oldPassword: z.string().min(1, "Eski şifrenizi giriniz"),
    newPassword: z.string().min(6, "Yeni şifreniz en az 6 karakter olmalıdır"),
    newPasswordConfirm: z.string().min(1, "Yeni şifrenizi tekrar giriniz"),
  })
  .refine((values) => values.newPassword === values.newPasswordConfirm, {
    path: ["newPasswordConfirm"],
    message: "Yeni şifreler eşleşmiyor",
  });

export const resetPasswordSchema = z
  .object({
    newPassword: z.string().min(6, "Yeni şifreniz en az 6 karakter olmalıdır"),
    newPasswordConfirm: z.string().min(1, "Yeni şifrenizi tekrar giriniz"),
  })
  .refine((values) => values.newPassword === values.newPasswordConfirm, {
    path: ["newPasswordConfirm"],
    message: "Yeni şifreler eşleşmiyor",
  });

export const forgotPasswordSchema = z.object({
  eMail: z.email({ error: "Geçerli bir e-posta adresi giriniz" }),
});

export const registerSchema = z
  .object({
    email: z.email({ error: "Geçerli bir e-posta adresi giriniz" }),
    name: z.string().trim().min(1, "Adınızı giriniz"),
    surname: z.string().trim().min(1, "Soyadınızı giriniz"),
    password: z.string().min(6, "Şifreniz en az 6 karakter olmalıdır"),
    passwordConfirm: z.string().min(1, "Şifrenizi tekrar giriniz"),
  })
  .refine((values) => values.password === values.passwordConfirm, {
    path: ["passwordConfirm"],
    message: "Şifreler eşleşmiyor",
  });

export const contactSchema = z.object({
  nameSurname: z
    .string({ error: "İsim Soyisim Giriniz" })
    .min(1, { error: "İsim Soyisim Giriniz" }),
  email: z
    .string({ error: "E-Posta Adresinizi Giriniz" })
    .email({ error: "E-Posta Formatı Yanlış" }),
  subject: z
    .string({ error: "Konu Giriniz" })
    .min(1, { error: "Konu Giriniz" }),
  messageText: z
    .string({ error: "Mesajınızı Giriniz" })
    .min(1, { error: "Mesajınızı Giriniz" }),
});
