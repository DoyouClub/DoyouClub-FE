import type { Provider } from '../../user/dto/enum'

interface SignInRequest {
  token: string
  provider: Provider
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
