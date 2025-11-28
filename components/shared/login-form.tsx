"use client";

// import { FC } from "react";
// import { useForm, Controller } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import {
//   Button,
//   Input,
//   Spinner,
//   Card,
//   CardContent,
//   FieldGroup,
//   Field,
//   FieldLabel,
//   FieldError,
//   CardFooter,
// } from "@/components/ui";
// import { cn } from "@/lib/utils";
// import { toast } from "sonner";
// import Link from "next/link";
// import { PawPrint } from "lucide-react";
// import { LoginFormValues, loginSchema } from "@/lib/schemas/auth";
// import { Title } from "@/components/shared/title";
//
// const defaultValues: LoginFormValues = {
//   email: "",
//   password: "",
// };
//
// interface LoginFormProps {
//   className?: string;
// }
//
// export const LoginForm: FC<LoginFormProps> = ({ className }) => {
//   const form = useForm<LoginFormValues>({
//     resolver: zodResolver(loginSchema),
//     defaultValues,
//   });
//
//   function onSubmit(values: LoginFormValues) {
//     console.log(values);
//   }
//
//   const isSubmitting = form.formState.isSubmitting;
//
//   return (
//     <div
//       className={cn(
//         "flex flex-col justify-center items-center w-full h-full mx-auto px-4 font-rubik",
//         className,
//       )}
//     >
//       <Title text="Вход" size="2xl" />
//       <Card className="w-full max-w-2xl bg-blue-100/80 dark:bg-gray-900/80">
//         <CardContent>
//           <form
//             id="login-form"
//             onSubmit={form.handleSubmit(onSubmit)}
//             className="space-y-6 w-full"
//           >
//             <FieldGroup>
//               <Controller
//                 name="email"
//                 control={form.control}
//                 render={({ field, fieldState }) => (
//                   <Field data-invalid={fieldState.invalid}>
//                     <FieldLabel htmlFor="login-form-email">Логин</FieldLabel>
//                     <Input
//                       {...field}
//                       id="login-form-email"
//                       type="email"
//                       aria-invalid={fieldState.invalid}
//                       placeholder="Например, you@dog.com"
//                       autoComplete="off"
//                       disabled={isSubmitting}
//                       className="w-full"
//                     />
//                     {fieldState.invalid && (
//                       <FieldError errors={[fieldState.error]} />
//                     )}
//                   </Field>
//                 )}
//               ></Controller>
//               <Controller
//                 name="password"
//                 control={form.control}
//                 render={({ field, fieldState }) => (
//                   <Field data-invalid={fieldState.invalid}>
//                     <FieldLabel htmlFor="login-form-password">
//                       Пароль
//                     </FieldLabel>
//                     <Input
//                       {...field}
//                       id="login-form-password"
//                       type="password"
//                       aria-invalid={fieldState.invalid}
//                       placeholder="••••••••"
//                       autoComplete="off"
//                       disabled={isSubmitting}
//                       className="w-full"
//                     />
//                     {fieldState.invalid && (
//                       <FieldError errors={[fieldState.error]} />
//                     )}
//                   </Field>
//                 )}
//               ></Controller>
//             </FieldGroup>
//           </form>
//         </CardContent>
//         <CardFooter className="flex flex-col gap-4 text-xs text-center">
//           <Field>
//             <Button
//               type="submit"
//               form="login-form"
//               disabled={isSubmitting}
//               size="lg"
//               className="w-full text-xl"
//             >
//               {isSubmitting ? <Spinner /> : <PawPrint />}
//             </Button>
//             <Link
//               href={""}
//               onClick={() => toast("Не забывайте", { position: "top-right" })}
//             >
//               Забыли пароль?
//             </Link>
//             <p>
//               Нет аккаунта?{" "}
//               <Link href="/signup" className="text-orange-500 hover:underline">
//                 Зарегистрироваться
//               </Link>
//             </p>
//           </Field>
//         </CardFooter>
//       </Card>
//     </div>
//   );
// };

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
