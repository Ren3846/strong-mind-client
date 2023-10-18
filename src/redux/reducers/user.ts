import * as userActions from '../actions/user'
import type { ExtractActions } from '../actions'
import { Partner } from '../store/types'
import { deleteItem, updateItem } from '../../utils'

const initialState: Partner[] = []

export const userReducer = (
  state = initialState,
  action: ExtractActions<typeof userActions>,
) => {
  switch (action.type) {
    case 'USER_ADD':
      return [action.payload, ...state]

    case 'USER_LOADED':
      return action.payload

    case 'USER_DELETE':
      return deleteItem(state, action.payload)

    case 'USER_UPDATE':
      return updateItem(state, action.payload.id, action.payload.update)

    default:
      return state
  }
}
