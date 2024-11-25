import "../../styles/checkout/checkout.css";

import { useState } from "react";

import OrderSummary from '../cart/OrderSummary'
import CheckoutForm from "./CheckoutForm";

const Checkout = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (  
    <div className="checkout container">
      {
        isSubmitted ||
        <OrderSummary btnText={"Modify Order"} btnPath={"/view-cart"} />
      }
      <CheckoutForm isSubmitted={isSubmitted} setIsSubmitted={setIsSubmitted} />
    </div>
  );
}
 
export default Checkout;