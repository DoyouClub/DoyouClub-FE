import type { Activity, Tag } from './enum.ts'

interface SearchClubPageRequest {
  name: string
  tag?: keyof typeof Tag
  activity?: keyof typeof Activity
  lastId?: string
}

export type { SearchClubPageRequest }
