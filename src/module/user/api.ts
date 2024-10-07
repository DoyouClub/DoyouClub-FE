import type { UserResponse } from './dto/response'
import { GET, PUT } from '../../lib/axios/method.ts'
import type { UpdateUserByIdRequest } from './dto/request'

const getMyUser = () => GET<UserResponse>('/user/my')

const updateUserById = (id: string, request: UpdateUserByIdRequest) => PUT<UserResponse>(`/user/${id}`, request)

export { getMyUser, updateUserById }
