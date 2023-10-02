import API from './index'

interface SignInResponse {
  userId: string;
  token: string;
}

/**
 * Отправляет запрос на аутентификацию пользователя.
 * @param {Object} body - Данные для аутентификации.
 * @returns {Promise} - Обещание, которое разрешается с данными ответа.
 */
const userSignInAPI = (body: { username: string, password: string }): Promise<SignInResponse> => API.post('/auth/signin', body);

/**
 * Отправляет запрос на регистрацию нового пользователя.
 * @param {Object} body - Данные для регистрации.
 * @returns {Promise} - Обещание, которое разрешается с данными ответа.
 */
// const userSignUpAPI = (body) => API.post('/auth/signup', body);

// /**
//  * Получает данные вошедшего в систему пользователя с сервера.
//  * @returns {Promise} - Обещание, которое разрешается данными пользователя.
//  */
const getSignedInUserAPI = () => API.get('/auth/user/restore');

// /**
//  * Получает данные о курсе из API.
//  * @param {string} id - Идентификатор курса.
//  * @param {string} [route='/user/courses/enroll/'] - Маршрут API для получения данных о курсе. По умолчанию '/user/courses/enroll/'.
//  * @returns {Promise} - Обещание, которое разрешается данными о курсе, полученными с сервера.
//  */
// const getCourseDetailsAPI = (id, route = '/user/courses/enroll/') => API.get(route + id);

// /**
//  * Отправляет запрос на запись пользователя на курс.
//  * @param {Object} body - Данные для записи на курс.
//  * @returns {Promise} - Обещание, которое разрешается данными ответа.
//  */
// const enrollCourseAPI = (body) => API.post('/user/courses/enroll', body);


// const getUserDetailsAPI = () => API.get('/user/details')

// const updateUserDetailsAPI = (body) => API.post('/user/details', body)

// const createOrderAPI = (courseId) => API.post('/user/orders/create', { courseId })

// const verifyPaymentAPI = (data) => API.post('/user/orders/payment/verify', data)

// const isEnrolledInCourseAPI = (courseId) => API.get(`/user/details/enrolled/${courseId}/check`)

const getAllOrdersByUserAPI = () => API.get(`/user/orders`)

const getUserEnrolledCoursesAPI = () => API.get('/user/courses/enroll')

const handleLogOutAPI = () => API.delete('/auth/logout')

export {
  // getCourseDetailsAPI,
  getUserEnrolledCoursesAPI,
  // isEnrolledInCourseAPI,
  // enrollCourseAPI,
  handleLogOutAPI,
  // createOrderAPI,
  // verifyPaymentAPI,
  // getUserDetailsAPI,
  // updateUserDetailsAPI,
  getAllOrdersByUserAPI,
  userSignInAPI,
  // userSignUpAPI,
  getSignedInUserAPI,
};
