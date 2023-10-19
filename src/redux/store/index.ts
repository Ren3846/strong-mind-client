import { configureStore } from '@reduxjs/toolkit'
import rootReducer from '../reducers/index'

const store = configureStore({
  reducer: rootReducer,
})

export type StoreType = ReturnType<typeof store.getState>

export default store
