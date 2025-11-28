"use client";

import { LoginFormValues, loginSchema } from "@/lib/schemas/auth";
import { FC } from "react";
import { login } from "@/lib/actions/auth";
import { AuthForm, FormFieldConfig } from "@/components/shared/auth-form";
import { toast } from "sonner";
import { AppRoutes } from "@/lib/config/routes";
import { UserMessages } from "@/lib/config/messages";

interface LoginFormProps {
  className?: string;
}

const defaultValues: LoginFormValues = {
  email: "",
  password: "",
};

const loginFields: FormFieldConfig<LoginFormValues>[] = [
  {
    name: "email",
    label: "Логин",
    type: "email",
    placeholder: "Например, you@dog.com",
  },
  {
    name: "password",
    label: "Пароль",
    type: "password",
    placeholder: "••••••••",
  },
];

export const LoginForm: FC<LoginFormProps> = ({ className }) => {
  async function onSubmit(values: LoginFormValues) {
    const formData = new FormData();
    formData.append("email", values.email);
    formData.append("password", values.password);

    const result = await login(formData);

    if (result && "error" in result) {
      const errorMessage = result.error;
      let userFriendlyMessage = "";

      if (errorMessage?.includes("Invalid login credentials")) {
        userFriendlyMessage = UserMessages.ERROR.INVALID_CREDENTIALS;
      } else if (errorMessage?.includes("Email not confirmed")) {
        userFriendlyMessage = UserMessages.ERROR.EMAIL_NOT_CONFIRMED;
      } else if (errorMessage?.includes("blocked")) {
        userFriendlyMessage = UserMessages.ERROR.AUTH_BLOCKED;
      } else {
        userFriendlyMessage = UserMessages.ERROR.UNEXPECTED;
      }

      toast.error(userFriendlyMessage, { position: "top-right" });
    }
  }
  return (
    <AuthForm
      title="Вход"
      schema={loginSchema}
      defaultValues={defaultValues}
      formId="login-form"
      onSubmit={onSubmit}
      fields={loginFields}
      footerText="Нет аккаунта?"
      footerLinkText="Зарегистрироваться"
      footerLinkHref={AppRoutes.SIGNUP}
      showForgotPassword
      className={className}
    />
  );
};
