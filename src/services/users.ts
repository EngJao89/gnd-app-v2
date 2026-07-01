import { api } from "@/lib/axios"
import type { CreateUserRequest, User } from "@/types/user"

export async function createUser(data: CreateUserRequest) {
  const { data: responseData } = await api.post<User>("users", data)
  return responseData
}
