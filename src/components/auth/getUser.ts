import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store' // Подставьте путь к вашему корневому стейту Redux
import { getSignedInUserAPI, UserData } from '../../api/user' // Подставьте тип данных пользователя

// Функция для получения пользователя из Redux
function getUser(): UserData | null {
  const user = useSelector((state: RootState) => state.user)
  return user || null
}

// Функция для получения залогиненного пользователя из API
const getLoggedInUserFromToken = async (): Promise<UserData | null> => {
  try {
    const response = await getSignedInUserAPI()
    if (response.data?.userData) {
      return response.data.userData
    }
    return null
  } catch (err) {
    console.log('error getting logged in user', err)
    return null
  }
}

export { getLoggedInUserFromToken, getUser }
