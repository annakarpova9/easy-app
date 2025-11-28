"use client";

import { FC } from "react";
import {
  ResetPasswordFormValues,
  resetPasswordSchema,
} from "@/lib/schemas/auth";
import { AuthForm, FormFieldConfig } from "@/components/shared/auth-form";
import { useRouter } from "next/navigation";
import { updatePassword } from "@/lib/actions/auth";
import { toast } from "sonner";
import { AppRoutes } from "@/lib/config/routes";

interface ResetPasswordFormProps {
  className?: string;
}

const defaultValues: ResetPasswordFormValues = {
  password: "",
  confirmPassword: "",
};

const resetPasswordFields: FormFieldConfig<ResetPasswordFormValues>[] = [
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

export const ResetPasswordForm: FC<ResetPasswordFormProps> = ({
  className,
}) => {
  const router = useRouter();

  async function onSubmit(values: ResetPasswordFormValues) {
    const result = await updatePassword(values.password);

    if (result && "error" in result) {
      toast.error(result.error);
    } else {
      toast.success("Пароль успешно обновлен! Вы вошли в систему.", {
        position: "top-right",
      });
      router.push(AppRoutes.TODOS);
    }
  }

  return (
    <AuthForm
      title="Введите новый пароль"
      schema={resetPasswordSchema}
      defaultValues={defaultValues}
      formId="reset-password-form"
      onSubmit={onSubmit}
      fields={resetPasswordFields}
      showFooter={false}
      className={className}
    />
  );
};
