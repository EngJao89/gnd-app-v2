"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"

import { AuthScreenShell } from "@/components/auth-screen-shell"
import { BrandLogo } from "@/components/brand-logo"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { getApiErrorMessage } from "@/lib/api-error"
import {
  authActionButtonClassName,
  authBackLinkClassName,
  authFieldErrorClassName,
  authInputClassName,
  authLabelClassName,
} from "@/lib/auth-styles"
import {
  type RegisterFormData,
  registerSchema,
} from "@/lib/schemas/register"
import { cn } from "@/lib/utils"
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
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      surname: "",
      email: "",
      password: "",
      phone: "",
    },
  })

  async function onSubmit(data: RegisterFormData) {
    setErrorMessage(null)

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

      setErrorMessage(message)
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
            <Field key={field.name} data-invalid={!!errors[field.name]}>
              <FieldLabel htmlFor={field.id} className={authLabelClassName}>
                {field.label}
              </FieldLabel>
              <Input
                id={field.id}
                type={field.type}
                autoComplete={field.autoComplete}
                placeholder={field.placeholder}
                aria-invalid={!!errors[field.name]}
                disabled={isSubmitting}
                className={cn(
                  authInputClassName,
                  errors[field.name] && "border-red-300"
                )}
                {...register(field.name)}
              />
              <FieldError
                className={authFieldErrorClassName}
                errors={[errors[field.name]]}
              />
            </Field>
          ))}
        </FieldGroup>

        {errorMessage ? (
          <p
            role="alert"
            className="mt-4 rounded-2xl border border-red-200 bg-white px-4 py-3 text-center text-sm font-medium text-red-600"
          >
            {errorMessage}
          </p>
        ) : null}

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
