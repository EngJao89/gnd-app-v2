import { api } from "@/lib/axios"
import { getAuthToken } from "@/lib/auth-session"
import type { ApiProduct, CreateProductRequest, Product } from "@/types/product"
import { normalizeProduct } from "@/types/product"
import { getStoreMe } from "@/services/store-auth"

export async function getProducts() {
  const { data } = await api.get<ApiProduct[]>("products")

  return data.map((product) => normalizeProduct(product))
}

export async function createProduct(data: CreateProductRequest) {
  const token = getAuthToken()

  if (!token) {
    throw new Error("Store authentication is required to add products.")
  }

  const store = await getStoreMe()

  if (!store.id) {
    throw new Error("Could not identify the authenticated store.")
  }

  const formData = new FormData()

  formData.append("name", data.name)
  formData.append("price", String(data.price))
  formData.append("description", data.description)
  formData.append("brand", data.brand)
  formData.append("sector", data.sector)
  formData.append("image", data.image)

  const { data: responseData } = await api.post<Product>("products", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return normalizeProduct(responseData)
}
