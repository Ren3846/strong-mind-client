export enum USER_ROLE {
  TEACHER = 'teacher',
  USER = 'user',
  ADMIN = 'admin',
}

interface Availability {
  MON: string[]
  TUE: string[]
  WED: string[]
  THU: string[]
  FRI: string[]
  SAT: string[]
  SUN: string[]
  _id: string
}

export interface User {
  _id: string
  email: string
  phone: string
  bio: string
  avatar: string
  timezone: string
  gender: string
  image: string
  role: string
  isBlocked: boolean
  students: string[]
  meetings: any[]
  fullName: string
  balance: number
  country: string
  history: any[]
  courses: string[]
  purchasedMeetings: any[]
  availabilities: Availability
  __v: number
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
  cover: string
  price: number
  isVisible: boolean
  lessons: string[]
  __v: number
  meetingPrice: number
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
  country: string
  availabilities: {
    MON: number[]
    TUE: number[]
    WED: number[]
    THU: number[]
    FRI: number[]
    SAT: number[]
    SUN: number[]
    _id: string
  }
  image: string
  role: string
  password: string
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
