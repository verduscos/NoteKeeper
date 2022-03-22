import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import { useSelector, useDispatch } from 'react-redux';
import * as sessionActions from '../../store/notes';
import { useParams, useHistory, Link } from 'react-router-dom';
import './CurrentNote.css';



function CurrentNote() {
  const history = useHistory();
  const params = useParams();
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.session.user);
  const userNotes1 = useSelector(state => state.notes)
  const notebooks = useSelector(state => state.notebooks);
  let notebookArr = Object.values(notebooks);
  let userNotes = Object.values(userNotes1)
  const { noteId } = params;
  const [currtitle, setcurrTitle] = useState('');
  const [currentNote, setCurrentNote] = useState('');
  const [notebookId1, setNotebookId] = useState("");
  const [errors, setErrors] = useState([]);
  const [updated, setUpdated] = useState(false);
  // const [deleted, setDeleted] = useState(false);
  const [value, setValue] = useState('');

  let notifcation;
  if (updated) {
    notifcation = (
      <div className='notification'>
        <p>Note Updated! </p> <i id='notification-check' className="fas fa-check-square"></i>
      </div>
    )
  } else {
    notifcation = (
      null
    )
  }

  // let deletion;
  // if (deleted) {
  //     deletion = (
  //         <div className='notification'>
  //             <p>Note Deleted! </p> <i id='notification-check' class="fas fa-check-square"></i>
  //         </div>
  //     )
  // } else {
  //     deletion = (
  //         null
  //     )
  // }

  if (updated) {
    setTimeout(() => {
      setUpdated(false);
      // history.push('/mynotes/notes')
    }, 2000)
  }


  // EDIT
  const handleEdit = async (e) => {
    e.preventDefault();

    const payload = {
      id: noteId,
      title: currtitle,
      body: value,
      userId: currentUser.id,
      notebookId: notebookId1
    }

    setErrors([]);

    let errors = [];

    if (currtitle.length <= 3) errors.push("Title must be at least 4 characters.");
    if (value.length <= 12) errors.push("Note must be at least 4 charcters.");
    if (!notebookId1.length) errors.push("Please select a notebook.");
    setErrors(errors);

    if (currtitle.length >= 4 && value.length >= 12 && notebookId1.length) {
      setUpdated(true)
      let note = await dispatch(sessionActions.editNoteThunk(payload, noteId))

      if (note.notebookId) {
        history.push(`/mynotes/notebook/${note.notebookId}/notes/${note.id}`);
      } else {
        history.push(`/mynotes/notebook/default/notes/${note.id}`);
      }
    }


      // .catch(async (res) => {
      //   const data = await res.json();
      //   if (data && data.errors) setErrors(data.errors);
      // })
  }

  // DELETE
  const handleDelete = async (e, id) => {
    e.preventDefault();
    // setDeleted(true);

    const res = await dispatch(sessionActions.removeNoteThunk(id))
  }


  const autosave = (e) => {
    console.log('HERERERE')
    if (currtitle.length >= 4 && value.length >= 12) handleEdit(e);
  }



useEffect(() => {
  // dispatch(sessionActions.getNotesThunk(currentUser?.id))

  // const { title, body } = userNotes?.find(note =>
  //     note?.id === +noteId
  // )

  let title = userNotes1[noteId]?.title;
  let body = userNotes1[noteId]?.body;
  // const { title, body } = userNotes1[noteId];

  setcurrTitle(title)
  setValue(body)
}, [dispatch, noteId])



return (
  <div>
    <form className='form' onSubmit={handleEdit}>
      <div className='title-container'>
        <Link id='create-link' to='/mynotes/notes'>New note</Link>

        {/* <h1>{currtitle}</h1> */}
        {/* {deletion} */}
        {notifcation}
        <ul className='errors'>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <input
        // onBlur={(e) => handleEdit(e)}
          className='form-title edit'
          value={currtitle}
          onChange={(e) => {
            setcurrTitle(e.target.value)
          }}

          type="text"></input>

      </div>


      <select
          onChange={(e) => {
            setNotebookId(e.target.value);
          }}
          required
          id="select-notebook">
          <option value="">Select Notebook</option>
          <option value="0" >Default</option>
          {notebookArr.map(notebook => (
            <option key={notebook?.id} value={notebook?.id}>{notebook?.title}</option>
          ))}
        </select>


      <ReactQuill theme="snow" value={value} onChange={setValue} className='displayNote' />
      {/* <textarea
                    // className='butts'
                    className='displayNote'
                    onChange={(e) => {
                        setCurrentNote(e.target.value)
                    }}
                    required
                    value={currentNote}
                    type="textarea"
                    cols='60' rows='8'
                ></textarea> */}

      <button
        onClick={(e) => {
          handleEdit(e)
        }}
        className='create-delete create'
      >Update</button>




      <button
        id='delete'
        className='create-delete'
        onClick={(e) => {
          handleDelete(e, noteId)
        }}>Delete</button>
    </form>
  </div>
)
}

export default CurrentNote;
