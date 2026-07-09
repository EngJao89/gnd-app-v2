import { api } from "@/lib/axios"
import type { CreateProductRequest, Product } from "@/types/product"

export async function createProduct(data: CreateProductRequest) {
  const formData = new FormData()

  formData.append("name", data.name)
  formData.append("price", String(data.price))
  formData.append("description", data.description)
  formData.append("brand", data.brand)
  formData.append("sector", data.sector)
  formData.append("image", data.image)

  const { data: responseData } = await api.post<Product>("products", formData, {
    transformRequest: [
      (data, headers) => {
        if (data instanceof FormData) {
          delete headers["Content-Type"]
        }

        return data
      },
    ],
  })

  return responseData
}
