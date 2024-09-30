import type { UserResponse } from './dto/response'
import { GET } from '../../lib/axios/method.ts'

const getMyUser = async () => GET<UserResponse>('/user/my')

export { getMyUser }
