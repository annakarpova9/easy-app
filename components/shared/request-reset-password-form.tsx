"use client";

import { FC } from "react";
import {
  RequestResetPasswordFormValues,
  requestResetPasswordSchema,
} from "@/lib/schemas/auth";
import { AuthForm, FormFieldConfig } from "@/components/shared/auth-form";
import { requestPasswordReset } from "@/lib/actions/auth";
import { toast } from "sonner";

interface RequestResetPasswordFormProps {
  className?: string;
}

const defaultValues: RequestResetPasswordFormValues = {
  email: "",
};

const requestResetPasswordFields: FormFieldConfig<RequestResetPasswordFormValues>[] =
  [
    {
      name: "email",
      label: "Ваша почта",
      type: "email",
      placeholder: "Например, you@dog.com",
    },
  ];

export const RequestResetPasswordForm: FC<RequestResetPasswordFormProps> = ({
  className,
}) => {
  async function onSubmit(values: RequestResetPasswordFormValues) {
    const formData = new FormData();
    formData.append("email", values.email);

    const result = await requestPasswordReset(formData);

    if (result && "error" in result) {
      toast.error(result.error, { position: "top-right" });
    }
  }

  return (
    <AuthForm
      title="Почта для сброса пароля"
      schema={requestResetPasswordSchema}
      defaultValues={defaultValues}
      formId="request-reset-password-form"
      onSubmit={onSubmit}
      fields={requestResetPasswordFields}
      showFooter={false}
      className={className}
    />
  );
};
