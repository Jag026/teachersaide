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
      return response;
    };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email)
    resetRequest(email)
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='email'>Email</label>
      <input
        type='email'
        id='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type='submit'>Reset Password</button>
    </form>
  );
};

export default ResetPasswordForm;