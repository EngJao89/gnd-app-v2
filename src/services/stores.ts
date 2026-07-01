import { api } from "@/lib/axios"
import type { CreateStoreRequest, Store } from "@/types/store"

export async function createStore(data: CreateStoreRequest) {
  const { data: responseData } = await api.post<Store>("stores", data)
  return responseData
}
