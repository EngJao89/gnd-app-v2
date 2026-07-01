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
import { Input } from "@/components/ui/input"
import { getApiErrorMessage } from "@/lib/api-error"
import {
  authActionButtonClassName,
  authBackLinkClassName,
  authInputClassName,
  authLabelClassName,
} from "@/lib/auth-styles"
import {
  type RegisterFormData,
  registerSchema,
} from "@/lib/schemas/register"
import { cn } from "@/lib/utils"
import { createUser } from "@/services/users"

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
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="first-name" className={authLabelClassName}>
              First Name
            </label>
            <Input
              id="first-name"
              type="text"
              autoComplete="given-name"
              aria-invalid={!!errors.firstName}
              disabled={isSubmitting}
              className={cn(
                authInputClassName,
                errors.firstName && "border-red-300"
              )}
              {...register("firstName")}
            />
            {errors.firstName ? (
              <p className="text-sm font-medium text-red-100">
                {errors.firstName.message}
              </p>
            ) : null}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="surname" className={authLabelClassName}>
              Surname
            </label>
            <Input
              id="surname"
              type="text"
              autoComplete="family-name"
              aria-invalid={!!errors.surname}
              disabled={isSubmitting}
              className={cn(
                authInputClassName,
                errors.surname && "border-red-300"
              )}
              {...register("surname")}
            />
            {errors.surname ? (
              <p className="text-sm font-medium text-red-100">
                {errors.surname.message}
              </p>
            ) : null}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className={authLabelClassName}>
              Email
            </label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="usuario@email.com"
              aria-invalid={!!errors.email}
              disabled={isSubmitting}
              className={cn(authInputClassName, errors.email && "border-red-300")}
              {...register("email")}
            />
            {errors.email ? (
              <p className="text-sm font-medium text-red-100">
                {errors.email.message}
              </p>
            ) : null}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password" className={authLabelClassName}>
              Password
            </label>
            <Input
              id="password"
              type="password"
              autoComplete="new-password"
              aria-invalid={!!errors.password}
              disabled={isSubmitting}
              className={cn(
                authInputClassName,
                errors.password && "border-red-300"
              )}
              {...register("password")}
            />
            {errors.password ? (
              <p className="text-sm font-medium text-red-100">
                {errors.password.message}
              </p>
            ) : null}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="phone" className={authLabelClassName}>
              Phone number
            </label>
            <Input
              id="phone"
              type="tel"
              autoComplete="tel"
              placeholder="+61"
              aria-invalid={!!errors.phone}
              disabled={isSubmitting}
              className={cn(authInputClassName, errors.phone && "border-red-300")}
              {...register("phone")}
            />
            {errors.phone ? (
              <p className="text-sm font-medium text-red-100">
                {errors.phone.message}
              </p>
            ) : null}
          </div>
        </div>

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
            {isSubmitting ? "Registering..." : "Register"}
          </Button>

          <Button asChild variant="link" className={authBackLinkClassName}>
            <Link href="/">Back</Link>
          </Button>
        </div>
      </form>
    </AuthScreenShell>
  )
}
