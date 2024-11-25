import * as yup from "yup";

export const EditAccountInfoSchema = yup.object().shape({
  oldEmail: yup.string().email("Please enter a valid Email!").required("Email is a required field"),
  oldPassword: yup.string().min(8).required("Password is a required field"),
  newEmail: yup.string().email("Please enter a valid Email!").required("Email is a required field"),
  oldPassword: yup.string().min(8).required("Password is a required field"),
  newPassword: yup.string().min(8).test("doesContainCapital", "Password must contain atleast one capital letter", (value) => {
    return /[A-Z]/.test(value);
  }).test("doesContainLowerCase", "Password must contain atleast one lowercase letter", (value) => {
    return /[a-z]/.test(value);
  }).test("doesContainNumber", "Password must contain atleast one number", (value) => {
    return /[0-9]/.test(value);
  }).required("Password is a required field"),
})