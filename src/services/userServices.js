import apiClient from '../utils/api_client'
import { jwtDecode } from 'jwt-decode'

const tokenName = 'token'

export const signup = async (user, profile) => {
  const body = new FormData()
  body.append('name', user.name)
  body.append('email', user.email)
  body.append('password', user.password)
  body.append('deliveryAddress', user.address)
  body.append('profilePic', profile)
  const { data } = await apiClient.post('/user/signup', body)
  localStorage.setItem(tokenName, data.token)
}

export const login = async (user) => {
  const { data } = await apiClient.post('/user/login', user)
  localStorage.setItem(tokenName, data.token)
}

export const logout = () => {
  localStorage.removeItem(tokenName)
}

export const getUser = () => {
  try {
    const jwt = localStorage.getItem(tokenName)
    return jwtDecode(jwt)
  } catch (error) {
    return null
  }
}

export const getJWT = () => {
  return localStorage.getItem('token')
}
