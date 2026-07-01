export type User = {
  id: string
  name: string
  email: string
  phone: string
  password: string
  created_at: string
}

export type CreateUserRequest = {
  name: string
  email: string
  phone: string
  password: string
}
