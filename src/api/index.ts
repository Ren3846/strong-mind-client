import axios from 'axios'
import { message } from 'antd'

const API = axios.create({
  baseURL: '/api/',
  withCredentials: true,
})

API.interceptors.request.use((req) => {
  return req
})

const removeLocalAuth = () => {
  localStorage.removeItem('isAuth')
  console.log('removed')
}

API.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    console.log(error)
    if (error?.code === 'ERR_NETWORK' || error?.code === 'ERR_BAD_RESPONSE') {
      message.error('Oops! It seems that the server is not connected')
    }
    if (error?.response?.data?.err?.name === 'TokenMissingError') {
      console.log('Token Missing')
      removeLocalAuth()
      window.location.href = '/signin'
    }
    if (error?.response?.data?.err?.name === 'TokenExpiredError') {
      console.log('Token expired')
      removeLocalAuth()
      window.location.href = '/signin?expired=true'
    }
    return Promise.reject(error)
  },
)

export default API
