import type { Provider } from '../../user/dto/enum'

interface SignInRequest {
  token: string
  provider: Provider
}

export type { SignInRequest }
