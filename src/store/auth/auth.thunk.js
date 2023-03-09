import { createAsyncThunk } from '@reduxjs/toolkit'
import authService from '../../axiosApi/authService'
import { STORAGE_KEYS } from '../../lib/constants/common'

export const signUp = createAsyncThunk(
   '/auth/signup',
   async (payload, { rejectWithValue }) => {
      try {
         const { data } = await authService.signUp(payload)
         const userData = data.data
         localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(userData))
         return userData
      } catch (error) {
         return rejectWithValue(error)
      }
   }
)

export const signIn = createAsyncThunk(
   '/auth/signin',
   async (payload, { rejectWithValue }) => {
      try {
         const { data } = await authService.signIn(payload)
         const userData = data.data
         localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(userData))
         return userData
      } catch (error) {
         return rejectWithValue(error)
      }
   }
)
