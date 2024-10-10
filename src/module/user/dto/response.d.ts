import type { Provider, Role } from './enum.ts'

interface UserResponse {
  id: string
  email: string
  name: string
  provider: keyof typeof Provider
  roles: (keyof typeof Role)[]
}

export type { UserResponse }
