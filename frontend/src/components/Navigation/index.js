import React, { useState } from 'react';
import { NavLink, Redirect, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal'
import SignupFormModal from '../SignupFormModal';
import './Navigation.css';
import * as sessionActions from "../../store/session";



function Navigation({ isLoaded }) {
  const [loginBtn, setLoginBtn] = useState(false);
  let history = useHistory();
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);

  // The current width of the viewport
  const width = window.innerWidth;
  // The width below which the mobile view should be rendered
  const breakpoint = 850;

  if (sessionUser) return <Redirect to='/mynotes/notes' />;


  const handleDemo = (e) => {
    e.preventDefault();
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
          <a className='focus-color social-links' href='https://github.com/verduscos' target="_blank" >GitHub</a>
          <a className='focus-color social-links' href='https://www.linkedin.com/in/eddie-verdusco/' target='_blank'>LinkedIn</a>
        </li>


        {/* {loginBtn
          ?
          <li id="login-btn-container">
            {isLoaded && sessionLinks}
          </li> : null}

        <div id="burger" onClick={() => {
          setLoginBtn(!loginBtn)
        }}>X</div> */}

{/* <li id="login-btn-container">
          {isLoaded && sessionLinks}
        </li> */}

        {width < breakpoint ? <li id="login-btn-container">
          {isLoaded && sessionLinks}
        </li> : <div id="burger" onClick={() => {
          setLoginBtn(!loginBtn)
        }}>X</div>}



      </ul>
    </nav>
  );
}

export default Navigation;
