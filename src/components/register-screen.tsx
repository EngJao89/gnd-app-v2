"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useRouter } from "next/navigation"
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
  registerSchema,
} from "@/lib/schemas/register"
import { createUser } from "@/services/users"

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
    label: "First Name",
    type: "text",
    autoComplete: "given-name",
  },
  {
    name: "surname",
    id: "surname",
    label: "Surname",
    type: "text",
    autoComplete: "family-name",
  },
  {
    name: "email",
    id: "email",
    label: "Email",
    type: "email",
    autoComplete: "email",
    placeholder: "usuario@email.com",
  },
  {
    name: "password",
    id: "password",
    label: "Password",
    type: "password",
    autoComplete: "new-password",
  },
  {
    name: "phone",
    id: "phone",
    label: "Phone number",
    type: "tel",
    autoComplete: "tel",
    placeholder: "+61",
  },
]

export function RegisterScreen() {
  const router = useRouter()

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

      toast.success("Account created successfully!")
      router.push("/sign-in")
    } catch (error) {
      const message = getApiErrorMessage(
        error,
        "Failed to register. Please try again."
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
            {isSubmitting ? "Registering..." : "Register Client"}
          </Button>

          <Button asChild variant="link" className={authBackLinkClassName}>
            <Link href="/">Back</Link>
          </Button>
        </div>
      </form>
    </AuthScreenShell>
  )
}
