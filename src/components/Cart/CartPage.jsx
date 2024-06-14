import { useState, useContext } from "react";
import UserContext from "../../contexts/userContext";

import QuantityInput from "../SingleProduct/QuantityInput";
import Table from "../common/Table";
import { remove } from "../../assets";
import { useEffect } from "react";
import CartContext from "../../contexts/cartContext";
import { checkoutAPI } from "../../services/cartServices";
import { ToastContainer, toast } from "react-toastify";
import config from "../../config.json";
function CartPage() {
  const { user } = useContext(UserContext);
  const { cart, removeFromCart, updateCart, setCart } = useContext(CartContext);
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    let total = 0;
    cart.forEach((item) => {
      total += item.product.price * item.quantity;
    });

    setSubtotal(total);
  }, [cart]);

  const checkout = () => {
    const oldCart = [...cart];
    setCart([]);
    checkoutAPI()
      .then(() => toast.success("Order placed successfully."))
      .catch(() => {
        toast.error("Something went wrong!");
        setCart(oldCart);
      });
  };

  return (
    <section className="flex items-center flex-col justify-center w-3/5 mx-auto py-8 px-12">
      <div className="flex items-center gap-4 mb-8">
        <img
          className="w-[80px] h-[80px] object-cover rounded-full object-center"
          src={`${config.backendURL}/profile/${user?.profilePic}`}
          alt="user profile"
        />
        <div>
          <p className="text-xl font-semibold">Name: {user?.name}</p>
          <p className="text-gray-500">Email: {user?.email}</p>
        </div>
      </div>
      <Table headings={["Item", "Price", "Quantity", "Total", "Remove"]}>
        <tbody className="*:h-12 *:text-center *:even:bg-[#f5f5f5]">
          {cart.map(({ product, quantity }) => (
            <tr key={product._id}>
              <td>{product.title}</td>
              <td>${product.price}</td>
              <td className="items-center flex justify-center pt-1">
                <QuantityInput
                  quantity={quantity}
                  stock={product.stock}
                  cartPage
                  updateCart={updateCart}
                  productId={product._id}
                />
              </td>
              <td>${product.price * quantity}</td>
              <td className="flex items-center justify-center pt-1">
                <img
                  src={remove}
                  className="w-8 h-8 cursor-pointer"
                  alt="remove icon"
                  onClick={() => removeFromCart(product._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <table className="self-end w-[400px] border-collapse text-sm mt-4 bg-white  text-center text-gray-500">
        <tbody>
          <tr className="border-2 border-gray-300">
            <td className="p-2 border-2 border-r-gray-300">Subtotal</td>
            <td className="p-2">${subtotal}</td>
          </tr>
          <tr className="border-2 border-gray-300">
            <td className="p-2 border-2 border-r-gray-300">Shipping Charge</td>
            <td className="p-2">$5</td>
          </tr>
          <tr className="border-2 font-bold text-black text-lg">
            <td className="p-2 border-2 border-r-gray-300">Total</td>
            <td className="p-2">${subtotal + 5}</td>
          </tr>
        </tbody>
      </table>
      <button
        onClick={checkout}
        className="self-end mt-5 h-full px-2 text-lg font-medium border-none rounded-[5px] bg-[#6457f9] text-white cursor-pointer"
      >
        Checkout
      </button>
    </section>
  );
}
export default CartPage;
