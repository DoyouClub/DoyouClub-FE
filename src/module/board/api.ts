import { GET } from '../../lib/axios/method.ts'
import type { BoardResponse } from './dto/response'

const getBoardById = (id: string) => GET<BoardResponse>(`/board/${id}`)

export { getBoardById }
