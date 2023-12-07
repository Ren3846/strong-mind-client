export enum USER_ROLE {
  TEACHER = 'teacher',
  USER = 'user',
  ADMIN = 'admin',
}

interface IPurchasedMeeting {
  course: string
  quantity: number
  _id: string
}

interface IHistory {
  date: string
  amount: number
  name: string
}

interface IChat {
  chatId: string
  otherUserId: string
  hasUnreadMessages: boolean
  _id: string
}

export interface IUser {
  [x: string]: any
  availabilities: {
    [day: string]: number[]
  }
  _id: string
  email: string
  phone: string
  role: string
  isBlocked: boolean
  students: string[]
  purchasedMeetings: IPurchasedMeeting[]
  meetings: string[]
  fullName: string
  balance: number
  country: string
  timezone: string
  history: IHistory[]
  courses: string[]
  chats: IChat[]
  __v: number
  bio: string
  gender: string
  avatar: string
}

export interface IAvailability {
  [day: string]: number[]
}

interface IChat {
  chatId: string
  otherUserId: string
  hasUnreadMessages: boolean
  _id: string
}

export interface ITeacher {
  availabilities: IAvailability
  _id: string
  email: string
  password: string
  phone: string
  role: string
  avatar: string
  isBlocked: boolean
  students: string[]
  purchasedMeetings: string[]
  meetings: string[]
  fullName: string
  balance: number
  country: string
  timezone: string
  history: any[]
  courses: string[]
  chats: IChat[]
  __v: number
  bio: string
  gender: string
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
  cover: string
  price: number
  isVisible: boolean
  lessons: string[]
  __v: number
  meetingPrice: number
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

export interface IMeeting {
  course: string
  teacher: string
  student: string
  startDate: string
  zoomUrl: string
  status: string
  meetingId: string
  rate: number
  report: string
}

export interface ILesson {
  _id: string
  title: string | null
  description: string | null
  videoKey: string | null
  duration: number | null
  likes: string
}

export interface AdminUser {
  fullName: string
  role: 'admin'
}
