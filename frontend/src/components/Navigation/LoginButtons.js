import React from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal'
import * as sessionActions from "../../store/session";


function LoginButton( {isLoaded }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);

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
    <>
      { isLoaded && sessionLinks }
    </>
  )
}

export default LoginButton
