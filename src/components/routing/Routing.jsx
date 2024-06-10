import { Route, Routes } from 'react-router-dom'

import CartPage from '../Cart/CartPage'
import Home from '../Home/Home'
import MyOrderPage from '../MyOrder/MyOrderPage'
import ProductsPage from '../Products/ProductsPage'
import SingleProductPage from '../SingleProduct/SingleProductPage'
import LoginPage from '../authentication/LoginPage'
import SingUpPage from '../authentication/SingUpPage'
import ProductsHome from '../Products/ProductsHome'
import Logout from '../authentication/Logout'
import ProtectedRoute from './ProtectedRoute'
function Routing({ addToCart, cart }) {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<ProductsPage />}>
        <Route path="" element={<ProductsHome />} />
        <Route
          path=":id"
          element={<SingleProductPage addToCart={addToCart} />}
        />
      </Route>

      {/* <Route path="/products/:id" element={<SingleProductPage />} /> */}
      <Route path="/signup" element={<SingUpPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/logout" element={<Logout />} />
        <Route path="/cart" element={<CartPage cart={cart} />} />
        <Route path="/myorders" element={<MyOrderPage />} />
      </Route>
    </Routes>
  )
}
export default Routing
