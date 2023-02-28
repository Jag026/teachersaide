import React, { useState } from 'react';
// import { resetPassword } from '../actions/authActions';
import { csrfFetch } from '../../store/csrf.js';

const ResetPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [sentMessage, setSentMessage] = useState('');

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
    resetRequest(email)
    setSentMessage(true);
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
    <img src={require("./apple.png")}  alt="apple image" className="w-25 h-[80px]" />
    <h2 className="mt-6 text-center text-xl font-bold tracking-tight text-gray-900">Enter your email and we'll send you a link to reset your password</h2>
        <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center sm:w-[450px] mt-8">
          <input
            type='email'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-10 border border-grey-100 px-4 w-full"
            placeholder="Email"
          />
            <button type='submit' className="group relative flex w-full justify-center rounded-md border border-transparent bg-slate-600 py-2 px-4 text-sm font-medium text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 mt-1"><i class="fa-solid fa-lock color-gray-300 pt-1 mr-2"></i>Reset Password</button>
        </form>
        {sentMessage && <p className='mt-2'>Check your email, we sent you an email with a link to reset your password. You can <a href="/login" className="text-violet-800">login with this link.</a></p>}
    </div>
  );
};

export default ResetPasswordForm;