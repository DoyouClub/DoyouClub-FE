interface SignInResponse {
  isNew: boolean
  email: string
  signUpToken?: string
  accessToken?: string
  refreshToken?: string
}

interface RefreshResponse {
  accessToken: string
  refreshToken: string
}

interface SignUpResponse {
  accessToken: string
  refreshToken: string
}

export type { SignInResponse, SignUpResponse, RefreshResponse }
