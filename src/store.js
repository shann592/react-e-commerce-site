import { create } from 'zustand'

const useStore = create((set) => ({
  user: null,
  cart: [],
}))

export default useStore
