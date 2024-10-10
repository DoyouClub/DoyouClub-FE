import type { Activity, Tag } from './enum.ts'

interface President {
  name: string
  grade: number
  major: string
  email: string
}

interface ClubResponse {
  id: string
  name: string
  image: string
  description: string
  president?: President
  room?: string
  score: number
  generation: number
  activity: keyof typeof Activity
  tags: (keyof typeof Tag)[]
}

export type { ClubResponse }
