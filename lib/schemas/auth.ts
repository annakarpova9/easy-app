import * as z from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .nonempty({
      message: "Введите корректный email.",
    })
    .regex(
      /^[1-9a-zA-Z.@-_]+$/,
      "Допустимы только латинские буквы, цифры и символы",
    ),
  password: z
    .string()
    .trim()
    .min(6, {
      message: "Пароль должен содержать минимум 6 символов.",
    })
    .regex(/^[1-9a-zA-Z]+$/, "Допустимы только латинские буквы, цифры"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const signupSchema = z
  .object({
    username: z.string().trim().min(2, {
      message: "Введите своё имя",
    }),
    email: z
      .string()
      .trim()
      .nonempty({
        message: "Введите корректный email.",
      })
      .regex(
        /^[1-9a-zA-Z.@-_]+$/,
        "Допустимы только латинские буквы, цифры и символы",
      ),
    password: z
      .string()
      .trim()
      .min(6, {
        message: "Пароль должен содержать минимум 6 символов.",
      })
      .regex(/^[1-9a-zA-Z]+$/, "Допустимы только латинские буквы, цифры"),
    confirmPassword: z.string().trim().min(6, {
      message: "Пароль должен содержать минимум 6 символов.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают.",
    path: ["confirmPassword"],
  });

export type SignupFormValues = z.infer<typeof signupSchema>;
