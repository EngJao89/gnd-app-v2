"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { type FormEvent, useState } from "react"
import { toast } from "react-toastify"

import { AuthScreenShell } from "@/components/auth-screen-shell"
import { BrandLogo } from "@/components/brand-logo"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { getApiErrorMessage } from "@/lib/api-error"
import {
  authActionButtonClassName,
  authBackLinkClassName,
  authCheckboxClassName,
  authInputClassName,
  authLabelClassName,
} from "@/lib/auth-styles"
import { signIn } from "@/services/auth"
import { cn } from "@/lib/utils"

export function SignInScreen() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const email = String(formData.get("email") ?? "")
    const password = String(formData.get("password") ?? "")

    setIsLoading(true)
    setErrorMessage(null)

    try {
      await signIn({ email, password })
      toast.success("Login successful!")
      router.push("/products")
    } catch (error) {
      const message = getApiErrorMessage(
        error,
        "Invalid email or password."
      )

      setErrorMessage(message)
      toast.error(message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthScreenShell>
      <div className="flex justify-center">
        <BrandLogo size="compact" />
      </div>

      <form
        className="mt-10 flex flex-1 flex-col"
        onSubmit={handleSubmit}
      >
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="email" className={authLabelClassName}>
              Email
            </FieldLabel>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="usuario@email.com"
              required
              disabled={isLoading}
              className={authInputClassName}
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="password" className={authLabelClassName}>
              Password
            </FieldLabel>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              disabled={isLoading}
              className={authInputClassName}
            />
          </Field>

          <Field orientation="horizontal" className="items-center">
            <FieldLabel
              htmlFor="remember-me"
              className={cn(authLabelClassName, "font-normal")}
            >
              Remember me
            </FieldLabel>
            <Checkbox
              id="remember-me"
              name="rememberMe"
              disabled={isLoading}
              className={authCheckboxClassName}
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
            disabled={isLoading}
            className={authActionButtonClassName}
          >
            {isLoading ? "Logging in..." : "Log in"}
          </Button>

          <Button asChild variant="link" className={authBackLinkClassName}>
            <Link href="/">Back</Link>
          </Button>
        </div>
      </form>
    </AuthScreenShell>
  )
}
