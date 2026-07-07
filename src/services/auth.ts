import { api } from "@/lib/axios"
import { clearAuthSession, setAuthRole, setAuthToken } from "@/lib/auth-session"

export type SignInRequest = {
  email: string
  password: string
}

type SignInResponse = {
  token?: string
  accessToken?: string
}

function extractToken(response: SignInResponse) {
  return response.token ?? response.accessToken
}

export async function signIn(data: SignInRequest) {
  const { data: responseData } = await api.post<SignInResponse>("auth/login", data)

  const token = extractToken(responseData)

  if (token) {
    setAuthToken(token)
    setAuthRole("client")
  }

  return responseData
}

export function signOut() {
  clearAuthSession()
}
