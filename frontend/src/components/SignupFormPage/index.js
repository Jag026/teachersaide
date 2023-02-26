import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [recaptchaResponse, setRecaptchaResponse] = useState('');
  const [first_name, setFirst_Name] = useState("");
  const [last_name, setLast_Name] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ recaptchaResponse, first_name, last_name, email, username, password }))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  const handleRecaptcha = (value) => {
    setRecaptchaResponse(value);
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <img src={require("./apple.png")}  alt="apple image" className="w-25 h-[80px]" />
      <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Register an account</h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        Comes with free access to lesson plans and tests
      </p>  
    <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center sm:w-[450px] mt-8">
      <ul>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
        <input
          type="text"
          value={first_name}
          onChange={(e) => setFirst_Name(e.target.value)}
          required
          className="h-10 border border-grey-100 px-4 w-full"
          placeholder="First Name"
        />
        <input
          type="text"
          value={last_name}
          onChange={(e) => setLast_Name(e.target.value)}
          required
          className="h-10 border border-grey-100 px-4 w-full"
          placeholder="Last Name"
        />
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="h-10 border border-grey-100 px-4 w-full"
          placeholder="Email"
        />
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="h-10 border border-grey-100 px-4 w-full"
          placeholder="Username"
          />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="h-10 border border-grey-100 px-4 w-full"
          placeholder="Password"
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="h-10 border border-grey-100 px-4 w-full mb-4"
          placeholder="Confirm Password"
        />
      <ReCAPTCHA 
      onChange={handleRecaptcha}
      sitekey="6LcPFVAkAAAAAJHksr21rryn5tB46mu1Pkm7JB2p"
      />
        <label class="flex justify-between items-center mt-6 mb-6">
          <input type="checkbox" class="form-checkbox h-4 w-5 text-gray-600" required></input>
          <span class="text-gray-600 text-sm">I agree to <a href='/Policies' className="text-indigo-800">site policy</a></span>
        </label>      
        <button type="submit" className="group relative flex w-full justify-center rounded-md border border-transparent bg-slate-600 py-2 px-4 text-sm font-medium text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"><i class="fa-solid fa-lock color-gray-300 pt-1 mr-2"></i> Register</button>
    </form>
    </div>
  );
}

export default SignupFormPage;