import API from './index'

export interface UserData {}

interface SignInBody {
  email: string
  password: string
}

interface SignUpBody {
  username: string
  phone: string
  email: string
  password: string
}

interface CourseDetails {
  id: string
  title: string
  description: string
}

export interface UserDetails {
  id: string
  name: string
  email: string
  phone?: string | undefined
  fullName?: string | null | undefined
}

interface OrderData {
  orderId: string
  courseId: string
}

interface PaymentData {
  paymentId: string
  amount: number
}

// Функция для входа пользователя
const userSignInAPI = (body: SignInBody) => API.post('/auth/login', body)

// Функция для регистрации пользователя
const userSignUpAPI = (body: SignUpBody) => API.post('/auth/register', body)

// Функция для получения данных залогиненного пользователя
const getSignedInUserAPI = () => API.get('/auth/profile')

// Функция для получения данных о курсе
const getCourseDetailsAPI = (id: string, route = '/user/courses/enroll/') =>
  API.get<CourseDetails>(route + id)

// Функция для записи на курс
const enrollCourseAPI = (body: any) => API.post('/user/courses/enroll', body)

// Функция для получения данных пользователя
const getUserDetailsAPI = () => API.get<UserDetails>('/user')

// Функция для обновления данных пользователя
const updateUserDetailsAPI = (body: UserDetails) =>
  API.post('/user/details', body)

// Функция для создания заказа
const createOrderAPI = (courseId: string) =>
  API.post<OrderData>('/user/orders/create', {
    courseId,
  })

// Функция для верификации платежа
const verifyPaymentAPI = (data: PaymentData) =>
  API.post('/user/orders/payment/verify', data)

// Функция для проверки записи на курс
const isEnrolledInCourseAPI = (courseId: string) =>
  API.get<boolean>(`/user/details/enrolled/${courseId}/check`)

// Функция для получения всех заказов пользователя
const getAllOrdersByUserAPI = () => API.get<OrderData[]>('/user/orders')

// Функция для получения курсов, на которые записан пользователь
const getUserEnrolledCoursesAPI = () =>
  API.get<CourseDetails[]>('/user/courses/enroll')

// Функция для выхода из системы
const handleLogOutAPI = () => API.get('/auth/logout')

export {
  getCourseDetailsAPI,
  getUserEnrolledCoursesAPI,
  isEnrolledInCourseAPI,
  enrollCourseAPI,
  handleLogOutAPI,
  createOrderAPI,
  verifyPaymentAPI,
  getUserDetailsAPI,
  updateUserDetailsAPI,
  getAllOrdersByUserAPI,
  userSignInAPI,
  userSignUpAPI,
  getSignedInUserAPI,
}
