import { z } from "zod"

type Translate = (key: string) => string

export function createStoreSchema(t: Translate) {
  return z.object({
    name: z.string().min(1, t("storeNameRequired")),
    legalName: z.string().min(1, t("legalNameRequired")),
    cnpj: z.string().min(1, t("cnpjRequired")),
    ownerName: z.string().min(1, t("ownerNameRequired")),
    street: z.string().min(1, t("streetRequired")),
    numberOrBlock: z.string().min(1, t("numberOrBlockRequired")),
    neighborhood: z.string().min(1, t("neighborhoodRequired")),
    city: z.string().min(1, t("cityRequired")),
    state: z
      .string()
      .min(2, t("stateRequired"))
      .max(2, t("stateMax")),
    zipCode: z.string().min(1, t("zipCodeRequired")),
  })
}

export type StoreFormData = z.infer<ReturnType<typeof createStoreSchema>>
