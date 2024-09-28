import type { RefreshRequest, SignInRequest, SignUpRequest } from './dto/request'
import type { RefreshResponse, SignInResponse, SignUpResponse } from './dto/response'
import { POST } from '../../lib/axios/method.ts'

const signIn = async (request: SignInRequest) => POST<SignInResponse>('/auth/sign-in', request)

const signUp = async (request: SignUpRequest) => POST<SignUpResponse>('/auth/sign-up', request)

const refresh = async (request: RefreshRequest) => POST<RefreshResponse>('/auth/refresh', request)

export { signIn, signUp, refresh }
