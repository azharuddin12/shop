import "../../styles/products/product-details.css";

import { useEffect, useState, useMemo, useCallback } from "react";
import { useParams } from "react-router-dom";
import useCartStore from "../../hooks/useCartStore"

import Counter from "../general/Counter";
import Message from "../general/Message";
import Rating from "../general/Rating";

const ProductDetails = ({ products }) => {
  const cart = useCartStore((state) => state.cart);
  const addToCart = useCartStore((state) => state.addToCart);

  const [count, setCount] = useState(1);
  const { id } = useParams();
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  
  const product = useMemo(() => {
    return products.find((product) => product.id === parseInt(id));
  }, [products, id])

  const handleClick = useCallback(() => {
    addToCart({ ...product, quantity: count });
    setIsAddedToCart(true);
    setTimeout(() => {setIsAddedToCart(false)}, 1200);
  }, [product, count])

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart])

  return (
    <div className="product-details container">
      {
        isAddedToCart && <Message message={"Product added to cart successfully!"} color={"green"} />
      }
      <div className="left-section">
        <img src={ product.image } alt="product.png" />
      </div>
      <div className="right-section">
        <h1>{ product.title }</h1>
        <Rating rating={ product.rating.rate} />
        <p style={{"fontWeight": "800","fontSize": "2.1rem"}}>${ product.price.toFixed(2) }</p>
        <p>{ product.description }</p>
        <Counter count={ count } setCount= { setCount }/>
        <button className="add-to-cart-btn" onClick={ handleClick }>Add to Cart</button>
      </div>
    </div>
  );
}
 
export default ProductDetails;