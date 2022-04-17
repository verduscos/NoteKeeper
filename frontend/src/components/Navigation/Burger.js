import React, { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi'
import LoginButton from './LoginButtons';

function Burger( {isLoaded }) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      {showMenu ? <LoginButton isLoaded={isLoaded} /> : null}

      <GiHamburgerMenu onClick={() => {
        setShowMenu(!showMenu)
      }} size={25} />

    </>
  )
}

export default Burger;
