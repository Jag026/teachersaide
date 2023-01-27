import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-red-500 h-full mt-60">
      <div className="bg-red-500 h-5/6 py-8">
        <p className="p-5">Copyright © {new Date().getFullYear()} Teachersaide.io</p>
      </div>
    </footer>
  );
}

export default Footer;
