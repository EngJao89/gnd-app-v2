"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useMemo } from "react"
import { Controller, useForm } from "react-hook-form"
import { toast } from "react-toastify"

import { useRequireStoreSession } from "@/hooks/use-store-session"
import { AppScreenShell } from "@/components/app-screen-shell"
import {
  FormFieldInput,
  FormRootError,
} from "@/components/form/form-field-input"
import { Button } from "@/components/ui/button"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { getApiErrorMessage } from "@/lib/api-error"
import {
  appBackLinkClassName,
  appFormInputClassName,
  appFormRootErrorClassName,
} from "@/lib/app-styles"
import { type ProductFormData, productSchema } from "@/lib/schemas/product"
import { cn } from "@/lib/utils"
import { createProduct } from "@/services/products"

export function AddProductScreen() {
  const router = useRouter()
  const isAuthorized = useRequireStoreSession()

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
    watch,
    formState: { isSubmitting, errors },
  } = form

  const imageFiles = watch("image")
  const imagePreviewUrl = useMemo(() => {
    const file = imageFiles?.[0]

    if (!file) {
      return null
    }

    return URL.createObjectURL(file)
  }, [imageFiles])

  useEffect(() => {
    return () => {
      if (imagePreviewUrl) {
        URL.revokeObjectURL(imagePreviewUrl)
      }
    }
  }, [imagePreviewUrl])

  async function onSubmit(data: ProductFormData) {
    const image = data.image[0]

    if (!image) {
      form.setError("image", { message: "Image is required" })
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
      toast.success("Product added successfully!")
      router.push("/products")
    } catch (error) {
      const message = getApiErrorMessage(
        error,
        "Failed to add product. Please try again."
      )

      form.setError("root", { message })
      toast.error(message)
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
        <h1 className="text-xl font-bold text-foreground">Add Product</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Fill in the product details below.
        </p>

        <FieldGroup className="mt-6">
          <FormFieldInput
            control={control}
            name="name"
            id="name"
            label="Name"
            placeholder="Camiseta GND"
            disabled={isSubmitting}
            inputClassName={appFormInputClassName}
          />

          <FormFieldInput
            control={control}
            name="price"
            id="price"
            label="Price"
            type="number"
            placeholder="99.90"
            disabled={isSubmitting}
            inputClassName={appFormInputClassName}
          />

          <Controller
            name="description"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="description">Description</FieldLabel>
                <textarea
                  {...field}
                  id="description"
                  rows={3}
                  placeholder="Camiseta 100% algodão"
                  aria-invalid={fieldState.invalid}
                  disabled={isSubmitting}
                  className={cn(
                    appFormInputClassName,
                    "min-h-24 resize-none py-2"
                  )}
                />
                {fieldState.invalid ? (
                  <FieldError errors={[fieldState.error]} />
                ) : null}
              </Field>
            )}
          />

          <FormFieldInput
            control={control}
            name="brand"
            id="brand"
            label="Brand"
            placeholder="GND"
            disabled={isSubmitting}
            inputClassName={appFormInputClassName}
          />

          <FormFieldInput
            control={control}
            name="sector"
            id="sector"
            label="Sector"
            placeholder="Vestuário"
            disabled={isSubmitting}
            inputClassName={appFormInputClassName}
          />

          <Controller
            name="image"
            control={control}
            render={({ field: { onChange, onBlur, name, ref }, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="image">Image</FieldLabel>
                <Input
                  id="image"
                  name={name}
                  ref={ref}
                  type="file"
                  accept="image/*"
                  aria-invalid={fieldState.invalid}
                  disabled={isSubmitting}
                  className={appFormInputClassName}
                  onBlur={onBlur}
                  onChange={(event) => onChange(event.target.files)}
                />
                {imagePreviewUrl ? (
                  <div
                    className="mt-2 size-24 rounded-lg border border-border bg-cover bg-center"
                    style={{ backgroundImage: `url(${imagePreviewUrl})` }}
                    role="img"
                    aria-label="Product preview"
                  />
                ) : null}
                {fieldState.invalid ? (
                  <FieldError errors={[fieldState.error]} />
                ) : null}
              </Field>
            )}
          />
        </FieldGroup>

        <FormRootError
          message={errors.root?.message}
          className={appFormRootErrorClassName}
        />

        <div className="mt-8 flex flex-col gap-4">
          <Button type="submit" disabled={isSubmitting} className="h-11">
            {isSubmitting ? "Adding..." : "Add product"}
          </Button>

          <Button asChild variant="link" className={appBackLinkClassName}>
            <Link href="/products">Back</Link>
          </Button>
        </div>
      </form>
    </AppScreenShell>
  )
}
