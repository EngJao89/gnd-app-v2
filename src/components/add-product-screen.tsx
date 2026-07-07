"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useRouter } from "next/navigation"
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
import { createProduct } from "@/services/products"

export function AddProductScreen() {
  const router = useRouter()
  const isAuthorized = useRequireStoreSession()

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      price: "",
      imageColor: "#4a2c6e",
    },
  })

  const {
    control,
    handleSubmit,
    watch,
    formState: { isSubmitting, errors },
  } = form

  const imageColor = watch("imageColor")

  async function onSubmit(data: ProductFormData) {
    try {
      await createProduct({
        name: data.name,
        price: Number(data.price),
        imageColor: data.imageColor,
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
            label="Product name"
            placeholder="Cadbury Dairy Milk Hazelnut Chocolate Block | 180g"
            disabled={isSubmitting}
            inputClassName={appFormInputClassName}
          />

          <FormFieldInput
            control={control}
            name="price"
            id="price"
            label="Price"
            type="number"
            placeholder="5.00"
            disabled={isSubmitting}
            inputClassName={appFormInputClassName}
          />

          <Controller
            name="imageColor"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="imageColor">Image color</FieldLabel>
                <div className="flex items-center gap-3">
                  <Input
                    {...field}
                    id="imageColor"
                    type="text"
                    placeholder="#4a2c6e"
                    aria-invalid={fieldState.invalid}
                    disabled={isSubmitting}
                    className={appFormInputClassName}
                  />
                  <div
                    className="size-11 shrink-0 rounded-lg border border-border"
                    style={{ backgroundColor: imageColor || "#4a2c6e" }}
                    aria-hidden
                  />
                </div>
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
