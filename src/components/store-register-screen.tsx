"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"

import { AppScreenShell } from "@/components/app-screen-shell"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { getApiErrorMessage } from "@/lib/api-error"
import { appBackLinkClassName } from "@/lib/app-styles"
import { type StoreFormData, storeSchema } from "@/lib/schemas/store"
import { cn } from "@/lib/utils"
import { createStore } from "@/services/stores"

const labelClassName = "text-sm font-medium text-foreground"
const inputClassName =
  "h-11 w-full rounded-lg border border-input bg-white px-3"

const fields: {
  name: keyof StoreFormData
  label: string
  placeholder?: string
  autoComplete?: string
  maxLength?: number
}[] = [
  { name: "name", label: "Store name", placeholder: "Loja GND Centro" },
  {
    name: "legalName",
    label: "Legal name",
    placeholder: "GND Comércio Ltda",
  },
  {
    name: "cnpj",
    label: "CNPJ",
    placeholder: "12.345.678/0001-90",
  },
  {
    name: "ownerName",
    label: "Owner name",
    placeholder: "Maria Silva",
  },
  { name: "street", label: "Street", placeholder: "Rua das Flores" },
  {
    name: "numberOrBlock",
    label: "Number or block",
    placeholder: "123",
  },
  {
    name: "neighborhood",
    label: "Neighborhood",
    placeholder: "Centro",
  },
  { name: "city", label: "City", placeholder: "São Paulo" },
  {
    name: "state",
    label: "State",
    placeholder: "SP",
    maxLength: 2,
  },
  {
    name: "zipCode",
    label: "Zip code",
    placeholder: "01310-100",
  },
]

export function StoreRegisterScreen() {
  const router = useRouter()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<StoreFormData>({
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

  async function onSubmit(data: StoreFormData) {
    setErrorMessage(null)

    try {
      await createStore({
        ...data,
        state: data.state.toUpperCase(),
      })

      toast.success("Store registered successfully!")
      router.push("/products")
    } catch (error) {
      const message = getApiErrorMessage(
        error,
        "Failed to register store. Please try again."
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
        <h1 className="text-xl font-bold text-foreground">Register Store</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Fill in the store details below.
        </p>

        <div className="mt-6 flex flex-col gap-4">
          {fields.map((field) => (
            <div key={field.name} className="flex flex-col gap-2">
              <label htmlFor={field.name} className={labelClassName}>
                {field.label}
              </label>
              <Input
                id={field.name}
                type="text"
                autoComplete={field.autoComplete}
                placeholder={field.placeholder}
                maxLength={field.maxLength}
                aria-invalid={!!errors[field.name]}
                disabled={isSubmitting}
                className={cn(
                  inputClassName,
                  errors[field.name] && "border-red-500"
                )}
                {...register(field.name)}
              />
              {errors[field.name] ? (
                <p className="text-sm text-red-600">
                  {errors[field.name]?.message}
                </p>
              ) : null}
            </div>
          ))}
        </div>

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
            {isSubmitting ? "Registering..." : "Register Store"}
          </Button>

          <Button asChild variant="link" className={appBackLinkClassName}>
            <Link href="/">Back</Link>
          </Button>
        </div>
      </form>
    </AppScreenShell>
  )
}
