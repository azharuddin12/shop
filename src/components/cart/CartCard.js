import "../../styles/cart/cart-card.css";

import { useEffect, useState, useCallback } from "react";
import useCartStore from "../../hooks/useCartStore";

import Rating from "../general/Rating";
import Counter from "../general/Counter";

const CartCard = ({ product, setIsProductRemoved }) => {
  const [count, setCount] = useState(product.quantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);

  const removeProduct = useCallback(() => {
    removeFromCart(product);
    
    setIsProductRemoved(true);
    setTimeout(() => {
      setIsProductRemoved(false);
    }, 1200);
  }, [])

  useEffect(() => {
    updateQuantity(product, count);
  }, [count])

  return (
    <div className="cart-card">
      <div className="left-section">
        <div className="img">
          <img src={product.image} alt="product.png" />
        </div>
      </div>
      <div className="right-section">
        <p className="title">{product.title}</p>
        <Rating rating={product.rating.rate}/>
        <p className="price">${product.price.toFixed(2)}</p>
        <div className="util-section">
          <Counter count={ count } setCount={ setCount } />
          <div className="delete" onClick={removeProduct}>
            <img src={require("../../images/delete.png")} alt="delete.png" />
          </div>
        </div>
      </div>
    </div>
  );
}
 
export default CartCard;