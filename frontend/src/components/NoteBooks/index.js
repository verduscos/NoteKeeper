import React, { useEffect, useState } from 'react';
import * as notebookActions from '../../store/notebooks';
import { getNotebookNotesThunk } from '../../store/notes';
import { postNotebookThunk } from '../../store/notebooks';
import { useDispatch, useSelector } from 'react-redux';
import './Notebooks.css';

function Notebooks() {
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.session.user);
  const notebooksObj = useSelector(state => state.notebooks);
  let notebooks = Object.values(notebooksObj);
  const [notebookName, setNotebookName] = useState("");

  const getNotebookNotes = (e, notebookId) => {
    e.preventDefault();
    dispatch(getNotebookNotesThunk(currentUser.id, notebookId));
  }

  const createNotebook = (e) => {
    e.preventDefault();
    const payload = {
      user_id: currentUser.id,
      title: notebookName
    }
    console.log("INSIDE HANDLE CLICK")
    dispatch(postNotebookThunk(payload))
  }

  return (
    <div id='notebooks'>
      <h1>notebooks</h1>
      <div id='note-container'>
        {notebooks?.map(notebook => (
          <div
            onClick={(e) => {
              getNotebookNotes(e, notebook.id)
            }}
            id='notebook-links'>{notebook?.title}</div>
        ))}

      </div>

      <form onSubmit={(e) => {
        createNotebook(e)
      }}>
        <input value={notebookName} onChange={(e) => {
          e.preventDefault()
          setNotebookName(e.target.value)
        }} type="text" />
        <button>create</button>
      </form>
    </div>
  )

}

export default Notebooks;