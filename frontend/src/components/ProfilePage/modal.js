import React, { useState } from 'react';

const Modal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button onClick={handleOpen}>Open modal</button>
      {isOpen && (
        <div>
          <div>
            <h1>Modal Title</h1>
            <p>Modal content goes here</p>
            <button onClick={handleClose}>Close</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;