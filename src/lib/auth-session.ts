const AUTH_TOKEN_KEY = "gnd_auth_token"
const AUTH_ROLE_KEY = "gnd_auth_role"
const STORE_PROFILE_KEY = "gnd_store_profile"

export type AuthRole = "client" | "store"

export type StoreProfile = {
  id: string
  name: string
}

export function setAuthToken(token: string) {
  localStorage.setItem(AUTH_TOKEN_KEY, token)
}

export function getAuthToken() {
  if (typeof window === "undefined") {
    return null
  }

  return localStorage.getItem(AUTH_TOKEN_KEY)
}

export function setAuthRole(role: AuthRole) {
  localStorage.setItem(AUTH_ROLE_KEY, role)

  if (role === "client") {
    clearStoreProfile()
  }
}

export function getAuthRole(): AuthRole | null {
  if (typeof window === "undefined") {
    return null
  }

  const role = localStorage.getItem(AUTH_ROLE_KEY)

  if (role === "client" || role === "store") {
    return role
  }

  return null
}

export function setStoreProfile(store: StoreProfile) {
  localStorage.setItem(STORE_PROFILE_KEY, JSON.stringify(store))
}

export function getStoreProfile(): StoreProfile | null {
  if (typeof window === "undefined") {
    return null
  }

  const raw = localStorage.getItem(STORE_PROFILE_KEY)

  if (!raw) {
    return null
  }

  try {
    const parsed = JSON.parse(raw) as StoreProfile

    if (parsed.id && parsed.name) {
      return parsed
    }
  } catch {
    return null
  }

  return null
}

export function getStoreId() {
  return getStoreProfile()?.id ?? null
}

export function clearStoreProfile() {
  if (typeof window === "undefined") {
    return
  }

  localStorage.removeItem(STORE_PROFILE_KEY)
}

export function clearAuthSession() {
  if (typeof window === "undefined") {
    return
  }

  localStorage.removeItem(AUTH_TOKEN_KEY)
  localStorage.removeItem(AUTH_ROLE_KEY)
  clearStoreProfile()
}

export function isAuthenticated() {
  return Boolean(getAuthToken())
}

export function isStoreSession() {
  return isAuthenticated() && getAuthRole() === "store"
}
