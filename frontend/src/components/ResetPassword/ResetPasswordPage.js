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
    <div className="flex justify-center">
     <div className="flex justify-center mt-20">
       <form onSubmit={handleSubmit} className="bg-slate-200 flex flex-col px-12 pt-12 h-60">
           <label htmlFor='password'>New Password</label>
           <input
               type='password'
               id='password'
               value={password}
               onChange={(e) => setPassword(e.target.value)}
           />
           <label htmlFor='confirmPassword'>Confirm Password</label>
           <input
               type='password'
               id='confirmPassword'
               value={confirmPassword}
               onChange={(e) => setConfirmPassword(e.target.value)}
           />
          <div className="flex justify-end pt-4">
            <button type='submit' className="bg-red-400 w-36 mt-3 h-8">Update Password</button>
           </div>
       </form>
      </div>
     </div>
       );
};

export default ResetPasswordPage;