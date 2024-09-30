import type { Provider, Role } from './enum'

interface UserResponse {
  id: string
  email: string
  name: string
  provider: Provider
  roles: Role[]
}

export type { UserResponse }
