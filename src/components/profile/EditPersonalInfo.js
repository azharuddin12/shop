import "../../styles/profile/edit-profile.css";
import "../../styles/general/form.css";
import "../../styles/general/forms-shared.css";

import { useState, useCallback } from "react";

import { useFormik } from "formik";
import useUserStore from "../../hooks/userStore";
import API from "../../hooks/useAPI";

import { Link } from "react-router-dom";
import { editPersonalInfoSchema } from "../../form-schemas/edit-personal-info-schema";

import RadioField from "../checkout/RadioField";
import FormField from "../checkout/FormField";
import Message from "../general/Message";

const EditPersonalInfo = () => {
  const [message, setMessage] = useState('');
  const [color, setColor] = useState('');
  const [display, setDisplay] = useState(false);

  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  const onSubmit = useCallback(async function({ firstName, lastName, phoneNo, dateOfBirth, gender }){
    await API.patch("/profile/edit/personal-info", {
      firstName,
      lastName,
      phoneNo,
      dateOfBirth,
      gender,
      email: user.email,
    }, 
    { 
      headers: { 
        'Content-Type': 'application/x-www-form-urlencoded' 
      }
    })
    .then((res) => {
      setMessage(res.data.message);
      if(res.data.success){
        setColor("green");
        setUser(res.data.user);
      }
      else{
        setColor("red");
      }
      setDisplay(true);
      setTimeout(() => {
        setDisplay(false) 
      }, 1200);
    })
    .catch((err) => {
      console.log("An error occurred!", err);
    });
  }, [])

  const { values, errors, handleChange, handleBlur, handleSubmit, touched, isSubmitting } = useFormik({
    initialValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNo: user.phoneNo,
      dateOfBirth: user.dateOfBirth?.split("T")[0],
      gender: user.gender,
    },
    validationSchema: editPersonalInfoSchema,
    onSubmit: onSubmit,
  });

  return (
    <div className="edit-profile container">
      <div className="wrapper">
        <div className="form-section">
          {display && <Message message={message} color={color} />}
          <img src={require("../../images/shop-co.png")} alt="shop-co.png" />
          <h1>Edit Personal Info📝</h1>
          <p
            style={{
              textAlign: "center",
              marginBottom: "2em",
            }}
          >
            Replace the existing information with new one
          </p>
          <form
            onSubmit={handleSubmit}
            autoComplete="off"
            className={isSubmitting ? "disabled" : ""}
          >
            <FormField
              label="First Name"
              type="text"
              id="firstName"
              className={
                errors.firstName && touched.firstName ? "input-error" : ""
              }
              value={values.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              error={
                errors.firstName && touched.firstName ? errors.firstName : false
              }
            />
            <FormField
              label="Last Name"
              type="text"
              id="lastName"
              className={
                errors.lastName && touched.lastName ? "input-error" : ""
              }
              value={values.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              error={
                errors.lastName && touched.lastName ? errors.lastName : false
              }
            />
            <FormField
              label="Phone No"
              type="tel"
              id="phoneNo"
              className={errors.phoneNo && touched.phoneNo ? "input-error" : ""}
              value={values.phoneNo}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.phoneNo && touched.phoneNo ? errors.phoneNo : false}
            />
            <FormField
              label="Date of Birth"
              type="date"
              id="dateOfBirth"
              className={
                errors.dateOfBirth && touched.dateOfBirth ? "input-error" : ""
              }
              value={values.dateOfBirth}
              onChange={handleChange}
              onBlur={handleBlur}
              error={
                errors.dateOfBirth && touched.dateOfBirth
                  ? errors.dateOfBirth
                  : false
              }
            />
            <RadioField
            mainLabel="Gender"
            name="gender"
            formikValue={ values.gender }
            className={
              errors.gender && touched.gender ? "radio-error" : ""
            }
            radioValues={['male', 'female']}
            onChange={handleChange}
            onBlur={handleBlur}
            error={
              errors.gender && touched.gender
                ? errors.gender
                : false
            }
          />
            <Link to="/profile">
              <p
                style={{
                  textAlign: "center",
                  marginTop: "2em",
                }}
              >
                <strong>
                  <u>Done making changes? Back to Profile</u>
                </strong>
              </p>
            </Link>
            <button 
              disabled={isSubmitting}
              className={isSubmitting ? "disabled" : ""}
              type="submit"
            >
              Submit Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
 
export default EditPersonalInfo;