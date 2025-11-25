"use client";

// import { FC } from "react";
// import { SignupFormValues, signupSchema } from "@/lib/schemas/auth";
// import { Controller, useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { cn } from "@/lib/utils";
// import {
//   Button,
//   Card,
//   CardContent,
//   CardFooter,
//   Field,
//   FieldError,
//   FieldGroup,
//   FieldLabel,
//   Input,
//   Spinner,
// } from "@/components/ui";
// import { PawPrint } from "lucide-react";
// import Link from "next/link";
// import { Title } from "@/components/shared/title";
//
// interface SignupFormProps {
//   className?: string;
// }
//
// const defaultValues: SignupFormValues = {
//   name: "",
//   email: "",
//   password: "",
//   confirmPassword: "",
// };
//
// export const SignupForm: FC<SignupFormProps> = ({ className }) => {
//   const form = useForm<SignupFormValues>({
//     resolver: zodResolver(signupSchema),
//     defaultValues,
//   });
//
//   function onSubmit(values: SignupFormValues) {
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
//       <Title text="Регистрация" size="2xl" />
//       <Card className="w-full max-w-2xl bg-blue-100/80 dark:bg-gray-900/80">
//         <CardContent>
//           <form
//             id="signup-form"
//             onSubmit={form.handleSubmit(onSubmit)}
//             className="space-y-6 w-full"
//           >
//             <FieldGroup>
//               <Controller
//                 name="name"
//                 control={form.control}
//                 render={({ field, fieldState }) => (
//                   <Field data-invalid={fieldState.invalid}>
//                     <FieldLabel htmlFor="signup-form-name">Ваше имя</FieldLabel>
//                     <Input
//                       {...field}
//                       id="signup-form-name"
//                       type="name"
//                       aria-invalid={fieldState.invalid}
//                       placeholder="Например, Боб"
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
//                 name="email"
//                 control={form.control}
//                 render={({ field, fieldState }) => (
//                   <Field data-invalid={fieldState.invalid}>
//                     <FieldLabel htmlFor="signup-form-email">Логин</FieldLabel>
//                     <Input
//                       {...field}
//                       id="signup-form-email"
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
//                     <FieldLabel htmlFor="signup-form-password">
//                       Пароль
//                     </FieldLabel>
//                     <Input
//                       {...field}
//                       id="signup-form-password"
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
//               <Controller
//                 name="confirmPassword"
//                 control={form.control}
//                 render={({ field, fieldState }) => (
//                   <Field data-invalid={fieldState.invalid}>
//                     <FieldLabel htmlFor="signup-form-confirmPassword">
//                       Повторите пароль
//                     </FieldLabel>
//                     <Input
//                       {...field}
//                       id="signup-form-confirmPassword"
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
//               form="signup-form"
//               disabled={isSubmitting}
//               size="lg"
//               className="w-full text-xl"
//             >
//               {isSubmitting ? <Spinner /> : <PawPrint />}
//             </Button>
//
//             <p className="text-sm text-center">
//               Уже есть аккаунт?{" "}
//               <Link href="/login" className="text-orange-500 hover:underline">
//                 Войти
//               </Link>
//             </p>
//           </Field>
//         </CardFooter>
//       </Card>
//     </div>
//   );
// };

import { SignupFormValues, signupSchema } from "@/lib/schemas/auth";
import { FC } from "react";
import { AuthForm, FormFieldConfig } from "@/components/shared/auth-form";
import { signup } from "@/lib/actions/auth";

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

    await signup(formData);
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
      footerLinkHref="/login"
      className={className}
    />
  );
};
