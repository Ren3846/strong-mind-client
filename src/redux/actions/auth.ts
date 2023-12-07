import { IUser } from '../store/types'

const ActionType = {
  AUTH_LOGIN: 'AUTH_LOGIN',
  AUTH_LOGOUT: 'AUTH_LOGOUT',
  AUTH_LOADED: 'AUTH_LOADED',
} as const

export const authLogin = (user: IUser) => {
  return {
    type: ActionType.AUTH_LOGIN,
    payload: user,
  }
}

export const authLogout = () => {
  return {
    type: ActionType.AUTH_LOGOUT,
  }
}

export const authLoaded = (user: IUser | null) => {
  return {
    type: ActionType.AUTH_LOADED,
    payload: user,
  }
}
