import { NavLink } from 'react-router-dom'
import { iphone, star, bascket } from '../../assets'
import { useContext } from 'react'
import CartContext from '../../contexts/cartContext'
import UserContext from '../../contexts/userContext'
function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext)
  const { user } = useContext(UserContext)
  return (
    <article className="w-[275px] min-h-[300px] m-5 rounded-[12px] shadow-md bg-white overflow-hidden">
      <div className="border-[1px] w-full border-gray-100 h-48">
        <NavLink
          to={`${product?._id}`}
          className="h-full w-full text-center border-[1px] border-b-[#e5e5e5]"
        >
          <img
            src={`http://localhost:5000/products/${product?.images[0]}`}
            className="h-full w-full"
            alt="product image"
          />
        </NavLink>
      </div>
      <div className="py-2 px-5 mt-5">
        <h3 className="text-xl font-bold">${product?.price}</h3>
        <p className="text-lg mt-1">{product?.title}</p>
        <footer className="flex items-center justify-between my-2">
          <div className="flex items-center">
            <p className="flex items-center h-7 py-1 px-2 font-semibold rounded-[5px] bg-[#fca311] text-white">
              <img src={star} alt="star" className="w-5 mr-2" />
              {product?.reviews.rate}
            </p>
            <p className="text-[16px] ml-5 text-gray-500 px-5 border-2 border-l-[#dcdcdc]">
              {product?.reviews.counts}
            </p>
          </div>
          {product?.stock > 0 && user && (
            <button className="w-10 h-10 border-none rounded-full bg-transparent cursor-pointer">
              <img
                src={bascket}
                alt="bascket"
                className="w-full h-full"
                onClick={() => addToCart(product, 1)}
              />
            </button>
          )}
        </footer>
      </div>
    </article>
  )
}
export default ProductCard
