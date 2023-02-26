import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  if (sessionUser) return (
    <Redirect to="/" />
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <img src={require("./apple.png")}  alt="apple image" className="w-25 h-[80px]" />
      <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Sign in to your account</h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        Or
        <a href="/signup" class="font-medium text-indigo-600 hover:text-indigo-500"> create a free account</a>
      </p>      
      <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center w-[450px] mt-8">
        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <label className="w-full">
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
            className="w-[100%] h-10 border border-grey-100 px-4"
            placeholder="Username or Email"
          />
        </label>
        <label className="w-full">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-[100%] h-10 border border-grey-100 px-4"
            placeholder="Password"
          />
        </label>
        <label class="flex justify-between items-center mt-6 mb-6">
          <input type="checkbox" class="form-checkbox h-4 w-5 text-gray-600"></input>
          <span class="text-gray-600 text-sm">Remember me</span>
          <a class="ml-8 text-indigo-600 text-sm" href="/resetpassword">Forgot your password?</a>
        </label>
        <button type="submit" className="group relative flex w-full justify-center rounded-md border border-transparent bg-slate-600 py-2 px-4 text-sm font-medium text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"><i class="fa-solid fa-lock color-gray-300 pt-1 mr-2"></i> Log In</button>
      </form>
    </div>
  );
}

export default LoginFormPage;