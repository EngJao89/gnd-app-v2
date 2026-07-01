import { isAxiosError } from "axios"

export function getApiErrorMessage(error: unknown, fallback: string): string {
  if (isAxiosError(error)) {
    const data = error.response?.data

    if (typeof data === "string" && data.trim()) {
      return data
    }

    if (data && typeof data === "object" && "message" in data) {
      const message = data.message

      if (typeof message === "string" && message.trim()) {
        return message
      }

      if (Array.isArray(message)) {
        return message.join(", ")
      }
    }

    if (error.code === "ERR_NETWORK") {
      return "Could not connect to the server. Please try again."
    }
  }

  return fallback
}
