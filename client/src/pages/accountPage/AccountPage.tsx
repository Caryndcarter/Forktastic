import { useState, useLayoutEffect } from "react";
//import { authService } from '../api/authentication';
import SignUpFormGraph from "./SignUpForm";
import LoginFormGraph from "./LoginForm";
import AccountShowCase from "./AccountShowCase";
import Auth from "@/utils_graphQL/auth";
import { Toaster } from "sonner";

const UserInfo = () => {
  const [loginCheck, setLoginCheck] = useState(false);
  const [signIn, setSignIn] = useState(true);

  useLayoutEffect(() => {
    const checkLogin = () => {
      if (Auth.loggedIn()) {
        setLoginCheck(true);
      }
    };

    checkLogin();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fef3d0]">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        {loginCheck ? (
          <AccountShowCase setLoginCheck={setLoginCheck}></AccountShowCase>
        ) : signIn ? (
          <LoginFormGraph setSignIn={setSignIn}></LoginFormGraph>
        ) : (
          <SignUpFormGraph setSignIn={setSignIn}></SignUpFormGraph>
        )}
      </div>
      <Toaster
        position="bottom-right"
        closeButton
        theme="light"
        toastOptions={{
          style: {
            background: "#fef3d0",
            border: "1px solid #a84e24",
            color: "#6B2A29",
          },
          duration: 4000,
        }}
      />
    </div>
  );
};

export default UserInfo;
