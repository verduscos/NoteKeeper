import React, { useEffect, useState } from 'react';
import * as sessionActions from '../../store/notes';
import { getSingleNoteThunk } from '../../store/currentNote';
import * as notebookActions from '../../store/notebooks';
import { useDispatch, useSelector } from 'react-redux';
import CurrentNote from './currentNote';
import { Link, Route } from 'react-router-dom';
import ProfileButton from '../Navigation/ProfileButton';
import './NoteList.css'
import Create from './Create';
import { MdStickyNote2 } from "react-icons/md"
import { useParams } from "react-router-dom";

function Notes() {
  const currentUser = useSelector(state => state.session.user);
  const params = useParams();
  const { noteId } = params;
  const dispatch = useDispatch()
  // const [loaded, setLoaded] = useState();
  // const [notes, setNotes] = useState=([])
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [userId, setUserId] = useState(null);
  const [notebookId, setNotebookId] = useState(null);
  const [displayNote, setDisplayNote] = useState('')
  const [errors, setErrors] = useState([]);
  const [created, setCreated] = useState(false);

  let notifcation;
  if (created) {
    notifcation = (
      <div className='notification'>
        <p>Note Created! </p> <i id='notification-check' className="fas fa-check-square"></i>
      </div>
    )
  } else {
    notifcation = (
      null
    )
  }


  const handleErrors = (e) => {
    e.preventDefault();

    const payload = {
      title,
      body,
      userId: currentUser.id,
      notebookId
    }
    setErrors([]);

    if (title.length >= 4 && body.length >= 1) setCreated(true)

    return dispatch(sessionActions.createNoteThunk(payload))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors)

      })
  }



  if (created) {
    setTimeout(() => {
      setCreated(false);
    }, 2000)
  }

  const userNotes = useSelector(state => state.notes);
  let notes = Object.values(userNotes)


  const handleCreate = (e) => {
    e.preventDefault();

    const payload = {
      title,
      body,
      userId: currentUser.id,
      notebookId
    }
    dispatch(sessionActions.createNoteThunk(payload))

    return
  }

  const getNote = (e, noteId) => {
    e.preventDefault();
    // dispatch(getSingleNoteThunk(currentUser.id, noteId))
    // dispatch(sessionActions.getSingleNoteThunk(currentUser.id, noteId));
  }




  useEffect(() => {
    // dispatch(sessionActions.getNotesThunk(currentUser.id))
    dispatch(notebookActions.getNootbooksThunk(currentUser.id))
    //adding loaded is not chaning anything atm, fixed loading issue with '?'

  }, [dispatch])
  //rerender when deleting a note


  // if (loaded) {

  return (
    <>
      {notes[0] !== null ?
        <div id='bg'>
          {notifcation}
          <div id='note-link-column'>
            <div id="notes-header-container">
              <MdStickyNote2 />
              <h1 id="notes-header">Notes</h1>
            </div>
            <p id="notes-length">{notes?.length} notes</p>

            <div id='note-container'>
              {notes?.map(note => (
                <Link
                  key={note?.id} id="note-containers" className={noteId == note?.id ? "note-highlight" : ""}
                  to={`/mynotes/notebook/${note?.notebookId}/notes/${note?.id}`}
                >
                  {/* <Link key={`${note?.id}-link`} id='note-links' to={`/mynotes/notebook/${note?.notebookId}/notes/${note?.id}`}>{note?.title}</Link> */}
                  <p id="note-title">{note?.title}</p>
                  <p id="note-date">{note?.createdAt.split('T')[0].split('-')[1]}/{note?.createdAt.split('T')[0].split('-')[2]}/{note?.createdAt.split('T')[0].split('-')[0]}</p>
                </Link>
              ))}

            </div>

            {/* <Route exact path='/mynotes/notes/:noteId'>
            <CurrentNote />
          </Route> */}
            {/* <Route exact path='/mynotes/notes/new'>
            <Create />
          </Route> */}


            {/* <form onSubmit={handleErrors} id='create-form'>
                <div className='title-container'>
                <h2>Create a new note</h2>

                <input  onChange={(e) => {
                  setTitle(e.target.value);
                }}
                required
                id='createNote-title'
                type='text' value={title} placeholder='Title'/>
                </div>

                <ul className='errors'>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>

                <textarea onChange={(e) => {
                  setBody(e.target.value);
                }}
                className='displayNote'
                type='texarea' value={body} placeholder='Start writing...'/>
                <button
                className='butts'
                >Create</button>
              </form> */}
            {/* <Link to='/mynotes/notes'>Create</Link> */}
          </div>
        </div>
        : null}
    </>
  )
}

export default Notes;
