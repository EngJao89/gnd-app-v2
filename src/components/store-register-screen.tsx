"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import { useMemo } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"

import { AppScreenShell } from "@/components/app-screen-shell"
import {
  FormFieldInput,
  FormRootError,
} from "@/components/form/form-field-input"
import { Button } from "@/components/ui/button"
import { FieldGroup } from "@/components/ui/field"
import { Link, useRouter } from "@/i18n/navigation"
import { getApiErrorMessage } from "@/lib/api-error"
import {
  appBackLinkClassName,
  appFormInputClassName,
  appFormRootErrorClassName,
} from "@/lib/app-styles"
import { type StoreFormData, createStoreSchema } from "@/lib/schemas/store"
import { createStore } from "@/services/stores"

export function StoreRegisterScreen() {
  const t = useTranslations("StoreRegister")
  const tValidation = useTranslations("Validation")
  const tCommon = useTranslations("Common")
  const router = useRouter()

  const storeSchema = useMemo(
    () => createStoreSchema(tValidation),
    [tValidation]
  )

  const fields: {
    name: keyof StoreFormData
    label: string
    placeholder?: string
    autoComplete?: string
    maxLength?: number
  }[] = [
    {
      name: "name",
      label: t("name"),
      placeholder: t("placeholders.name"),
    },
    {
      name: "legalName",
      label: t("legalName"),
      placeholder: t("placeholders.legalName"),
    },
    {
      name: "cnpj",
      label: t("cnpj"),
      placeholder: t("placeholders.cnpj"),
    },
    {
      name: "ownerName",
      label: t("ownerName"),
      placeholder: t("placeholders.ownerName"),
    },
    {
      name: "street",
      label: t("street"),
      placeholder: t("placeholders.street"),
    },
    {
      name: "numberOrBlock",
      label: t("numberOrBlock"),
      placeholder: t("placeholders.numberOrBlock"),
    },
    {
      name: "neighborhood",
      label: t("neighborhood"),
      placeholder: t("placeholders.neighborhood"),
    },
    {
      name: "city",
      label: t("city"),
      placeholder: t("placeholders.city"),
    },
    {
      name: "state",
      label: t("state"),
      placeholder: t("placeholders.state"),
      maxLength: 2,
    },
    {
      name: "zipCode",
      label: t("zipCode"),
      placeholder: t("placeholders.zipCode"),
    },
  ]

  const form = useForm<StoreFormData>({
    resolver: zodResolver(storeSchema),
    defaultValues: {
      name: "",
      legalName: "",
      cnpj: "",
      ownerName: "",
      street: "",
      numberOrBlock: "",
      neighborhood: "",
      city: "",
      state: "",
      zipCode: "",
    },
  })

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = form

  async function onSubmit(data: StoreFormData) {
    try {
      await createStore({
        ...data,
        state: data.state.toUpperCase(),
      })

      toast.success(t("success"))
      router.push("/products")
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
    <AppScreenShell>
      <form
        className="flex flex-1 flex-col px-6 pb-10 pt-8"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <h1 className="text-xl font-bold text-foreground">{t("title")}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{t("subtitle")}</p>

        <FieldGroup className="mt-6">
          {fields.map((field) => (
            <FormFieldInput
              key={field.name}
              control={control}
              name={field.name}
              id={field.name}
              label={field.label}
              autoComplete={field.autoComplete}
              placeholder={field.placeholder}
              maxLength={field.maxLength}
              disabled={isSubmitting}
              inputClassName={appFormInputClassName}
            />
          ))}
        </FieldGroup>

        <FormRootError
          message={errors.root?.message}
          className={appFormRootErrorClassName}
        />

        <div className="mt-8 flex flex-col gap-4">
          <Button type="submit" disabled={isSubmitting} className="h-11">
            {isSubmitting ? t("submitting") : t("submit")}
          </Button>

          <Button asChild variant="link" className={appBackLinkClassName}>
            <Link href="/">{tCommon("back")}</Link>
          </Button>
        </div>
      </form>
    </AppScreenShell>
  )
}
