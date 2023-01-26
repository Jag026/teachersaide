import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div className='flex justify-between pt-4 p-3 h-14 bg-red-500'>
        <div className='flex sm:ml-16 justify-start'>
          <NavLink exact to="/test">Test/Quizzes</NavLink>
          <NavLink className="ml-4" exact to="/">Lesson Plans</NavLink>
        </div>
        <div className='flex mr-3 sm:mr-12 justify-end'>
          <button className="mr-6 hover:text-slate-100" onClick={logout}>Logout</button>
          <i className="cursor-pointer text-2xl fa-solid fa-user hover:text-slate-100"></i>
        </div>
      </div>
    );
  } else {
    sessionLinks = (
      <div className='flex justify-between pt-4 p-3 h-14 bg-red-500'>
        <div className='flex sm:ml-16 justify-start'>
          <NavLink exact to="/test" className="hover:text-slate-100">Test/Quizzes</NavLink>
          <NavLink className="ml-4 hover:text-slate-100" exact to="/">Lesson Plans</NavLink>
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