import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { useHistory } from 'react-router-dom';
import { IoIosArrowDown } from 'react-icons/io'
import { AiOutlinePlus } from 'react-icons/ai'
import { postNotebookThunk } from '../../store/notebooks';
import { MdOutlineCreateNewFolder } from 'react-icons/md'

function CreateNotebook({ user }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [notebookName, setNotebookName] = useState("");
  const [errors, setErrors] = useState("");

  // const openMenu = () => {
  //   if (showMenu) return;
  //   setShowMenu(true);
  // };

  // useEffect(() => {
  //   if (!showMenu) return;

  //   const closeMenu = () => {
  //     setShowMenu(false);
  //   };

  //   document.addEventListener('click', closeMenu);

  //   return () => document.removeEventListener("click", closeMenu);
  // }, [showMenu]);

  const createNotebook = (e) => {
    e.preventDefault();
    const payload = {
      user_id: user.id,
      title: notebookName
    }
    if (notebookName.length >= 4) {
      dispatch(postNotebookThunk(payload));
      setErrors("");
      setShowCreateForm(!showCreateForm);
      setNotebookName("");
    } else {
      setErrors(["*Title must be at least 4 characters."])
    }
  }

  return (
    <>
      <button id='create-notebook-btn'
        onClick={(e) => {
          e.preventDefault();
          setShowCreateForm(!showCreateForm);
        }}>
        <div id="notebook-text-container">
          <AiOutlinePlus />
          <p>New Notebook</p>
        </div>
        <IoIosArrowDown id="user-btn-arrow-create" />
      </button>
      {showCreateForm ? (
        <>
          {errors ? <p className="error-mssg">{errors}</p> : null}
          <form onSubmit={(e) => {
            createNotebook(e)
          }}
            id="create-notebook-form"
          >
            <input id="create-notebook-input" value={notebookName} onChange={(e) => {
              e.preventDefault()
              setNotebookName(e.target.value)
            }} type="text" placeholder="Add notebook title..." />

            <button id="create-notebook-submit" ><MdOutlineCreateNewFolder /></button>

          </form>
        </>
      ) : null}
    </>
  );
}

export default CreateNotebook;
