import type { ICourse } from '../store/types'

const ActionType = {
  COURSE_ADD: 'COURSE_ADD',
  COURSE_DELETE: 'COURSE_DELETE',
  COURSE_UPDATE: 'COURSE_UPDATE',
  COURSE_LOADED: 'COURSE_LOADED',
} as const

export const createCourse = (course: ICourse) => {
  return {
    type: ActionType.COURSE_ADD,
    payload: course,
  }
}

export const deleteCourse = (id: ICourse['_id']) => {
  return {
    type: ActionType.COURSE_DELETE,
    payload: id,
  }
}

export const updateCourse = (id: ICourse['_id'], update: Partial<ICourse>) => {
  return {
    type: ActionType.COURSE_UPDATE,
    payload: {
      id,
      update,
    },
  }
}

export const loadedCourse = (courses: ICourse[]) => {
  return {
    type: ActionType.COURSE_LOADED,
    payload: courses,
  }
}
