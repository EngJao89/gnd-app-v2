const AUTH_TOKEN_KEY = "gnd_auth_token"

export function setAuthToken(token: string) {
  localStorage.setItem(AUTH_TOKEN_KEY, token)
}

export function getAuthToken() {
  if (typeof window === "undefined") {
    return null
  }

  return localStorage.getItem(AUTH_TOKEN_KEY)
}

export function clearAuthSession() {
  if (typeof window === "undefined") {
    return
  }

  localStorage.removeItem(AUTH_TOKEN_KEY)
}

export function isAuthenticated() {
  return Boolean(getAuthToken())
}
