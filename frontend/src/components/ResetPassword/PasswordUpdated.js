import React from 'react';
import { Link } from 'react-router-dom'; // assuming you're using react-router for routing

function PasswordUpdated() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
    <img src={require("./apple.png")}  alt="apple image" className="w-25 h-[80px]" />
    <h2 className="mt-6 text-center text-xl font-bold tracking-tight text-gray-900">Password updated</h2>
      <a href="/login" className="text-violet-800">Click here to log in with your new password.</a>
    </div>
  );
}

export default PasswordUpdated;