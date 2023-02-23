import React, { useState } from 'react';
// import { resetPassword } from '../actions/authActions';
import { csrfFetch } from '../../store/csrf.js';

const ResetPasswordForm = () => {
  const [email, setEmail] = useState('');

  const resetRequest = async(email) => {
    const response = await csrfFetch("/api/resetpassword/request-reset", {
        method: "POST",
        body: JSON.stringify({
          email }),
      });
      const data = await response.json();
      window.location.href = "/ResetPasswordConfirmation";
      return response;
    };

  const handleSubmit = (e) => {
    e.preventDefault();
    resetRequest(email)
  };

  return (
    <div className="flex justify-center">
     <div className="flex justify-center mt-20">
        <form onSubmit={handleSubmit} className="bg-slate-200 flex flex-col px-12 pt-12 h-60">
        <h4>Enter your email and we'll send you a link to reset your password</h4>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="flex justify-end pt-4">
            <button type='submit' className="bg-red-400 w-36 mt-3 h-8">Reset Password</button>
          </div>
        </form>
       </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
    </div>
  );
};

export default ResetPasswordForm;