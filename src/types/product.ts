export type Product = {
  id: string
  name: string
  price: number
  imageColor: string
}

export type CreateProductRequest = {
  name: string
  price: number
  description: string
  brand: string
  sector: string
  image: File
}
