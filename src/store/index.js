import { configureStore } from '@reduxjs/toolkit'
import authSlice from './auth/auth.slice'
import { basketSlice } from './basket/basketSlice'
import { mealsSlices } from './meals/mealsSlice'
import { uiSlice } from './ui/uiSlice'

export const store = configureStore({
   reducer: {
      [mealsSlices.name]: mealsSlices.reducer,
      [basketSlice.name]: basketSlice.reducer,
      [uiSlice.name]: uiSlice.reducer,
      [authSlice.name]: authSlice.reducer,
   },
})
