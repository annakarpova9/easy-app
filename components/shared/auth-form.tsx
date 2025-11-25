"use client";

import {
  FieldValues,
  SubmitHandler,
  Path,
  useForm,
  DefaultValues,
  Controller,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { ZodType } from "zod";
import { Title } from "@/components/shared/title";
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  Input,
  Spinner,
} from "@/components/ui";
import Link from "next/link";
import { toast } from "sonner";
import { PawPrint } from "lucide-react";

export type FormFieldConfig<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  type: string;
  placeholder: string;
  autoComplete?: string;
};

interface AuthFormProps<T extends FieldValues> {
  className?: string;
  title: string;
  schema: ZodType<T>;
  defaultValues: DefaultValues<T>;
  formId: string;
  onSubmit: SubmitHandler<T>;
  fields: FormFieldConfig<T>[];
  footerText: string;
  footerLinkText: string;
  footerLinkHref: string;
  showForgotPassword?: boolean;
}

export const AuthForm = <T extends FieldValues>({
  className,
  title,
  schema,
  defaultValues,
  formId,
  onSubmit,
  fields,
  footerText,
  footerLinkText,
  footerLinkHref,
  showForgotPassword = false,
}: AuthFormProps<T>) => {
  const form = useForm<T>({
    resolver: zodResolver(schema as any),
    defaultValues,
  });

  const {
    control,
    formState: { isSubmitting },
  } = form;

  return (
    <div
      className={cn(
        "flex flex-col justify-center items-center w-full h-full mx-auto px-4 font-rubik",
        className,
      )}
    >
      <Title text={title} size="2xl" />
      <Card className="w-full max-w-2xl bg-blue-100/80 dark:bg-gray-900/80">
        <CardContent>
          <form
            id={formId}
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 w-full"
          >
            <FieldGroup>
              {fields.map((item) => (
                <Controller
                  key={item.name}
                  name={item.name}
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={`${formId}-${item.name}`}>
                        {item.label}
                      </FieldLabel>
                      <Input
                        {...field}
                        id={`${formId}-${item.name}`}
                        type={item.type}
                        aria-invalid={fieldState.invalid}
                        placeholder={item.placeholder}
                        autoComplete={item.autoComplete}
                        disabled={isSubmitting}
                        className="w-full"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                ></Controller>
              ))}
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-4 text-xs text-center">
          <Field>
            <Button
              type="submit"
              form={formId}
              disabled={isSubmitting}
              size="lg"
              className="w-full text-xl"
            >
              {isSubmitting ? <Spinner /> : <PawPrint />}
            </Button>
            {showForgotPassword && (
              <Link
                href={""}
                onClick={() => toast("Не забывайте", { position: "top-right" })}
              >
                Забыли пароль?
              </Link>
            )}
            <p className="text-sm text-center">
              {footerText}{" "}
              <Link
                href={footerLinkHref}
                className="text-orange-500 hover:underline"
              >
                {footerLinkText}
              </Link>
            </p>
          </Field>
        </CardFooter>
      </Card>
    </div>
  );
};
