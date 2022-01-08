import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal'
import SignupFormModal from '../SignupFormModal';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <SignupFormModal />
        {/* <NavLink id='signup' style={{ textDecoration: 'none' }} to="/signup">Sign Up</NavLink> */}
      </>
    );
  }

  return (
    <nav id='nav'>
      <ul id='nav-inner-container'>
        <li id='bandaid'>
          <NavLink id='title' style={{ textDecoration: 'none' }} exact to="/">NoteKeeper</NavLink>
          <a className='focus-color'  href='https://github.com/verduscos' target="_blank" >GitHub</a>
          <a className='focus-color' href='https://www.linkedin.com/in/eddie-verdusco/' target='_blank'>LinkedIn</a>
        </li>
        <li>
          {isLoaded && sessionLinks}
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
