"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"

import { AppScreenShell } from "@/components/app-screen-shell"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { getApiErrorMessage } from "@/lib/api-error"
import { appBackLinkClassName } from "@/lib/app-styles"
import { type ProductFormData, productSchema } from "@/lib/schemas/product"
import { cn } from "@/lib/utils"
import { createProduct } from "@/services/products"

const inputClassName =
  "h-11 w-full rounded-lg border border-input bg-white px-3"

export function AddProductScreen() {
  const router = useRouter()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      price: "",
      imageColor: "#4a2c6e",
    },
  })

  const imageColor = watch("imageColor")

  async function onSubmit(data: ProductFormData) {
    setErrorMessage(null)

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

      setErrorMessage(message)
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
        <h1 className="text-xl font-bold text-foreground">Add Product</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Fill in the product details below.
        </p>

        <FieldGroup className="mt-6">
          <Field data-invalid={!!errors.name}>
            <FieldLabel htmlFor="name">Product name</FieldLabel>
            <Input
              id="name"
              type="text"
              placeholder="Cadbury Dairy Milk Hazelnut Chocolate Block | 180g"
              aria-invalid={!!errors.name}
              disabled={isSubmitting}
              className={cn(inputClassName, errors.name && "border-red-500")}
              {...register("name")}
            />
            <FieldError errors={[errors.name]} />
          </Field>

          <Field data-invalid={!!errors.price}>
            <FieldLabel htmlFor="price">Price</FieldLabel>
            <Input
              id="price"
              type="number"
              step="0.01"
              min="0"
              placeholder="5.00"
              aria-invalid={!!errors.price}
              disabled={isSubmitting}
              className={cn(inputClassName, errors.price && "border-red-500")}
              {...register("price")}
            />
            <FieldError errors={[errors.price]} />
          </Field>

          <Field data-invalid={!!errors.imageColor}>
            <FieldLabel htmlFor="imageColor">Image color</FieldLabel>
            <div className="flex items-center gap-3">
              <Input
                id="imageColor"
                type="text"
                placeholder="#4a2c6e"
                aria-invalid={!!errors.imageColor}
                disabled={isSubmitting}
                className={cn(
                  inputClassName,
                  errors.imageColor && "border-red-500"
                )}
                {...register("imageColor")}
              />
              <div
                className="size-11 shrink-0 rounded-lg border border-border"
                style={{ backgroundColor: imageColor || "#4a2c6e" }}
                aria-hidden
              />
            </div>
            <FieldError errors={[errors.imageColor]} />
          </Field>
        </FieldGroup>

        {errorMessage ? (
          <p
            role="alert"
            className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
          >
            {errorMessage}
          </p>
        ) : null}

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
