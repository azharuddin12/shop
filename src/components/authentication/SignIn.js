import "../../styles/general/form.css";
import "../../styles/general/forms-shared.css";

import { useState, useCallback } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Link } from "react-router-dom";

import { useFormik } from "formik";

import API from "../../hooks/useAPI";
import useUserStore from "../../hooks/userStore";
import { signInFormSchema } from "../../form-schemas/sign-in-form-schema";

import FormField from "../checkout/FormField";
import Message from "../general/Message";
import GoogleLogIn from "./GoogleLogIn";

const SignIn = () => {
  const history = useHistory();
  const setUser = useUserStore((state) => state.setUser);
  
  const [message, setMessage] = useState('');
  const [color, setColor] = useState('');
  const [display, setDisplay] = useState(false);

  const handleUserSignIn = useCallback(async function({ email, password }){
    await API.post("/user/sign-in", {
      email,
      password
    }, 
    { 
      headers: { 
        'Content-Type': 'application/x-www-form-urlencoded' 
      },
      withCredentials: true
    })
    .then((res) => {
      if(res.data.success){
        history.push("/");
        setColor("green");
        setUser(res.data.user);
      }
      else{
        setMessage(res.data.message);
        setColor("red");
        setDisplay(true);
        setTimeout(() => {setDisplay(false)}, 1200);
      }
    })
    .catch((err) => {
      console.log("An error occurred!", err);
    })
  }, []);

  const { values, errors, handleChange, handleBlur, handleSubmit, touched, isSubmitting } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: signInFormSchema,
    onSubmit: handleUserSignIn,
  });

  return (
    <div className="wrapper container" style={{
      "height": "100vh",
      "alignItems": "center",
    }}>
      <div className="form-section">
        {display && <Message message={message} color={color} />}
        <img src={require("../../images/shop-co.png")} alt="shop-co.png" />
        <h1>Welcome Back👋</h1>
        <p
          style={{
            textAlign: "center",
            marginBottom: "2em",
          }}
        >
          Sign in to continue
        </p>
        <form
          onSubmit={handleSubmit}
          autoComplete="off"
          className={isSubmitting ? "disabled" : ""}
        >
          <FormField
            label="Email"
            type="email"
            id="email"
            className={errors.email && touched.email ? "input-error" : ""}
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.email && touched.email ? errors.email : false}
          />
          <FormField
            label="Password"
            type="password"
            id="password"
            className={errors.password && touched.password ? "input-error" : ""}
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={
              errors.password && touched.password ? errors.password : false
            }
          />
          <Link to="/sign-up">
            <p
              style={{
                textAlign: "center",
                marginTop: "2em",
              }}
            >
              <strong>
                <u>Don't have an account? Sign up now!</u>
              </strong>
            </p>
          </Link>
          <button
            disabled={isSubmitting}
            className={isSubmitting ? "disabled" : ""}
            type="submit"
          >
            Sign In
          </button>
        </form>
        <p style={{
          "fontWeight": "700",
          "textAlign": "center",
          "marginTop": "1em",
          "paddingBottom": "0.5em",
          "borderBottom": "1px solid rgba(0, 0, 0, 0.12)",
        }}>
          OR
        </p>
        <GoogleLogIn />
      </div>
    </div>
  );
}
 
export default SignIn;