import * as z from "zod";

export const emailSchema = z
  .string()
  .trim()
  .min(1, {
    message: "Email не может быть пустым.",
  })
  .regex(
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    "Введите корректный формат email и используйте только латинские буквы, цифры и символы @, ., -, _",
  );

// --- 2. Обновленная Базовая схема Пароля ---
export const passwordSchema = z
  .string()
  .trim()
  .min(8, {
    message: "Пароль должен содержать минимум 8 символов.",
  })
  .regex(/[A-Z]/, "Пароль должен содержать хотя бы одну заглавную букву.")
  .regex(/[a-z]/, "Пароль должен содержать хотя бы одну строчную букву.")
  .regex(/[0-9]/, "Пароль должен содержать хотя бы одну цифру.")
  .regex(
    /[!@#$%^&*()_+={}[\]:;"'<,>.?/|\\]/,
    "Пароль должен содержать хотя бы один специальный символ.",
  );

export const usernameSchema = z.string().trim().min(2, {
  message: "Введите своё имя",
});

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export type LoginFormValues = z.infer<typeof loginSchema>;

const signupPaseSchema = z.object({
  username: usernameSchema,
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: passwordSchema,
});

export const signupSchema = signupPaseSchema.refine(
  (data) => data.password === data.confirmPassword,
  {
    message: "Пароли не совпадают.",
    path: ["confirmPassword"],
  },
);

export type SignupFormValues = z.infer<typeof signupSchema>;

export const requestResetPasswordSchema = z.object({
  email: emailSchema,
});

export type RequestResetPasswordFormValues = z.infer<
  typeof requestResetPasswordSchema
>;

const resetPasswordBaseSchema = z.object({
  password: passwordSchema,
  confirmPassword: passwordSchema,
});

export const resetPasswordSchema = resetPasswordBaseSchema.refine(
  (data) => data.password === data.confirmPassword,
  {
    message: "Пароли не совпадают.",
    path: ["confirmPassword"],
  },
);

export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;
