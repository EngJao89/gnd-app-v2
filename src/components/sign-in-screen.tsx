"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Controller, useForm } from "react-hook-form"
import { toast } from "react-toastify"

import { AuthScreenShell } from "@/components/auth-screen-shell"
import { BrandLogo } from "@/components/brand-logo"
import {
  FormFieldInput,
  FormRootError,
} from "@/components/form/form-field-input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { getApiErrorMessage } from "@/lib/api-error"
import {
  authActionButtonClassName,
  authBackLinkClassName,
  authCheckboxClassName,
  authFieldErrorClassName,
  authFormRootErrorClassName,
  authInputClassName,
  authLabelClassName,
} from "@/lib/auth-styles"
import {
  type SignInFormData,
  signInSchema,
} from "@/lib/schemas/sign-in"
import { cn } from "@/lib/utils"
import { signIn } from "@/services/auth"

export function SignInScreen() {
  const router = useRouter()

  const form = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  })

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = form

  async function onSubmit(data: SignInFormData) {
    try {
      await signIn({ email: data.email, password: data.password })
      toast.success("Login successful!")
      router.push("/products")
    } catch (error) {
      const message = getApiErrorMessage(
        error,
        "Invalid email or password."
      )

      form.setError("root", { message })
      toast.error(message)
    }
  }

  return (
    <AuthScreenShell>
      <div className="flex justify-center">
        <BrandLogo size="compact" />
      </div>

      <form
        className="mt-10 flex flex-1 flex-col"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <FieldGroup>
          <FormFieldInput
            control={control}
            name="email"
            id="email"
            label="Email"
            type="email"
            autoComplete="email"
            placeholder="usuario@email.com"
            disabled={isSubmitting}
            labelClassName={authLabelClassName}
            inputClassName={authInputClassName}
            errorClassName={authFieldErrorClassName}
          />

          <FormFieldInput
            control={control}
            name="password"
            id="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            disabled={isSubmitting}
            labelClassName={authLabelClassName}
            inputClassName={authInputClassName}
            errorClassName={authFieldErrorClassName}
          />

          <Controller
            name="rememberMe"
            control={control}
            render={({ field }) => (
              <Field orientation="horizontal" className="items-center">
                <Checkbox
                  id="remember-me"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={isSubmitting}
                  className={authCheckboxClassName}
                />
                <FieldLabel
                  htmlFor="remember-me"
                  className={cn(authLabelClassName, "font-normal")}
                >
                  Remember me
                </FieldLabel>
              </Field>
            )}
          />
        </FieldGroup>

        <FormRootError
          message={errors.root?.message}
          className={authFormRootErrorClassName}
        />

        <div className="mt-auto flex flex-col gap-4 pt-8">
          <Button
            type="submit"
            disabled={isSubmitting}
            className={authActionButtonClassName}
          >
            {isSubmitting ? "Logging in..." : "Log in"}
          </Button>

          <Button asChild variant="link" className={authBackLinkClassName}>
            <Link href="/">Back</Link>
          </Button>
        </div>
      </form>
    </AuthScreenShell>
  )
}
