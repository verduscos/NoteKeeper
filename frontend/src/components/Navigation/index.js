import React from 'react';
import { NavLink, Redirect, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal'
import SignupFormModal from '../SignupFormModal';
import './Navigation.css';
import * as sessionActions from "../../store/session";



function Navigation({ isLoaded }){
  let history = useHistory();
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);

  const handleDemo = (e) => {
    e.preventDefault();
    history.push('/mynotes/notes');
    // <Redirect to="/mynotes/notes" />

    return dispatch(sessionActions.demo());
  }


  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        {/* <SignupFormModal /> */}
        {/* <NavLink id='signup' style={{ textDecoration: 'none' }} to="/signup">Sign Up</NavLink> */}
        <form onSubmit={handleDemo}>
          <button id='demo' type='submit'>Demo</button>
        </form>
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
