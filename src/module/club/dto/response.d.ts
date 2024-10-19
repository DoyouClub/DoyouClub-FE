import type { Activity, Tag } from './enum.ts'

interface President {
  id?: string
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
  notification?: string
  president: President
  room?: string
  score: number
  generation: number
  activity: keyof typeof Activity
  tag: keyof typeof Tag
}

export type { ClubResponse }
