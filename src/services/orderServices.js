import apiClient from '../utils/api_client'
export function getOrdersAPI() {
  return apiClient.get('/order')
}
