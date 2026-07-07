"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"

import { AppScreenShell } from "@/components/app-screen-shell"
import {
  FormFieldInput,
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
import { type StoreFormData, storeSchema } from "@/lib/schemas/store"
import { createStore } from "@/services/stores"

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

      toast.success("Store registered successfully!")
      router.push("/products")
    } catch (error) {
      const message = getApiErrorMessage(
        error,
        "Failed to register store. Please try again."
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
        <h1 className="text-xl font-bold text-foreground">Register Store</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Fill in the store details below.
        </p>

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
