import apiClient from '../utils/api_client'

export const addToCartAPI = (id, quantity) => {
  return apiClient.post(`/cart/${id}`, { quantity })
}

export const getCartAPI = () => {
  return apiClient.get('/cart')
}

export function removeFromCartAPI(id) {
  return apiClient.patch(`/cart/remove/${id}`)
}

export function increaseProdAPI(id) {
  return apiClient.patch(`/cart/increase/${id}`)
}

export function decreaseProdAPI(id) {
  return apiClient.patch(`/cart/decrease/${id}`)
}

export function checkoutAPI() {
  return apiClient.post('/order/checkout')
}
