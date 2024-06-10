import { useContext, useState } from 'react'
import QuantityInput from './QuantityInput'
import { useParams } from 'react-router-dom'
import useData from '../../hooks/useData'
import { DefaultPageSkeleton } from '../common/DefaultPageSkeleton'
import CartContext from '../../contexts/cartContext'
import UserContext from '../../contexts/userContext'

function SingleProductPage() {
  const { id } = useParams()
  const { user } = useContext(UserContext)
  const { addToCart } = useContext(CartContext)
  const { data: product, error, isLoading } = useData(`/products/${id}`)
  const [quantity, setQuantity] = useState(0)

  const [selectedImage, setSelectedImage] = useState(0)

  return (
    <section className="flex items-center justify-center py-9 px-12">
      {error && <em className="text-red-400">{error}</em>}
      {isLoading && <DefaultPageSkeleton />}
      {product && (
        <>
          <div className="flex items-center">
            <div className="flex flex-col flex-wrap gap-3 p-2 m-4">
              {product.images.map((image, index) => (
                <img
                  src={`http://localhost:5000/products/${image}`}
                  alt={product.title}
                  onClick={() => setSelectedImage(index)}
                  className={
                    selectedImage === index
                      ? 'w-20 h-20 object-cover rounded-[5px] cursor-pointer overflow-hidden scale-110 ease-in-out duration-200'
                      : 'w-20 h-20 object-cover rounded-[5px] cursor-pointer overflow-hidden ease-in-out duration-200'
                  }
                  key={index}
                />
              ))}
            </div>
            <img
              className="w-[600px] h-[600px] object-cover rounded-[10px] mb-1"
              src={`http://localhost:5000/products/${product.images[selectedImage]}`}
              alt={product.title}
            />
          </div>
          <div className="flex flex-col w-[35%] py-4 px-6">
            <h1 className="mb-4 text-3xl font-bold">{product.title}</h1>
            <p className="mb-4 leading-[1.4] text-gray-500">
              {product.description}
            </p>
            <p className="mb-4 text-2xl font-semibold">
              ${product.price.toFixed(2)}
            </p>
            {user && (
              <>
                <h2 className="text-xl font-bold">Quantity: </h2>
                <div className="flex items-center gap-1 text-xl font-bold my-1 mr-3">
                  <QuantityInput
                    setQuantity={setQuantity}
                    quantity={quantity}
                    stock={product.stock}
                  />
                </div>
                <button
                  className="px-4 py-2 text-lg font-medium border-none rounded-[5px] bg-[#6457f9] text-white cursor-pointer w-[140px] text-nowrap"
                  onClick={() => {
                    addToCart(product, quantity)
                  }}
                >
                  Add to Cart
                </button>
              </>
            )}
          </div>
        </>
      )}
    </section>
  )
}
export default SingleProductPage
