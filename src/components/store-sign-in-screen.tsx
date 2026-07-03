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
  type StoreSignInFormData,
  storeSignInSchema,
} from "@/lib/schemas/store-sign-in"
import { cn } from "@/lib/utils"
import { storeSignIn } from "@/services/store-auth"

export function StoreSignInScreen() {
  const router = useRouter()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<StoreSignInFormData>({
    resolver: zodResolver(storeSignInSchema),
    defaultValues: {
      cnpj: "",
      password: "",
    },
  })

  async function onSubmit(data: StoreSignInFormData) {
    setErrorMessage(null)

    try {
      await storeSignIn(data)
      toast.success("Store login successful!")
      router.push("/products")
    } catch (error) {
      const message = getApiErrorMessage(
        error,
        "Invalid CNPJ or password."
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
          <Field data-invalid={!!errors.cnpj}>
            <FieldLabel htmlFor="cnpj" className={authLabelClassName}>
              CNPJ
            </FieldLabel>
            <Input
              id="cnpj"
              type="text"
              autoComplete="off"
              placeholder="12.345.678/0001-90"
              aria-invalid={!!errors.cnpj}
              disabled={isSubmitting}
              className={cn(
                authInputClassName,
                errors.cnpj && "border-red-300"
              )}
              {...register("cnpj")}
            />
            <FieldError
              className={authFieldErrorClassName}
              errors={[errors.cnpj]}
            />
          </Field>

          <Field data-invalid={!!errors.password}>
            <FieldLabel htmlFor="password" className={authLabelClassName}>
              Password
            </FieldLabel>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              aria-invalid={!!errors.password}
              disabled={isSubmitting}
              className={cn(
                authInputClassName,
                errors.password && "border-red-300"
              )}
              {...register("password")}
            />
            <FieldError
              className={authFieldErrorClassName}
              errors={[errors.password]}
            />
          </Field>
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
