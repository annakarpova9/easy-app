"use client";

import { LoginFormValues, loginSchema } from "@/lib/schemas/auth";
import { FC } from "react";
import { login } from "@/lib/actions/auth";
import { AuthForm, FormFieldConfig } from "@/components/shared/auth-form";
import { toast } from "sonner";

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
      toast.error(result.error, { position: "top-right" });
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
      footerLinkHref="/signup"
      className={className}
    />
  );
};
