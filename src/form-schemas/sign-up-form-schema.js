import * as yup from "yup";

export const signUpFormSchema = yup.object().shape({
  firstName: yup.string().required("First Name is a required field"),
  lastName: yup.string().required("Last Name is a required field"),
  phoneNo: yup.number().required("Phone No is a required field"),
  dateOfBirth: yup.date().test('LessThanToday', `Date of birth should be smaller than ${(new Date).toLocaleDateString("en-GB")}`, (value) => {
    return value <= new Date;
  }).required("Date of Birth is a required field"),
  gender: yup.string().required(),
  profilePic: yup.mixed().test("fileSize", "File must be under 5MB", (value) => {
    return value && value.size <= 5 * 1024 * 1024; 
  }).required("Profile Picture is a required field"),
  email: yup.string().email("Please enter a valid Email!").required(),
  password: yup.string().min(8).test("doesContainCapital", "Password must contain atleast one capital letter", (value) => {
    return /[A-Z]/.test(value);
  }).test("doesContainLowerCase", "Password must contain atleast one lowercase letter", (value) => {
    return /[a-z]/.test(value);
  }).test("doesContainNumber", "Password must contain atleast one number", (value) => {
    return /[0-9]/.test(value);
  }).required(),
  confirmPassword: yup.string().min(8, "Password Must Be At Least 8 Characters").oneOf([yup.ref('password'), null], 'Passwords must match').required("Confirm Password is a required field"),
})