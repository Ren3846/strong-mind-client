import API from './index'

const getAllCoursesAPI = () => {
  return API.get('/user/courses')
}

const getAllCourseByQuery = (query: any) => {
  return API.get(`user/courses?${query}`)
}

const getLessonDetailsAPI = (lessonId : any) => {
  return API.get(`/user/lessons/${lessonId}`)
}

const getAllCategoriesAPI = (route = '/admin/category') => {
  return API.get(route)
}

const verifyFirebaseSignIn = (token : any) => {
  return API.post('/auth/signin/firebase/verify', {
    token: token,
  })
}

export { getAllCoursesAPI, getLessonDetailsAPI, getAllCourseByQuery, getAllCategoriesAPI, verifyFirebaseSignIn }
