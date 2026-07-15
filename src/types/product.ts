export type ProductStore = {
  id: string
  name: string
  legalName?: string
  cnpj?: string
  ownerName?: string
  email?: string
  street?: string
  numberOrBlock?: string
  neighborhood?: string
  city?: string
  state?: string
  zipCode?: string
  created_at?: string
}

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
  store?: ProductStore
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
  store?: ProductStore
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
    store: product.store,
  }
}
