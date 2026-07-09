import { z } from "zod"

const imageFileSchema = z
  .custom<FileList>((value) => value instanceof FileList, "Image is required")
  .refine((files) => files.length > 0, "Image is required")

export const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  price: z
    .string()
    .min(1, "Price is required")
    .refine((value) => !Number.isNaN(Number(value)) && Number(value) > 0, {
      message: "Price must be greater than zero",
    }),
  description: z.string().min(1, "Description is required"),
  brand: z.string().min(1, "Brand is required"),
  sector: z.string().min(1, "Sector is required"),
  image: imageFileSchema,
})

export type ProductFormData = z.infer<typeof productSchema>
