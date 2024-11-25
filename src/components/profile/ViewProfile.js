import "../../styles/profile/view-profile.css";

import { useRef } from "react";

import useUserStore from "../../hooks/userStore";
import API from "../../hooks/useAPI";
import { Link } from "react-router-dom";

import EditProfilePic from "./EditProfilePic";

async function logout(){
  await API.delete("/token/delete", {
    withCredentials: true
  })
  .then((res) => {
    if(res.data.success){
      window.location.reload();
    }
  })
  .catch((err) => {
    console.log("An error occurred!", err);
  })
}

const ViewProfile = () => {
  const user = useUserStore((state) => state.user);

  const editProfilePic = useRef(null);

  return (
    <div className="view-profile container">
      <div className="left-section">
        <img src={user.profilePic} alt="profile.png" className="profile-img" />
        <img src={require("../../images/edit.png")} alt="edit.png" className="icon" onClick={() => { editProfilePic.current.classList.toggle("hide"); }} />
      </div>
      <div className="right-section">
        <h1>{`${user.firstName} ${user.lastName}`}</h1>
        <label>Email:</label>
        <p>{user.email}</p>
        <label>Phone No:</label>
        <p>{user.phoneNo || "Not Specified"}</p>
        <label>Date of Birth:</label>
        <p>{user.dateOfBirth?.split("T")[0] || "Not Specified"}</p>
        <label>Gender:</label>
        <p style={{ "textTransform": "capitalize" }}>
          {user.gender || "Not Specified"}
        </p>
      </div>
      <div className="bottom-section">
        <Link to="/profile/edit-personal-info">
          <button>Edit Personal Info</button>
        </Link>
        <Link className={ user.isGoogleLogIn? "hide" : "" } to="/profile/edit-account-info">
          <button>Edit Account Info</button>
        </Link>
        <button onClick={logout}>Logout</button>
      </div>
      <EditProfilePic ref={ editProfilePic } />
    </div>
  );
}
 
export default ViewProfile;