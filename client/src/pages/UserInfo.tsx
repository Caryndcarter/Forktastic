
import { useState, useLayoutEffect, } from 'react';
//import { authService } from '../api/authentication';
import SignUpFormGraph from '../components/SignUpFormGraph';
import LoginFormGraph from '../components/LoginFormGraph';
import AccountShowCase from '../components/AccountShowCase';
import Auth from '../utils_graphQL/auth'; 
import Navbar from '@/components/Navbar';

const UserInfo = () => {
  const [loginCheck,setLoginCheck] = useState(false);
  const [signIn,setSignIn] = useState(true);

  useLayoutEffect(() => {
    const checkLogin =  () => {
      if (Auth.loggedIn()) {
        setLoginCheck(true);
      }
    };
  
    checkLogin(); 
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fef3d0]">
      <Navbar /> 
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        {
          loginCheck 
            ? (<h2 className="text-2xl font-bold mb-6 text-center text-[#a84e24]">
              { signIn ? 'Dietary Preferences' : 'Sign Up'}
              </h2>
            )
            : <></>
        }
        {
          loginCheck
            ? <AccountShowCase setLoginCheck={setLoginCheck}></AccountShowCase>
            : signIn 
              ? <LoginFormGraph setSignIn={setSignIn}></LoginFormGraph>
              : <SignUpFormGraph setSignIn={setSignIn}></SignUpFormGraph>
        }
      </div>
    </div>
  );
};

export default UserInfo;
