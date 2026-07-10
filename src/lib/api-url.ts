const DEFAULT_API_URL = "http://localhost:3333"

export function getApiBaseUrl() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? `${DEFAULT_API_URL}/`
  return baseUrl.replace(/\/$/, "")
}

export function getProductImageUrl(imageUrl?: string | null) {
  if (!imageUrl) {
    return null
  }

  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
    return imageUrl
  }

  const path = imageUrl.startsWith("/") ? imageUrl : `/${imageUrl}`

  if (path.startsWith("/products/images/")) {
    return path
  }

  return `${getApiBaseUrl()}${path}`
}
