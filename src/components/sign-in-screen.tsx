"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import { useMemo } from "react"
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
import { Link, useRouter } from "@/i18n/navigation"
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
  createSignInSchema,
} from "@/lib/schemas/sign-in"
import { cn } from "@/lib/utils"
import { signIn } from "@/services/auth"

export function SignInScreen() {
  const t = useTranslations("SignIn")
  const tValidation = useTranslations("Validation")
  const tCommon = useTranslations("Common")
  const router = useRouter()

  const signInSchema = useMemo(
    () => createSignInSchema(tValidation),
    [tValidation]
  )

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
      toast.success(t("success"))
      router.push("/products")
    } catch (error) {
      const message = getApiErrorMessage(
        error,
        t("invalidCredentials"),
        tCommon("networkError")
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
            label={t("email")}
            type="email"
            autoComplete="email"
            placeholder={t("emailPlaceholder")}
            disabled={isSubmitting}
            labelClassName={authLabelClassName}
            inputClassName={authInputClassName}
            errorClassName={authFieldErrorClassName}
          />

          <FormFieldInput
            control={control}
            name="password"
            id="password"
            label={t("password")}
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
                  {t("rememberMe")}
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
            {isSubmitting ? t("loggingIn") : t("logIn")}
          </Button>

          <Button asChild variant="link" className={authBackLinkClassName}>
            <Link href="/">{tCommon("back")}</Link>
          </Button>
        </div>
      </form>
    </AuthScreenShell>
  )
}
