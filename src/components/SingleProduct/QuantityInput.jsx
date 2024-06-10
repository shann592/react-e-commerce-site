function QuantityInput({
  setQuantity,
  quantity,
  stock,
  cartPage = false,
  updateCart,
  productId,
}) {
  return (
    <>
      <button
        onClick={() => {
          cartPage
            ? updateCart('decrease', productId)
            : setQuantity(quantity - 1)
        }}
        disabled={quantity === 0}
        className="disabled:opacity-30 disabled:cursor-default w-[30px] h-[30px] text-center text-2xl bg-[#ff8848] text-white border-none rounded-[100%] cursor-pointer"
      >
        -
      </button>
      <p className="text-center mx-10">{quantity}</p>
      <button
        disabled={quantity >= stock}
        onClick={() => {
          cartPage
            ? updateCart('increase', productId)
            : setQuantity(quantity + 1)
        }}
        className="w-[30px] h-[30px] text-center text-2xl bg-[#ff8848] text-white border-none rounded-[100%] cursor-pointer"
      >
        +
      </button>
    </>
  )
}
export default QuantityInput
