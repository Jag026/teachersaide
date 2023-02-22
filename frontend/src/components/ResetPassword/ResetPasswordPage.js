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
      return response;
    };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(token)
    updatePassword(token, password);
};

return (
    <form onSubmit={handleSubmit}>
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
        <button type='submit'>Update Password</button>
    </form>
    );
};

export default ResetPasswordPage;