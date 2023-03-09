import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
   postBasket,
   getBasketRequest,
   putBasketRequest,
   deleteBasketRequest,
} from '../../axiosApi/mealsService'

const initialState = {
   items: [],
   isLoading: false,
   error: '',
}

export const getBasket = createAsyncThunk(
   'basket/getBasket',
   async (_, { rejectWithValue }) => {
      try {
         const { data } = await getBasketRequest()
         return data.data.items
      } catch (error) {
         return rejectWithValue(error)
      }
   }
)

export const addToBasket = createAsyncThunk(
   'basket/addNewBasket',
   async (newItem, { dispatch, rejectWithValue }) => {
      try {
         await postBasket(newItem)
         dispatch(getBasket())
      } catch (error) {
         rejectWithValue(error)
      }
   }
)

export const updateBasketItem = createAsyncThunk(
   'basket/updateBasket',
   async ({ id, amount }, { dispatch, rejectWithValue }) => {
      try {
         await putBasketRequest(id, amount)
         dispatch(getBasket())
      } catch (error) {
         rejectWithValue(error)
      }
   }
)

export const deleteBasketItem = createAsyncThunk(
   'basket/deleteBasket',
   async (id, { dispatch, rejectWithValue }) => {
      try {
         await deleteBasketRequest(id)
         dispatch(getBasket())
      } catch (error) {
         rejectWithValue(error)
      }
   }
)

export const submitOrder = createAsyncThunk(
   'basket/submitOrder',
   async ({ orderData }, { dispatch, rejectWithValue }) => {
      try {
         await fetch('https://jsonplaceholder.typicode.com/postssad', {
            method: 'POST',
            body: orderData,
         })
         return dispatch(getBasket())
      } catch (error) {
         return rejectWithValue('Some think wen wronf')
      }
   }
)

export const basketSlice = createSlice({
   name: 'basket',
   initialState,
   reducers: {
      getBasketStarted(state, action) {
         state.items = action.payload
         state.isLoading = true
      },
      getBasketSuccess(state, action) {
         state.items = action.payload
         state.isLoading = false
         state.error = ''
      },
      getBasketFailed(state, action) {
         state.items = action.payload
         state.error = 'Something went wrong'
      },
   },

   extraReducers: (builder) => {
      builder.addCase(getBasket.fulfilled, (state, action) => {
         state.items = action.payload
         state.isLoading = false
         state.error = ''
      })

      builder.addCase(getBasket.pending, (state, action) => {
         state.isLoading = true
         state.error = action.payload
      })

      builder.addCase(getBasket.rejected, (state) => {
         state.isLoading = false
         state.error = 'error'
      })

      builder.addCase(addToBasket.fulfilled, (state) => {
         state.isLoading = false
         state.error = ''
      })

      builder.addCase(addToBasket.pending, (state) => {
         state.isLoading = true
         state.error = ''
      })

      builder.addCase(addToBasket.rejected, (state) => {
         state.isLoading = false
         state.error = 'error'
      })

      builder.addCase(updateBasketItem.fulfilled, (state) => {
         state.isLoading = false
         state.error = ''
      })

      builder.addCase(updateBasketItem.pending, (state) => {
         state.isLoading = true
         state.error = ''
      })

      builder.addCase(updateBasketItem.rejected, (state) => {
         state.isLoading = false
         state.error = 'error'
      })

      builder.addCase(deleteBasketItem.fulfilled, (state) => {
         state.isLoading = false
         state.error = ''
      })

      builder.addCase(deleteBasketItem.pending, (state) => {
         state.isLoading = true
         state.error = ''
      })

      builder.addCase(deleteBasketItem.rejected, (state) => {
         state.isLoading = false
         state.error = 'error'
      })
   },
})

export const basketActions = basketSlice.actions
