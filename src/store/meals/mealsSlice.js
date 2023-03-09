import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getMealsRequest } from '../../axiosApi/mealsService'

export const mealsActionTypes = {
   GET_MEALS_SUCCESS: 'GET_MEALS_SUCCESS',
   GET_MEALS_STARTED: 'GET_MEALS_STARTED',
   GET_MEALS_FAILED: 'GET_MEALS_FAILED',
}

const initialState = {
   meals: [],
   isLoading: false,
   error: '',
}
export const getMeals = createAsyncThunk(
   'meals/getMeals',
   async (payload, { rejectWithValue }) => {
      try {
         const { data } = await getMealsRequest()
         return data.data
      } catch (error) {
         return rejectWithValue('Some thing went wrong')
      }
   }
)

export const mealsSlices = createSlice({
   name: 'meals',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(getMeals.fulfilled, (state, action) => {
         state.meals = action.payload
         state.isLoading = false
         state.error = ''
      })
      builder.addCase(getMeals.pending, (state) => {
         state.isLoading = true
      })
      builder.addCase(getMeals.rejected, (state, action) => {
         state.isLoading = false
         state.error = action.payload
      })
   },
})

export const mealActions = mealsSlices.actions
