import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { useHistory } from 'react-router-dom';
import { IoIosArrowDown } from 'react-icons/io'
import { AiOutlinePlus } from 'react-icons/ai'
import { postNotebookThunk } from '../../store/notebooks';

function CreateNotebook({ user }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const [notebookName, setNotebookName] = useState("");
  const [errors, setErrors] = useState("");

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

  const createNotebook = (e) => {
    e.preventDefault();
    const payload = {
      user_id: user.id,
      title: notebookName
    }
    if (notebookName.length >= 4) {
      dispatch(postNotebookThunk(payload))
    } else {
      setErrors(["*Title must be at least 4 characters long."])
    }
  }

  return (
    <>
      <button id='create-notebook-btn' onClick={openMenu}>
        <div id="notebook-text-container">
          <AiOutlinePlus />
          <p>New Notebook</p>
        </div>
        <IoIosArrowDown id="user-btn-arrow-create" />
      </button>
      {showMenu && (
        <>
          <p className="error-mssg">{errors[0]}</p>
          <form onSubmit={(e) => {
            createNotebook(e)
          }}>
            <input value={notebookName} onChange={(e) => {
              e.preventDefault()
              setNotebookName(e.target.value)
            }} type="text" />
            <button>create</button>

          </form>
        </>
      )}
    </>
  );
}

export default CreateNotebook;
