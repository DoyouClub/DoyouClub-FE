import { GET } from '../../lib/axios/method.ts'
import type { ClubResponse } from './dto/response'

const getMyClubs = () => GET<ClubResponse[]>('/club/my')

export { getMyClubs }
