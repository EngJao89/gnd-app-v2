"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { isAxiosError } from "axios"
import { useTranslations } from "next-intl"
import { useMemo } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"

import { useRequireStoreSession } from "@/hooks/use-store-session"
import { AppScreenShell } from "@/components/app-screen-shell"
import {
  FormFieldFile,
  FormFieldInput,
  FormFieldTextarea,
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
import { type ProductFormData, createProductSchema } from "@/lib/schemas/product"
import { createProduct } from "@/services/products"

export function AddProductScreen() {
  const t = useTranslations("AddProduct")
  const tValidation = useTranslations("Validation")
  const tCommon = useTranslations("Common")
  const router = useRouter()
  const isAuthorized = useRequireStoreSession()

  const productSchema = useMemo(
    () => createProductSchema(tValidation),
    [tValidation]
  )

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      price: "",
      description: "",
      brand: "",
      sector: "",
    },
  })

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = form

  async function onSubmit(data: ProductFormData) {
    const image = data.image[0]

    if (!image) {
      form.setError("image", { message: t("imageRequired") })
      return
    }

    try {
      await createProduct({
        name: data.name,
        price: Number(data.price),
        description: data.description,
        brand: data.brand,
        sector: data.sector,
        image,
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

      if (isAxiosError(error) && error.response?.status === 401) {
        router.replace("/stores/sign-in")
      }
    }
  }

  if (!isAuthorized) {
    return null
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
          <FormFieldInput
            control={control}
            name="name"
            id="name"
            label={t("name")}
            placeholder={t("placeholders.name")}
            disabled={isSubmitting}
            inputClassName={appFormInputClassName}
          />

          <FormFieldInput
            control={control}
            name="price"
            id="price"
            label={t("price")}
            type="number"
            placeholder={t("placeholders.price")}
            disabled={isSubmitting}
            inputClassName={appFormInputClassName}
          />

          <FormFieldTextarea
            control={control}
            name="description"
            id="description"
            label={t("description")}
            placeholder={t("placeholders.description")}
            disabled={isSubmitting}
            inputClassName={appFormInputClassName}
          />

          <FormFieldInput
            control={control}
            name="brand"
            id="brand"
            label={t("brand")}
            placeholder={t("placeholders.brand")}
            disabled={isSubmitting}
            inputClassName={appFormInputClassName}
          />

          <FormFieldInput
            control={control}
            name="sector"
            id="sector"
            label={t("sector")}
            placeholder={t("placeholders.sector")}
            disabled={isSubmitting}
            inputClassName={appFormInputClassName}
          />

          <FormFieldFile
            control={control}
            name="image"
            id="image"
            label={t("image")}
            accept="image/*"
            showImagePreview
            disabled={isSubmitting}
            inputClassName={appFormInputClassName}
          />
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
            <Link href="/products">{tCommon("back")}</Link>
          </Button>
        </div>
      </form>
    </AppScreenShell>
  )
}
