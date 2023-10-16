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
  username: string
  phone: string
  country: string | null
}
