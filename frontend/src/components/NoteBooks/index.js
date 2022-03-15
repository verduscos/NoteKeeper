import React, { useEffect, useState } from 'react';
import * as notebookActions from '../../store/notebooks';
import { getNotebookNotesThunk } from '../../store/notes';
import { postNotebookThunk, deleteNotebookThunk, updateNotebookThunk } from '../../store/notebooks';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import './Notebooks.css';

function Notebooks() {
  const params = useParams();
  const { notebookId } = params;
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.session.user);
  const notebooksObj = useSelector(state => state.notebooks);
  let notebooks = Object.values(notebooksObj);
  const [notebookName, setNotebookName] = useState("");
  const [errors, setErrors] = useState("");

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
    if (notebookName.length >= 4) {
      dispatch(postNotebookThunk(payload))
    } else {
      setErrors(["*Title must be at least 4 characters long."])
    }
  }

  const deleteNotebook = (e, id) => {
    e.preventDefault();
    const payload = {
      notebookId: id
    }

    dispatch(deleteNotebookThunk(payload))
  }

  const updateNotebook = (e, id) => {
    e.preventDefault();
    const payload = {
      notebookId: id,
      title: notebookName
    }

    dispatch(updateNotebookThunk(payload))
  }

  useEffect(() => {
    dispatch(getNotebookNotesThunk(currentUser.id, notebookId));
  }, [dispatch, notebookId])

  return (
    <div id='notebooks'>
      <h1>notebooks</h1>
      <div id='note-container'>
        {notebooks?.map(notebook => (
          <div id="notebook-container">
          <Link
            to={`/mynotes/notebook/${notebook?.id}`}
            // onClick={(e) => {
            //   getNotebookNotes(e, notebook.id)
            // }}
            id='notebook-links'>{notebook?.title}</Link>

            <span  onClick={(e) => {
              deleteNotebook(e, notebook.id)
            }} className="delete">X</span>

            <form onSubmit={(e) => {
              updateNotebook(e, notebook.id)
            }}>
              <input value={notebookName} onChange={(e) => {
          e.preventDefault()
          setNotebookName(e.target.value)
        }} type="text" />

            <button className="delete">O</button>
            </form>

            </div>
        ))}

      </div>

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
    </div>
  )

}

export default Notebooks;
