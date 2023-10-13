import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/userSlice'
import tutorReducer from './features/tutorSlice'

const store = configureStore({
  reducer: {
    user: userReducer,
    tutor: tutorReducer,
  },
})

export default store

export type RootState = ReturnType<typeof store.getState> // Экспортируйте тип RootState
