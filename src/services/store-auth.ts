import { api } from "@/lib/axios"
import { setAuthRole, setAuthToken, setStoreProfile } from "@/lib/auth-session"
import type { Store } from "@/types/store"

export type StoreSignInRequest = {
  email: string
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

  if (!token) {
    throw new Error("Store login did not return an access token.")
  }

  setAuthToken(token)
  setAuthRole("store")

  await getStoreMe()

  return responseData
}

type StoreMeResponse = {
  store: Store
}

export async function getStoreMe() {
  const { data } = await api.post<StoreMeResponse>("store-auth/me")
  const store = data.store

  setAuthRole("store")
  setStoreProfile({ id: store.id, name: store.name })

  return store
}
