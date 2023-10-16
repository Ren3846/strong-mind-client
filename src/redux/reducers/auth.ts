import { authActions } from '../actions/index'
import type { ExtractActions } from '../actions/index'

const initialState = {
  loaded: false,
  user: null,
}

export const authReducer = (state = initialState, action: ExtractActions<typeof authActions>) => {
  switch (action.type) {
    case 'AUTH_LOADED':
      return {
        loaded: true,
        user: action.payload,
      }

    case 'AUTH_LOGIN':
      return {
        ...state,
        user: action.payload,
      }

    case 'AUTH_LOGOUT':
      return {
        ...state,
        user: null,
      }

    default:
      return state
  }
}
