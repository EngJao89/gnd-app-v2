import { api } from "@/lib/axios"
import { setAuthToken } from "@/lib/auth-session"

export type StoreSignInRequest = {
  cnpj: string
  password: string
}

type StoreSignInResponse = {
  token?: string
  accessToken?: string
}

function extractToken(response: StoreSignInResponse) {
  return response.token ?? response.accessToken
}

export async function storeSignIn(data: StoreSignInRequest) {
  const { data: responseData } = await api.post<StoreSignInResponse>(
    "store-auth/login",
    data
  )

  const token = extractToken(responseData)

  if (token) {
    setAuthToken(token)
  }

  return responseData
}
