import * as yup from "yup";

export const signInFormSchema = yup.object().shape({
  email: yup.string().email("Please enter a valid Email!").required(),
  password: yup.string().min(8).required(),
})