import React, { useState, useRef, useEffect } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);


  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  }

  const toggleDropdownClose = () => {
    setIsOpen(false);
  }

  const profileRedirect = (e) => {
    e.preventDefault();
    return <Redirect to="profile" />
  };


  let sessionLinks;

  if (sessionUser) {
    sessionLinks = (
      <div className='flex justify-between pt-4 p-3 h-14 bg-red-500 shadow-lg'>
        <div className='flex sm:ml-12 justify-start items-center text-center text-3xl tracking-tight text-gray-900' ref={dropdownRef}>
          <button onClick={toggleDropdown} className="text-black">
            <i class="fa-solid fa-bars text-3xl"></i>          
          </button>
          {isOpen && (
            <div className="absolute z-50 top-16 w-[200px] text-xl sm:left-16 bg-white py-2 rounded shadow-md">
              <NavLink exact to="/test" className="block px-4 py-2 hover:bg-red-400" onClick={toggleDropdownClose}>Test/Quizzes</NavLink>
              <NavLink exact to="/" className="block px-4 py-2 hover:bg-red-400" onClick={toggleDropdownClose}>Lesson Plans</NavLink>
              <NavLink exact to="/worksheet" className="block px-4 py-2 hover:bg-red-400" onClick={toggleDropdownClose}>Worksheets</NavLink>
            </div>
          )}
        </div>
        <div className='flex mr-3 sm:mr-12 justify-end'>
          <button className="mr-6 hover:text-slate-100" onClick={logout}>Logout</button>
          <NavLink className="ml-4" exact to="/profile">{<i className="cursor-pointer text-2xl fa-solid fa-user hover:text-slate-100"></i>}</NavLink>
        </div>
      </div>
    );
  } else {
    sessionLinks = (
      <div className='flex justify-between pt-4 p-3 h-14 bg-red-500'>
        <div className='flex sm:ml-12 justify-start items-center text-center text-3xl tracking-tight text-gray-900' ref={dropdownRef}>
          <button onClick={toggleDropdown} className="text-black">
            <i className="fa-solid fa-bars text-3xl"></i>
          </button>
          {isOpen && (
            <div className="absolute z-50 top-16 w-[200px] text-xl sm:left-16 bg-white py-2 rounded shadow-md">
            <NavLink exact to="/test" className="block px-4 py-2 hover:bg-red-400" onClick={toggleDropdownClose}>Test/Quizzes</NavLink>
              <NavLink exact to="/" className="block px-4 py-2 hover:bg-red-400" onClick={toggleDropdownClose}>Lesson Plans</NavLink>
              <NavLink exact to="/worksheet" className="block px-4 py-2 hover:bg-red-400" onClick={toggleDropdownClose}>Worksheets</NavLink>
            </div>
          )}
        </div>
        <div className='flex mr-6 justify-end'>
          <NavLink exact to="/login" className="mr-4 hover:text-slate-100">Log In</NavLink>
          <NavLink exact to="/signup" className="hover:text-slate-100">Sign Up</NavLink>
        </div>
      </div>
    );
  }

  return (
    <ul>
      <li>
        {isLoaded && sessionLinks}
      </li>
    </ul>
  );
}


export default Navigation;