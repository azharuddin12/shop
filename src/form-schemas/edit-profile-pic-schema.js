import * as yup from "yup";

export const editProfilePicSchema = yup.object().shape({
  profilePic: yup.mixed().test("fileSize", "File must be under 5MB", (value) => {
    return value && value.size <= 5 * 1024 * 1024; 
  }).required("Profile Picture is a required field"),
})