import { z } from "zod"

type Translate = (key: string) => string

export function createRegisterSchema(t: Translate) {
  return z.object({
    firstName: z.string().min(1, t("firstNameRequired")),
    surname: z.string().min(1, t("surnameRequired")),
    email: z.email(t("invalidEmail")),
    password: z.string().min(6, t("passwordMin")),
    phone: z.string().min(1, t("phoneRequired")),
  })
}

export type RegisterFormData = z.infer<ReturnType<typeof createRegisterSchema>>
