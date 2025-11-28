"use client";

import { SignupFormValues, signupSchema } from "@/lib/schemas/auth";
import { FC } from "react";
import { AuthForm, FormFieldConfig } from "@/components/shared/auth-form";
import { signup } from "@/lib/actions/auth";
import { toast } from "sonner";
import { AppRoutes } from "@/lib/config/routes";

interface SignupFormProps {
  className?: string;
}

const defaultValues: SignupFormValues = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const signupFields: FormFieldConfig<SignupFormValues>[] = [
  {
    name: "username",
    label: "Ваше имя",
    type: "text",
    placeholder: "Например, Боб",
  },
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
    autoComplete: "off",
  },
  {
    name: "confirmPassword",
    label: "Повторите пароль",
    type: "password",
    placeholder: "••••••••",
    autoComplete: "off",
  },
];

export const SignupForm: FC<SignupFormProps> = ({ className }) => {
  async function onSubmit(values: SignupFormValues) {
    const formData = new FormData();
    formData.append("username", values.username);
    formData.append("email", values.email);
    formData.append("password", values.password);

    const result = await signup(formData);

    if (result && "error" in result) {
      toast.error(result.error, { position: "top-right" });
    }
  }

  return (
    <AuthForm
      title="Регистрация"
      schema={signupSchema}
      defaultValues={defaultValues}
      formId="signup-form"
      onSubmit={onSubmit}
      fields={signupFields}
      footerText="Уже есть аккаунт?"
      footerLinkText="Войти"
      footerLinkHref={AppRoutes.LOGIN}
      className={className}
    />
  );
};
