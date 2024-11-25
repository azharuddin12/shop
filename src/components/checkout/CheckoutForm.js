import "../../styles/checkout/checkout-form.css";
import "../../styles/general/form.css";

import { useCallback } from "react";
import { useFormik } from "formik";
import useCartStore from "../../hooks/useCartStore";

import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { checkoutFormSchema } from "../../form-schemas/checkout-form-schema";

import FormField from "./FormField";
import Message from "../general/Message";

const CheckoutForm = ({ isSubmitted, setIsSubmitted }) => {
  const clearCart = useCartStore((state) => state.clearCart);

  const onSubmit = useCallback(() => {
    setIsSubmitted(true);
    clearCart();
  }, [])

  const { values, errors, handleChange, handleBlur, handleSubmit, touched, isSubmitting } = useFormik({
    initialValues: {
      address: "",
      city: "",
      country: "",
      cardNo: "",
      cvv: "",
      expiryDate: "",
    },
    validationSchema: checkoutFormSchema,
    onSubmit: onSubmit,
  });

  return (
    <div className="checkout-form">
      <h1>Checkout</h1>
      { 
        isSubmitted &&
        <p style={{"textAlign": "center"}}>Your order has been placed successfully!</p>
      }
      {
        isSubmitted && 
        <Link to="/">
          <button>Back to Home</button>
        </Link>
      }
      {
        isSubmitted || 
        <form onSubmit={handleSubmit} autoComplete="off" className={isSubmitting? "disabled":""}>
          <p className="title">Shipping Address</p>
          <FormField 
            label="Address" 
            type="text" 
            id="address" 
            className={ errors.address && touched.address? "input-error":""} 
            value={ values.address } 
            onChange={ handleChange } 
            onBlur={ handleBlur } 
            error={ errors.address && touched.address? errors.address:false } 
          />
          
          <FormField 
            label="City" 
            type="text" 
            id="city" 
            className={ errors.city && touched.city? "input-error":""} 
            value={ values.city } 
            onChange={ handleChange } 
            onBlur={ handleBlur } 
            error={ errors.city && touched.city? errors.city:false } 
          />
          
          <FormField 
            label="Country" 
            type="text" 
            id="country" 
            className={ errors.country && touched.country? "input-error":""} 
            value={ values.country } 
            onChange={ handleChange } 
            onBlur={ handleBlur } 
            error={ errors.country && touched.country? errors.country:false } 
          />

          <p className="title">Payment Information</p>
          <FormField 
            label="Card No" 
            type="number" 
            id="cardNo" 
            className={ errors.cardNo && touched.cardNo? "input-error":""} 
            value={ values.cardNo } 
            onChange={ handleChange } 
            onBlur={ handleBlur } 
            error={ errors.cardNo && touched.cardNo? errors.cardNo:false } 
          />
          
          <FormField 
            label="CVV" 
            type="number" 
            id="cvv" 
            className={ errors.cvv && touched.cvv? "input-error":""} 
            value={ values.cvv } 
            onChange={ handleChange } 
            onBlur={ handleBlur } 
            error={ errors.cvv && touched.cvv? errors.cvv:false } 
          />
          
          <FormField 
            label="Expiry Date" 
            type="date" 
            id="expiryDate" 
            className={ errors.expiryDate && touched.expiryDate? "input-error":""} 
            value={ values.expiryDate } 
            onChange={ handleChange } 
            onBlur={ handleBlur } 
            error={ errors.expiryDate && touched.expiryDate? errors.expiryDate:false } 
          />
          
          <button disabled={ isSubmitting } className={ isSubmitting? "disabled":"" } type="submit">Place Order</button>
        </form>
      }
      { isSubmitted && <Message message="Form Submitted!" color="green" /> }
    </div>
  );
}
 
export default CheckoutForm;