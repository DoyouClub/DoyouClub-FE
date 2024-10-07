import { GET } from '../../lib/axios/method.ts'
import type { ClubResponse } from './dto/response'

const getClubsByUserId = (userId: string) => GET<ClubResponse[]>(`/club/${userId}`)

export { getClubsByUserId }
