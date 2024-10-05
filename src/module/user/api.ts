import type { UserResponse } from './dto/response'
import { GET } from '../../lib/axios/method.ts'

const getMyUser = () => GET<UserResponse>('/user/my')

export { getMyUser }
