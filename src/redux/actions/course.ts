import type { Course } from '../store/types'

const ActionType = {
  COURSE_ADD: 'COURSE_ADD',
  COURSE_DELETE: 'COURSE_DELETE',
  COURSE_UPDATE: 'COURSE_UPDATE',
  COURSE_LOADED: 'COURSE_LOADED',
} as const

export const createCourse = (course: Course) => {
  return {
    type: ActionType.COURSE_ADD,
    payload: course,
  }
}

export const deleteCourse = (id: Course['_id']) => {
  return {
    type: ActionType.COURSE_DELETE,
    payload: id,
  }
}

export const updateCourse = (id: Course['_id'], update: Partial<Course>) => {
  return {
    type: ActionType.COURSE_UPDATE,
    payload: {
      id,
      update,
    },
  }
}

export const loadedCourse = (courses: Course[]) => {
  return {
    type: ActionType.COURSE_LOADED,
    payload: courses,
  }
}
