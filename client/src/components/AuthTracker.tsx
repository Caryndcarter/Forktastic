import { userContext } from "@/App";
import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import auth from "@/utils_graphQL/auth";

export default function AuthTracker() {
  const { userStatus, setUserStatus } = useContext(userContext);
  const location = useLocation();

  const updateStatus = (status: string) => {
    if (status !== userStatus) {
      setUserStatus(status);
    }
  };

  useEffect(() => {
    const loginCheck = auth.loggedIn();
    loginCheck ? updateStatus("subscriber") : updateStatus("visiter");
  }, [location.pathname]);

  return null;
}
