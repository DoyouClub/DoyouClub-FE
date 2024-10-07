interface PostResponse {
  id: string
  writerId: string
  boardId: string
  title: string
  content: string
  likedUserIds: string[]
  images: string[]
  createdDate: string
}

export type { PostResponse }
