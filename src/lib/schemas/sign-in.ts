import { z } from "zod"

type Translate = (key: string) => string

export function createSignInSchema(t: Translate) {
  return z.object({
    email: z.email(t("invalidEmail")),
    password: z.string().min(1, t("passwordRequired")),
    rememberMe: z.boolean(),
  })
}

export type SignInFormData = z.infer<ReturnType<typeof createSignInSchema>>
