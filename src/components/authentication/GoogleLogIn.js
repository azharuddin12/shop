import "../../styles/authentication/google-log-in.css";

import { useCallback, memo } from "react";
import { useHistory } from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google';

import useUserStore from "../../hooks/userStore";
import API from "../../hooks/useAPI";

const GoogleLogIn = () => {
  const setUser = useUserStore((state) => state.setUser);
  const history = useHistory();

  const handleGoogleLogIn = useCallback(async function(credential){
    await API.post("/user/sign-in/google", {
      credential
    }, 
    {
      headers:{ 
        'Content-Type': 'application/json' 
      }, 
      withCredentials: true
    })
    .then((res) => {
      if(res.data.success){
        setUser(res.data.user);
        history.push("/");
      }
    })
    .catch((err) => {
      console.log("An error occurred!", err);
    })
  }, []);

  return (
    <div className="google-log-in">
      <GoogleLogin
            onSuccess={credentialResponse => {
              handleGoogleLogIn(credentialResponse.credential);
            }}
            onError={() => {
              console.log('Login Failed');
            }}
          />
    </div>
  );
}
 
export default memo(GoogleLogIn);