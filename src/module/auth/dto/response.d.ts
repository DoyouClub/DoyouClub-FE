interface SignInResponse {
  isNew: boolean
  email: string
  signUpToken?: string
  accessToken?: string
  refreshToken?: string
}

export type { SignInResponse }
