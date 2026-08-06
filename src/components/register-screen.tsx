"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import { useMemo } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"

import { AuthScreenShell } from "@/components/auth-screen-shell"
import { BrandLogo } from "@/components/brand-logo"
import {
  FormFieldInput,
  FormRootError,
} from "@/components/form/form-field-input"
import { Button } from "@/components/ui/button"
import { FieldGroup } from "@/components/ui/field"
import { Link, useRouter } from "@/i18n/navigation"
import { getApiErrorMessage } from "@/lib/api-error"
import {
  authActionButtonClassName,
  authBackLinkClassName,
  authFieldErrorClassName,
  authFormRootErrorClassName,
  authInputClassName,
  authLabelClassName,
} from "@/lib/auth-styles"
import {
  type RegisterFormData,
  createRegisterSchema,
} from "@/lib/schemas/register"
import { createUser } from "@/services/users"

export function RegisterScreen() {
  const t = useTranslations("Register")
  const tValidation = useTranslations("Validation")
  const tCommon = useTranslations("Common")
  const router = useRouter()

  const registerSchema = useMemo(
    () => createRegisterSchema(tValidation),
    [tValidation]
  )

  const fields: {
    name: keyof RegisterFormData
    id: string
    label: string
    type: string
    autoComplete?: string
    placeholder?: string
  }[] = [
    {
      name: "firstName",
      id: "first-name",
      label: t("firstName"),
      type: "text",
      autoComplete: "given-name",
    },
    {
      name: "surname",
      id: "surname",
      label: t("surname"),
      type: "text",
      autoComplete: "family-name",
    },
    {
      name: "email",
      id: "email",
      label: t("email"),
      type: "email",
      autoComplete: "email",
      placeholder: t("emailPlaceholder"),
    },
    {
      name: "password",
      id: "password",
      label: t("password"),
      type: "password",
      autoComplete: "new-password",
    },
    {
      name: "phone",
      id: "phone",
      label: t("phone"),
      type: "tel",
      autoComplete: "tel",
      placeholder: t("phonePlaceholder"),
    },
  ]

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      surname: "",
      email: "",
      password: "",
      phone: "",
    },
  })

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = form

  async function onSubmit(data: RegisterFormData) {
    try {
      await createUser({
        name: `${data.firstName} ${data.surname}`.trim(),
        email: data.email,
        phone: data.phone,
        password: data.password,
      })

      toast.success(t("success"))
      router.push("/sign-in")
    } catch (error) {
      const message = getApiErrorMessage(
        error,
        t("error"),
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
          {fields.map((field) => (
            <FormFieldInput
              key={field.name}
              control={control}
              name={field.name}
              id={field.id}
              label={field.label}
              type={field.type}
              autoComplete={field.autoComplete}
              placeholder={field.placeholder}
              disabled={isSubmitting}
              labelClassName={authLabelClassName}
              inputClassName={authInputClassName}
              errorClassName={authFieldErrorClassName}
            />
          ))}
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
            {isSubmitting ? t("submitting") : t("submit")}
          </Button>

          <Button asChild variant="link" className={authBackLinkClassName}>
            <Link href="/">{tCommon("back")}</Link>
          </Button>
        </div>
      </form>
    </AuthScreenShell>
  )
}
