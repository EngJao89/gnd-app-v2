import { api } from "@/lib/axios"

export type SignInRequest = {
  email: string
  password: string
}

export async function signIn(data: SignInRequest) {
  const { data: responseData } = await api.post("auth/login", data)
  return responseData
}
