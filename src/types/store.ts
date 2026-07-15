export type Store = {
  id: string
  name: string
  legalName: string
  cnpj: string
  ownerName: string
  email?: string
  street: string
  numberOrBlock: string
  neighborhood: string
  city: string
  state: string
  zipCode: string
  created_at: string
}

export type CreateStoreRequest = {
  name: string
  legalName: string
  cnpj: string
  ownerName: string
  street: string
  numberOrBlock: string
  neighborhood: string
  city: string
  state: string
  zipCode: string
}
