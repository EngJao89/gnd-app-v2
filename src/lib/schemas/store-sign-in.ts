import { z } from "zod"

export const storeSignInSchema = z.object({
  email: z.email("Invalid email"),
  password: z.string().min(1, "Password is required"),
})

export type StoreSignInFormData = z.infer<typeof storeSignInSchema>
