import { z } from "zod"

export const storeSchema = z.object({
  name: z.string().min(1, "Store name is required"),
  legalName: z.string().min(1, "Legal name is required"),
  cnpj: z.string().min(1, "CNPJ is required"),
  ownerName: z.string().min(1, "Owner name is required"),
  street: z.string().min(1, "Street is required"),
  numberOrBlock: z.string().min(1, "Number or block is required"),
  neighborhood: z.string().min(1, "Neighborhood is required"),
  city: z.string().min(1, "City is required"),
  state: z
    .string()
    .min(2, "State is required")
    .max(2, "State must be 2 characters"),
  zipCode: z.string().min(1, "Zip code is required"),
})

export type StoreFormData = z.infer<typeof storeSchema>
