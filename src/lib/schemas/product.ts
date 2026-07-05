import { z } from "zod"

export const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  price: z
    .string()
    .min(1, "Price is required")
    .refine((value) => !Number.isNaN(Number(value)) && Number(value) > 0, {
      message: "Price must be greater than zero",
    }),
  imageColor: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/, "Color must be a valid hex code (e.g. #4a2c6e)"),
})

export type ProductFormData = z.infer<typeof productSchema>
