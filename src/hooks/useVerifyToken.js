import { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import useUserStore from "./userStore";
import API from "./useAPI";

export const useVerifyToken = () => {
  const setUser = useUserStore((state) => state.setUser);
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    
    async function verifyToken(){
      await API.get("/token/verify", {
        withCredentials: true,
        signal: signal,
      })
      .then((res) => {
        if(res.data.isAuthenticated){
          setUser(res.data.user);
          if(location.pathname === "/sign-in" || location.pathname === "/sign-up")
            history.push("/");
        }
        else{
          history.push("/sign-in");
        }
      })
      .catch((err) => {
        if(err.message !== "Request aborted")
          console.log("An error occurred!", err);
      })
    }

    verifyToken();

    return () => {
      controller.abort();
    }
  }, []);
}