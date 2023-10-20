export enum USER_ROLE {
  TEACHER = 'teacher',
  USER = 'user',
  ADMIN = 'admin',
}

export interface User {
  _id: string
  email: string
  balance: number
  role: USER_ROLE
  fullName: string
  phone: string
  country: string
  bio: string | null
  gender: string | null
  timezone: string | null
}

export interface AdminUser {
  fullName: string
  role: 'admin'
}

export interface Course {
  _id: string
  title: string
  teacher: string
  students: string[]
  about: string
  tagline: string
  category: string
  difficulty: string
  thumbnail: string
  price: number
  isVisible: boolean
  lessons: string[]
  __v: number
}

export interface Teacher {
  _id: string
  email: string
  fullName: string
  phone: string
  isBlocked: boolean
  students: string[]
  liveLessonSchedule: any[]
  balance: number
  history: any[]
  courses: string[]
  meetings: any[]
}
