import { z } from "zod"

export const storeSignInSchema = z.object({
  cnpj: z.string().min(1, "CNPJ is required"),
  password: z.string().min(1, "Password is required"),
})

export type StoreSignInFormData = z.infer<typeof storeSignInSchema>
