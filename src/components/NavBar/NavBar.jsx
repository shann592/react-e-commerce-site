import { NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { rocket, star, idButton, memo, order, lock } from '../../assets'
import LinkWithIcon from './LinkWithIcon'
import UserContext from '../../contexts/userContext'
import { useContext } from 'react'
import CartContext from '../../contexts/cartContext'

function NavBar() {
  const [search, setSearch] = useState('')
  const { user } = useContext(UserContext)
  const { cart } = useContext(CartContext)
  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault()
    if (search !== '') {
      useNavigate(`/products?search=${search.trim()}`)
    }
  }
  return (
    <nav className="flex items-center justify-between py-10 px-5 bg-white">
      <section className="flex items-center">
        <h1 className="text-3xl mr-5 font-bold">E-Comm-Site</h1>
        <form
          onSubmit={handleSubmit}
          className="flex items-center w-450px h-40px border-[1px] border-[#cdcdcd] rounded-[5px] p-1"
        >
          <input
            type="text"
            className="flex-1 h-full py-0 px-2 text-lg font-medium border-none outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className="h-full px-2 text-lg font-medium border-none rounded-[5px] bg-[#6457f9] text-white cursor-pointer"
            type="submit"
          >
            Search
          </button>
        </form>
      </section>
      <section className="flex items-center text-lg">
        <LinkWithIcon linkTitle="Home" emoji={rocket} link="/" />
        <LinkWithIcon linkTitle="Products" emoji={star} link="/products" />
        {!user && (
          <>
            <LinkWithIcon linkTitle="LogIn" emoji={idButton} link="/login" />
            <LinkWithIcon linkTitle="SignUp" emoji={memo} link="/signup" />
          </>
        )}
        {user && (
          <>
            {' '}
            <LinkWithIcon
              linkTitle="My Orders"
              emoji={order}
              link="/myorders"
            />
            <LinkWithIcon linkTitle="LogOut" emoji={lock} link="/logout" />
            <NavLink to="/cart" className="flex items-center">
              Cart{' '}
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#6457f9] text-white text-lg font-bold ml-1">
                {cart.length}
              </span>
            </NavLink>
          </>
        )}
      </section>
    </nav>
  )
}
export default NavBar
