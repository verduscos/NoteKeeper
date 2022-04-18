import React from 'react';
import { NavLink } from 'react-router-dom';
import Burger from './Burger';
import LoginButton from './LoginButtons';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './Navigation.css';

function Navigation({ isLoaded }) {
  // The current width of the viewport
  const width = window.innerWidth;
  // The width below which the mobile view should be rendered
  const breakpoint = 850;

  const sessionUser = useSelector(state => state.session.user);

  if (sessionUser) return <Redirect to='/mynotes/notes' />;



  return (
    <nav id='nav'>
      <ul id='nav-inner-container'>
        <li id='bandaid'>
          <NavLink id='title' style={{ textDecoration: 'none' }} exact to="/">NoteKeeper</NavLink>
          <a className='focus-color social-links' href='https://github.com/verduscos' target="_blank" >GitHub</a>
          <a className='focus-color social-links' href='https://www.linkedin.com/in/eddie-verdusco/' target='_blank'>LinkedIn</a>
        </li>
        {
          width < breakpoint ?
            <Burger isLoaded={isLoaded} /> :
            <LoginButton isLoaded={isLoaded} />
        }
      </ul>
    </nav>
  );
}

export default Navigation;
