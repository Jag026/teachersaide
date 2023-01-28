import React from 'react';
import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-red-500 h-full mt-60">
      <div className="bg-red-500 h-5/6 py-8 flex">
        <p className="p-5">Copyright © {new Date().getFullYear()} Teachersaide.io</p>
        <NavLink exact to="/policies" className="p-5 ml-10">Site Policies</NavLink>
      </div>
    </footer>
  );
}

export default Footer;
