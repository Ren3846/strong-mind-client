import * as courseActions from '../actions/course'
import type { ExtractActions } from '../actions'
import { deleteItem, updateItem } from '../../utils'
import { Course } from '../store/types'

const initialState: Course[] = []

export const courseReducer = (
  state = initialState,
  action: ExtractActions<typeof courseActions>,
) => {
  switch (action.type) {
    case 'COURSE_LOADED':
      return action.payload

    case 'COURSE_ADD':
      return [action.payload, ...state]

    case 'COURSE_DELETE':
      return deleteItem(state, action.payload)

    case 'COURSE_UPDATE':
      return updateItem(state, action.payload.id, action.payload.update)

    default:
      return state
  }
}
