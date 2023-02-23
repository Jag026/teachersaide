import React from 'react';
import { Link } from 'react-router-dom'; // assuming you're using react-router for routing

function PasswordUpdated() {
  return (
    <div>
      <h2>Password updated</h2>
      <p>Your password has been updated successfully.</p>
      <p>Click <Link to="/login">here</Link> to log in with your new password.</p>
    </div>
  );
}

export default PasswordUpdated;