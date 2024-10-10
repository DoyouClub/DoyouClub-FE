import { GET } from '../../lib/axios/method.ts'
import type { ClubResponse } from './dto/response'
import type { SearchClubPageRequest } from './dto/request'

const getClubsByUserId = (userId: string) => GET<ClubResponse[]>(`/club/${userId}`)

const searchClubPage = (request: SearchClubPageRequest, size: number, lastId: string) =>
  GET<ClubResponse[]>('/club/search', {
    ...request,
    size,
    ...(lastId && { lastId })
  })

export { getClubsByUserId, searchClubPage }
