import { z } from "zod"

type Translate = (key: string) => string

export function createStoreSignInSchema(t: Translate) {
  return z.object({
    email: z.email(t("invalidEmail")),
    password: z.string().min(1, t("passwordRequired")),
  })
}

export type StoreSignInFormData = z.infer<
  ReturnType<typeof createStoreSignInSchema>
>
