"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { isAxiosError } from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
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

          <FormFieldTextarea
            control={control}
            name="description"
            id="description"
            label="Description"
            placeholder="Camiseta 100% algodão"
            disabled={isSubmitting}
            inputClassName={appFormInputClassName}
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

          <FormFieldFile
            control={control}
            name="image"
            id="image"
            label="Image"
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
