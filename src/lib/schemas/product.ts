import { z } from "zod"

type Translate = (key: string) => string

export function createProductSchema(t: Translate) {
  const imageFileSchema = z
    .custom<FileList>((value) => value instanceof FileList, t("imageRequired"))
    .refine((files) => files.length > 0, t("imageRequired"))

  return z.object({
    name: z.string().min(1, t("productNameRequired")),
    price: z
      .string()
      .min(1, t("priceRequired"))
      .refine((value) => !Number.isNaN(Number(value)) && Number(value) > 0, {
        message: t("pricePositive"),
      }),
    description: z.string().min(1, t("descriptionRequired")),
    brand: z.string().min(1, t("brandRequired")),
    sector: z.string().min(1, t("sectorRequired")),
    image: imageFileSchema,
  })
}

export type ProductFormData = z.infer<ReturnType<typeof createProductSchema>>
