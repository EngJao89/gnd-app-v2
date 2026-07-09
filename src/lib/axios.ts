import axios from "axios"

import { getAuthToken } from "@/lib/auth-session"

const baseURL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3333/"

export const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
})

api.interceptors.request.use((config) => {
  const token = getAuthToken()

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  if (config.data instanceof FormData) {
    if (typeof config.headers.delete === "function") {
      config.headers.delete("Content-Type")
    } else {
      delete config.headers["Content-Type"]
    }
  }

  return config
})

export default api
