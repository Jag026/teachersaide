import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div className='flex justify-between p-3 h-14 bg-red-500'>
        <div className='flex ml-8 justify-start'>
          <NavLink exact to="test">Test/Quizzes</NavLink>
        </div>
        <div className='flex mr-6 justify-end'>
          <i className="fa-solid fa-user"></i>
        </div>
      </div>
    );
  } else {
    sessionLinks = (
      <div className='flex justify-between p-3 h-14 bg-red-500'>
        <div className='flex ml-8 justify-start'>
          <NavLink exact to="/login" className="mr-4">Log In</NavLink>
          <NavLink exact to="/signup">Sign Up</NavLink>
        </div>
        <div className='flex mr-6 justify-end'>
          <i className="fa-solid fa-user"></i>
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