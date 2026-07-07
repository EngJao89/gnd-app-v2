const AUTH_TOKEN_KEY = "gnd_auth_token"
const AUTH_ROLE_KEY = "gnd_auth_role"

export type AuthRole = "client" | "store"

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

export function clearAuthSession() {
  if (typeof window === "undefined") {
    return
  }

  localStorage.removeItem(AUTH_TOKEN_KEY)
  localStorage.removeItem(AUTH_ROLE_KEY)
}

export function isAuthenticated() {
  return Boolean(getAuthToken())
}

export function isStoreSession() {
  return isAuthenticated() && getAuthRole() === "store"
}
