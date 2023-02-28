import React, { useState } from 'react';
import { csrfFetch } from '../../store/csrf.js';
import { useLocation } from 'react-router-dom';

const ResetPasswordPage = (props) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const location = useLocation();
  const token = decodeURIComponent(location.pathname.slice('/resetpasswordpage/'.length));

  const updatePassword = async(token, password) => {
    console.log(token)
    const response = await csrfFetch("/api/resetpassword/reset-password", {
        method: "POST",
        body: JSON.stringify({
          token,
          password,
         }),
      });
      const data = await response.json();
      window.location.href = "/PasswordUpdated";
      return response;
    };

  const handleSubmit = (e) => {
    e.preventDefault();
    updatePassword(token, password);
};

return (
  <div className="flex flex-col justify-center items-center h-screen">
    <img src={require("./apple.png")}  alt="apple image" className="w-25 h-[80px]" />
    <h2 className="mt-6 text-center text-xl font-bold tracking-tight text-gray-900">Enter a new password</h2>
       <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center sm:w-[450px] mt-8">
       <label>New Password</label>
           <input
               type='password'
               id='password'
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               className="h-10 border border-grey-100 px-4 w-full"
           />
           <label>Confirm Password</label>
           <input
               type='password'
               id='confirmPassword'
               value={confirmPassword}
               onChange={(e) => setConfirmPassword(e.target.value)}
               className="h-10 border border-grey-100 px-4 w-full"
           />
            <button type='submit' className="group relative flex w-full justify-center rounded-md border border-transparent bg-slate-600 py-2 px-4 text-sm font-medium text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 mt-1"><i class="fa-solid fa-lock color-gray-300 pt-1 mr-2"></i>Update Password</button>
       </form>
     </div>
       );
};

export default ResetPasswordPage;