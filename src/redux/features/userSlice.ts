import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UserState {
  name: string | null
  email: string | null
  userId: string | null
  loggedIn: boolean
  phone: string | null // Добавлено поле для телефона
}

const initialState: UserState = {
  name: null,
  email: null,
  userId: null,
  loggedIn: false,
  phone: null, // Инициализировано поле для телефона
}

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ name: string; userId: string; email: string; phone: string }>) => {
      const { name, userId, email, phone } = action.payload
      state.name = name
      state.userId = userId
      state.email = email
      state.phone = phone
      state.loggedIn = true
    },
    removeUser: (state) => {
      state.name = null
      state.userId = null
      state.email = null
      state.phone = null // Обнулено поле для телефона
      state.loggedIn = false
    },
  },
})

export const { setUser, removeUser } = userSlice.actions

export default userSlice.reducer
