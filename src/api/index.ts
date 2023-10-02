import axios from 'axios';
import { message } from 'antd'; 

// Создаем экземпляр Axios с базовым URL и настройками
const API = axios.create({
  baseURL: 'http://localhost:3000/api/',
  withCredentials: true, // Отправлять куки с запросами для аутентификации
});

// Перехватчик запросов перед отправкой на сервер
API.interceptors.request.use((req) => {
  // Настроить запрос здесь, если необходимо
  return req;
});

// Функция для удаления аутентификации на клиенте
const removeLocalAuth = () => {
  localStorage.removeItem('isAuth');
  console.log('removed');
};

// Перехватчик ответов от сервера
API.interceptors.response.use(
  (response) => {
    // Обработка успешного ответа
    return response;
  },
  (error) => {
    // Обработка ошибок ответа от сервера
    console.log(error);
    // toast.dismiss();

    // Обработка сетевых ошибок
    if (error?.code === 'ERR_NETWORK' || error?.code === 'ERR_BAD_RESPONSE') {
      message.error('Oops! Сервер не подключен');
    }

    // Обработка ошибки отсутствия токена
    if (error?.response?.data?.err?.name === 'TokenMissingError') {
      console.log('Токен отсутствует');
      removeLocalAuth();
      window.location.href = '/signin';
    }

    // Обработка истекшего токена
    if (error?.response?.data?.err?.name === 'TokenExpiredError') {
      console.log('Токен истек');
      removeLocalAuth();
      window.location.href = '/signin?expired=true';
    }

    return Promise.reject(error);
  }
);

export default API;
