export type Product = {
  id: string
  name: string
  price: number
  imageUrl?: string | null
  description?: string
  brand?: string
  sector?: string
  storeId?: string
  created_at?: string
}

export type CreateProductRequest = {
  name: string
  price: number
  description: string
  brand: string
  sector: string
  image: File
}

export type ApiProduct = {
  id: string
  name: string
  price: number | string
  imageUrl?: string | null
  description?: string
  brand?: string
  sector?: string
  storeId?: string
  created_at?: string
}

export function normalizeProduct(product: ApiProduct): Product {
  return {
    id: product.id,
    name: product.name,
    price: Number(product.price),
    imageUrl: product.imageUrl,
    description: product.description,
    brand: product.brand,
    sector: product.sector,
    storeId: product.storeId,
    created_at: product.created_at,
  }
}
