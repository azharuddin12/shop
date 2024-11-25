import "../../styles/cart/view-cart.css";

import { useEffect, useState } from "react";
import useCartStore from "../../hooks/useCartStore";

import CartCard from "./CartCard";
import OrderSummary from "./OrderSummary";
import Message from "../general/Message";

const ViewCart = () => {
  const cart = useCartStore((state) => state.cart);
  const [isProductRemoved, setIsProductRemoved] = useState(false);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart])
  
  return (
    <div className="view-cart container">
      {
        isProductRemoved &&
        <Message message={ "Product removed successfully!" } color={ "green" } />
      }
      <h1>Your Cart</h1>
      <div className="wrapper">
        <OrderSummary btnText={"Checkout"} btnPath={"/checkout"} />
        <div className="cart-items">
          {
            cart.map((item) => {
              return (   
                <CartCard key={item.id} product={item} setIsProductRemoved={setIsProductRemoved} />
              )
            })
          }
        </div>
      </div>
    </div>
  );
}
 
export default ViewCart;