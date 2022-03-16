import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { useHistory } from 'react-router-dom';
import { IoIosArrowDown } from 'react-icons/io';
import { AiOutlineCheck } from 'react-icons/ai';

function ProfileButton({ user }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push('/');
  };

  return (
    <>
      <button id='user-icon' onClick={openMenu}>
        <i className="far fa-user-circle"></i>
        <p id="user-btn-username">{user.username}</p>
        <IoIosArrowDown id="user-btn-arrow" />
      </button>
      {showMenu && (
        <ul className="profile-dropdown">
          <p>ACCOUNT</p>
          <div id="user-modal-text">
            <AiOutlineCheck id="user-modal-check"  />
            <div>
              <li>{user.username}</li>
              <li>{user.email}</li>
            </div>
          </div>
          <li id="logout-container">
            <button id='logout' onClick={logout}>Sign out {user.username}</button>
          </li>
        </ul>
      )}
    </>
  );
}

export default ProfileButton;
