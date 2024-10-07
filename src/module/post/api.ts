import type { PostResponse } from './dto/response'
import { GET } from '../../lib/axios/method.ts'

const getMyPostPage = (size: number, lastCreatedDate?: string) =>
  GET<PostResponse[]>(`/post/my`, {
    size,
    ...(lastCreatedDate && { lastCreatedDate })
  })

export { getMyPostPage }
