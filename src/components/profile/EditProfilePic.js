import "../../styles/profile/edit-profile-pic.css";

import { useState, useCallback, forwardRef } from "react";
import { useFormik } from "formik";
import useUserStore from "../../hooks/userStore";
import API from "../../hooks/useAPI";
import { editProfilePicSchema } from "../../form-schemas/edit-profile-pic-schema";

import Message from "../general/Message";
import FormField from "../checkout/FormField";

const EditProfilePic = forwardRef((props, ref) => {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  
  const [display, setDisplay] = useState(false);
  const [message, setMessage] = useState();
  const [color, setColor] = useState();

  const onSubmit = useCallback(async ({ profilePic }) => {
    await API.patch("/profile/edit/profile-pic", {
      profilePic,
      email: user.email,
    }, 
    { 
      headers: { 
        'Content-Type': 'multipart/form-data' 
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
  }, []);

  const handleFileChange = useCallback((e) => {
    const file = e.currentTarget.files[0];
    setFieldValue("profilePic", file);
  }, []);

  const { errors, handleBlur, handleSubmit, touched, isSubmitting, setFieldValue } = useFormik({
    initialValues: {
      profilePic: "",
    },
    validationSchema: editProfilePicSchema,
    onSubmit: onSubmit,
  });

  return (
    <>
      {display && <Message message={message} color={color} />}
      <div ref={ref} className="edit-profile-pic hide">
        <h1 style={{ textAlign: "center" }}>Edit Profile Pic📝</h1>
        <p
          style={{
            textAlign: "center",
            marginBottom: "2em",
          }}
        >
          Please choose a new profile picture
        </p>
        <img
          src={require("../../images/cross.png")}
          alt="cross.png"
          className={isSubmitting ? "icon disabled" : "icon"}
          onClick={() => { if(!isSubmitting){
            ref.current.classList.toggle("hide");
          } 
          }}
        />
        <form
          onSubmit={handleSubmit}
          autoComplete="off"
          className={isSubmitting ? "disabled" : ""}
          encType="multipart/form-data">
          <FormField
            label="Profile Picture"
            type="file"
            accept="image/*"
            id="profilePic"
            className={
              errors.profilePic && touched.profilePic ? "input-error" : ""
            }
            value={undefined}
            onChange={handleFileChange}
            onBlur={handleBlur}
            error={
              errors.profilePic && touched.profilePic
                ? errors.profilePic
                : false
            }
          />
          <button
            disabled={isSubmitting}
            className={isSubmitting ? "disabled" : ""}
            type="submit"
          >Submit</button>
        </form>
      </div>
    </>
  );
});

export default EditProfilePic;