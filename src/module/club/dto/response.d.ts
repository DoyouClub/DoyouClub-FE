import type { Activity, Tag } from './enum'

interface ClubResponse {
  id: string
  name: string
  description: string
  president?: President
  room?: string
  score: number
  generation: number
  activity: Activity
  tags: Tag[]
}

export type { ClubResponse }
