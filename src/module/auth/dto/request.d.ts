import type { Provider } from '../../user/dto/enum'

interface SignInRequest {
  token: string
  provider: Provider
}

interface RefreshRequest {
  refreshToken: string
}

export type { SignInRequest, RefreshRequest }
