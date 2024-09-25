import type { SignInRequest } from './dto/request'
import type { SignInResponse } from './dto/response'
import { POST } from '../../lib/axios/method.ts'

const signIn = async (request: SignInRequest) => POST<SignInResponse>('/auth/sign-in', request)

export { signIn }
