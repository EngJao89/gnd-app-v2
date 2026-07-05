import { api } from "@/lib/axios"
import type { CreateProductRequest, Product } from "@/types/product"

export async function createProduct(data: CreateProductRequest) {
  const { data: responseData } = await api.post<Product>("products", data)
  return responseData
}
