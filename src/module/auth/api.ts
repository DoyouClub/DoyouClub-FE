import type { RefreshRequest, SignInRequest } from './dto/request'
import type { RefreshResponse, SignInResponse } from './dto/response'
import { POST } from '../../lib/axios/method.ts'

const signIn = async (request: SignInRequest) => POST<SignInResponse>('/auth/sign-in', request)

const refresh = async (request: RefreshRequest) => POST<RefreshResponse>('/auth/refresh', request)

export { signIn, refresh }
