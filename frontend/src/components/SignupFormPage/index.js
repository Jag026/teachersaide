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
    <div className="m-10 flex flex-col">
    <div className="m-10">
      <h2 className="text-2xl">Create An Account To Generate Lesson Plans</h2>
      <p className="text-xl p-1">It's Free!</p>
    </div>
    <form onSubmit={handleSubmit} className="m-10 bg-white p-6 rounded-lg shadow-md flex flex-col sm:w-2/4 sm:max-w-[600px]">
      <ul>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <label className="p-2 mb-4">
        First Name
        <input
          type="text"
          value={first_name}
          onChange={(e) => setFirst_Name(e.target.value)}
          required
          className="ml-2 border border-sky-500"
        />
      </label>
      <label className="p-2 mb-4">
        Last Name
        <input
          type="text"
          value={last_name}
          onChange={(e) => setLast_Name(e.target.value)}
          required
          className="ml-2 border border-sky-500"
        />
      </label>
      <label className="p-2 mb-4">
        Email
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="ml-2 border border-sky-500"
        />
      </label>
      <label className="p-2 mb-4">
        Username
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="ml-2 border border-sky-500"
        />
      </label>
      <label className="p-2 mb-4">
        Password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="ml-2 border border-sky-500"
        />
      </label>
      <label className="p-2 mb-4">
        Confirm Password
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="ml-2 border border-sky-500"
        />
      </label>
      <ReCAPTCHA 
      onChange={handleRecaptcha}
      sitekey="6LfhIVAkAAAAACL7tM7-2BquUz7JQhBGpRPJ_3vT"
      />
      <button type="submit" className="w-20 mt-3 p-1 border border-sky-500">Sign Up</button>
    </form>
    </div>
  );
}

export default SignupFormPage;