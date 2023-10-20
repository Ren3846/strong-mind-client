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
}

export interface Lesson {
  _id: string
}
