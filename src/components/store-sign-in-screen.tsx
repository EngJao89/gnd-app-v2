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
  type StoreSignInFormData,
  storeSignInSchema,
} from "@/lib/schemas/store-sign-in"
import { storeSignIn } from "@/services/store-auth"

export function StoreSignInScreen() {
  const router = useRouter()

  const form = useForm<StoreSignInFormData>({
    resolver: zodResolver(storeSignInSchema),
    defaultValues: {
      cnpj: "",
      password: "",
    },
  })

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = form

  async function onSubmit(data: StoreSignInFormData) {
    try {
      await storeSignIn(data)
      toast.success("Store login successful!")
      router.push("/products")
    } catch (error) {
      const message = getApiErrorMessage(
        error,
        "Invalid CNPJ or password."
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
            name="cnpj"
            id="cnpj"
            label="CNPJ"
            autoComplete="off"
            placeholder="12.345.678/0001-90"
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
