import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface TutorState {
  name: string | null
  email: string | null
  tutorId: string | null
  loggedIn: boolean
}

const initialState: TutorState = {
  name: null,
  email: null,
  tutorId: null,
  loggedIn: false,
}

const tutorSlice = createSlice({
  name: 'tutor',
  initialState: initialState,
  reducers: {
    setTutor: (state, action: PayloadAction<{ name: string; email: string; _id: string }>) => {
      const { name, email, _id } = action.payload
      state.name = name
      state.email = email
      state.tutorId = _id
      state.loggedIn = true
    },
    removeTutor: (state) => {
      state.name = null
      state.email = null
      state.tutorId = null
      state.loggedIn = false
    },
  },
})

export const { setTutor, removeTutor } = tutorSlice.actions

export default tutorSlice.reducer
