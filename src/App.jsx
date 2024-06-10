import { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import UserContext from './contexts/userContext'
import CartContext from './contexts/cartContext'

import NavBar from './components/NavBar/NavBar'
import { Loader } from './components/common/Loader'
import Routing from './components/routing/Routing'
import { getJWT, getUser } from './services/userServices'
import setAuthToken from './utils/setAuthToken'
import {
  addToCartAPI,
  getCartAPI,
  increaseProdAPI,
  decreaseProdAPI,
} from './services/cartServices'
import 'react-toastify/dist/ReactToastify.css'

setAuthToken(getJWT())

function App() {
  const [user, setUser] = useState(null)
  const [cart, setCart] = useState([])

  useEffect(() => {
    try {
      const user = getUser()
      if (Date.now() < user.exp) {
        location.reload()
      } else {
        setUser(user)
      }
    } catch (error) {}
  }, [])

  const addToCart = (product, quantity) => {
    const updatedCart = [...cart]
    const productIdx = updatedCart.findIndex(
      (ci) => ci.product._id === product._id
    )
    if (productIdx === -1) {
      updatedCart.push({ product, quantity })
    } else {
      updatedCart[productIdx].quantity += quantity
    }
    setCart(updatedCart)
    addToCartAPI(product._id, quantity)
      .then((res) => {
        toast.success(res.data.message)
      })
      .catch((err) => {
        toast.error(err.response)
        setCart(cart)
      })
  }

  const removeFromCart = (id) => {
    const oldCart = [...cart]
    const newCart = oldCart.filter((item) => item.product._id !== id)
    setCart(newCart)
    // console.log(cart)
    // removeFromCart(id).catch((err) => {
    //   toast.error('Something went wrong! 💥.')
    //   setCart(oldCart)
    // })
  }

  const updateCart = (type, id) => {
    const oldCart = [...cart]
    const updatedCart = [...cart]
    const productIdx = updatedCart.findIndex((item) => item.product._id === id)
    if (type === 'increase') {
      updatedCart[productIdx].quantity += 1
      increaseProdAPI(id).catch((err) => {
        toast.error('Something went wrong! 💥.')
        setCart(oldCart)
      })
    }
    if (type === 'decrease') {
      updatedCart[productIdx].quantity -= 1
      decreaseProdAPI(id).catch((err) => {
        toast.error('Something went wrong! 💥.')
        setCart(oldCart)
      })
    }
    setCart(updatedCart)
  }

  const getCart = () => {
    getCartAPI()
      .then((res) => setCart(res.data))
      .catch((err) => console.log('Something went wrong! 💥.'))
  }
  useEffect(() => {
    if (user) {
      getCart()
    }
  }, [user])
  return (
    <UserContext.Provider value={{ user }}>
      <CartContext.Provider
        value={{ addToCart, cart, removeFromCart, updateCart, setCart }}
      >
        <div className="grid grid-rows-[80px,auto] w-full h-screen">
          <NavBar />
          <main className="bg-blue-50">
            <ToastContainer position="bottom-right" />
            <Routing addToCart={addToCart} cart={cart} />
          </main>
        </div>
      </CartContext.Provider>
    </UserContext.Provider>
  )
}
export default App
