import { createSlice } from '@reduxjs/toolkit'
import { STORAGE_KEYS, UserRoles } from '../../lib/constants/common'
import { signIn, signUp } from './auth.thunk'

const getInitialState = () => {
   const jsonData = localStorage.getItem(STORAGE_KEYS.AUTH)
   if (jsonData) {
      const userData = JSON.parse(jsonData)
      return {
         isAuthorized: false,
         token: userData.token,
         user: {
            name: userData.name,
            email: userData.email,
            role: userData.role,
         },
      }
   }
   return {
      isAuthorized: false,
      token: '',
      user: {
         role: UserRoles.GUEST,
         email: '',
         name: '',
      },
   }
}

const initialState = {
   isAuthrized: false,
   ...getInitialState(),
}

const authSlice = createSlice({
   name: 'auth',
   initialState,
   extraReducers: (builder) => {
      builder.addCase(signUp.fulfilled, (state, { payload }) => {
         state.isAuthrized = true
         state.token = payload.token

         state.user = {
            name: payload.user.name,
            email: payload.user.name,
            role: payload.user.role,
         }
      })
      builder.addCase(signIn.fulfilled, (state, { payload }) => {
         state.isAuthrized = true
         state.token = payload.token

         state.user = {
            name: payload.user.name,
            email: payload.user.name,
            role: payload.user.role,
         }
      })
   },
})

export default authSlice
