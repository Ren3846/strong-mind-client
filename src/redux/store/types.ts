export enum USER_ROLE {
  TEACHER = 'teacher',
  USER = 'tutor',
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
  isBlocked: boolean
  students: string[]
  liveLessonSchedule: LiveLesson[]
  history: any[]
  courses: string[]
  meetings: Meeting[]
}

interface LiveLesson {
  date: string
  lessonId: string
  title: string
  currentUrl: string
}

interface Meeting {
  userId: string
  status: string
  date: string
  _id: string
}
export interface ICourse {
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

export interface ITeacher {
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

export interface ILesson {
  _id: string
  title: string | null
  description: string | null
  videoKey: string | null
  duration: number | null
}

export interface AdminUser {
  fullName: string
  role: 'admin'
}
