import type { Provider } from '../../user/dto/enum.ts'

interface SignInRequest {
  token: string
  provider: keyof typeof Provider
}

interface SignUpRequest {
  email: string
  token: string
  name: string
}

interface RefreshRequest {
  refreshToken: string
}

export type { SignInRequest, SignUpRequest, RefreshRequest }
