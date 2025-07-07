import { configureStore } from '@reduxjs/toolkit'
import basketReducer from './slices/basket'

export const store = configureStore({
  reducer: {
    basket: basketReducer,
  },
})