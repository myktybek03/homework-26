import { axiosInstance } from '../configs/axiosInstance'

export const getMealsRequest = () => {
   return axiosInstance.get('foods')
}

export const postBasket = (newItem) => {
   return axiosInstance.post(`foods/${newItem.id}/addToBasket`)
}

export const getBasketRequest = () => {
   return axiosInstance.get('basket')
}

export const putBasketRequest = (id, amountPut) => {
   return axiosInstance.put(`basketItem/${id}/update`, { amount: amountPut })
}

export const deleteBasketRequest = (id) => {
   return axiosInstance.delete(`basketItem/${id}/delete`)
}
