
import { useState, useLayoutEffect, } from 'react';
import { useNavigate } from 'react-router-dom';
//import { authService } from '../api/authentication';
import SignUpFormGraph from '../components/SignUpFormGraph';
import LoginFormGraph from '../components/LoginFormGraph';
import AccountShowCase from '../components/AccountShowCase';
import Auth from '../utils_graphQL/auth'; 


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

  

  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fef3d0]">
      {/* Navbar */}
      <nav className="bg-[#f5d3a4] shadow-md fixed top-0 w-full flex justify-between items-center px-4 py-2">
      {/* Forktacular button on the left */}
      <button
        onClick={() => navigate('/')}
        className="text-[#a84e24] hover:text-[#b7572e] font-semibold"
      >
        Forktacular
      </button>

      {/* Title centered */}
      <div className="text-2xl font-bold text-[#a84e24] flex-1 text-center">
        Welcome
      </div>

      {/* Account button on the right */}
      <div className="flex">
        <button
          onClick={() => navigate('/user-info')}
          className="text-[#a84e24] hover:text-[#b7572e]"
        >
          Account
        </button>
      </div>
    </nav>
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        {
          loginCheck 
            ? (<h2 className="text-2xl font-bold mb-6 text-center text-[#a84e24]">
              { signIn ? 'Sign In' : 'Sign Up'}
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
