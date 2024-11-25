import "../../styles/cart/order-summary.css";

import { useEffect, useState } from "react";
import useCartStore from "../../hooks/useCartStore";

import { Link } from "react-router-dom";

const OrderSummary = ({ btnPath, btnText }) => {
  const [items, setItems] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const shipping = 15;
  const taxPerc = 10; 
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);
  const cart = useCartStore((state) => state.cart);

  useEffect(() => {
    setItems(cart.length);
  }, [cart.length])

  useEffect(() => {
    let subTotalPrice = 0;

    cart.forEach((item) => {
      subTotalPrice += item.price * item.quantity;
    })

    setSubTotal(subTotalPrice);
  }, [cart])

  useEffect(() => {
    setTax(subTotal * (taxPerc/100));
    setTotal(subTotal && (subTotal + shipping + tax));
  }, [subTotal])

  return (
    <div className="order-summary">
      <h1>Order Summary</h1>
      <div className="wrap">
        <p>{"Items: "}</p>
        <p className="value">{items}</p>
      </div>
      <div className="wrap">
        <p>{ "Subtotal: "}</p>
        <p>{ "$" + subTotal.toFixed(2) }</p>
      </div>
      <div className="wrap">
        <p>{ "Shipping: " }</p>
        <p>{ "$" + shipping.toFixed(2) }</p>
      </div>
      <div className="wrap">
        <p>{ `Tax (${ taxPerc }%): ` }</p>
        <p>{ "$" + tax.toFixed(2) }</p>
      </div>
      <div className="wrap">
        <p>{"Total: " }</p>
        <p className="total">{ "$" + total.toFixed(2) }</p>
      </div>
      <Link to={ btnPath }>
        <button disabled={!items} className={ items? "":"disabled" }>{ btnText }</button>
      </Link>
    </div>
  );
}
 
export default OrderSummary;