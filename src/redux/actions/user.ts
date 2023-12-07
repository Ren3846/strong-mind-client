import type { IUser } from '../store/types'

const ActionType = {
  USER_ADD: 'USER_ADD',
  USER_LOADED: 'USER_LOADED',
  USER_UPDATE: 'USER_UPDATE',
  USER_DELETE: 'USER_DELETE',
} as const

export const createUser = (user: IUser) => {
  return {
    type: ActionType.USER_ADD,
    payload: user,
  }
}

export const loadedUser = (users: IUser[]) => {
  return {
    type: ActionType.USER_LOADED,
    payload: users,
  }
}

export const deleteUser = (id: IUser['_id']) => {
  return {
    type: ActionType.USER_DELETE,
    payload: id,
  }
}

export const updateUser = (id: IUser['_id'], update: Partial<IUser>) => {
  return {
    type: ActionType.USER_UPDATE,
    payload: {
      id,
      update,
    },
  }
}
