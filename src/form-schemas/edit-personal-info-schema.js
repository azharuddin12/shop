import * as yup from "yup";

export const editPersonalInfoSchema = yup.object().shape({
  firstName: yup.string().required("First Name is a required field"),
  lastName: yup.string().required("Last Name is a required field"),
  phoneNo: yup.number().required("Phone No is a required field"),
  dateOfBirth: yup.date().test('LessThanToday', `Date of birth should be smaller than ${(new Date).toLocaleDateString("en-GB")}`, (value) => {
    return value <= new Date;
  }).required("Date of Birth is a required field"),
  gender: yup.string().required(),
})