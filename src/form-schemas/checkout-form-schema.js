import * as yup from "yup";

export const checkoutFormSchema = yup.object().shape({
  address: yup.string().required(),
  city: yup.string().required(),
  country: yup.string().required(),
  cardNo: yup.number().integer("Card number must be an integer").positive("Card number Must Be A Positive Number").test('len', "Card number must be comprised of 16 digits", (val) => val.toString().length === 16).required("Card Number Is A Required Field"),
  cvv: yup.number().integer("CVV must be an integer").positive("CVV Must Be A Positive Number").test('len', "CVV must be comprised of 3 digits", (val) => val.toString().length === 3).required("CVV Is A Required Field"),
  expiryDate: yup.date().required("Expiry Date Is A Required Field"),
})