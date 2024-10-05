import type { RefreshRequest, SignInRequest, SignUpRequest } from './dto/request'
import type { RefreshResponse, SignInResponse, SignUpResponse } from './dto/response'
import { POST } from '../../lib/axios/method.ts'

const signIn = (request: SignInRequest) => POST<SignInResponse>('/auth/sign-in', request)

const signUp = (request: SignUpRequest) => POST<SignUpResponse>('/auth/sign-up', request)

const refresh = (request: RefreshRequest) => POST<RefreshResponse>('/auth/refresh', request)

export { signIn, signUp, refresh }
