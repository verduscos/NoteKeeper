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
  const [date, setDate] = useState("");
  const [updated, setUpdated] = useState(false);
  // const [deleted, setDeleted] = useState(false);
  const [value, setValue] = useState('');
  var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const lastSaved = new Date(date);
  const currentDate = new Date();

  let test;

  const testingTime = () => {

    if (Math.round(Math.abs(lastSaved - currentDate) / 36e5) > 24) {
      test = `Last updated on ${lastSaved.toDateString().split(" ")[0]}, ${lastSaved.toDateString().split(" ")[1]} ${lastSaved.toDateString().split(" ")[2]}, ${lastSaved.toDateString().split(" ")[3]}`;
    } else if (Math.round(Math.abs(lastSaved - currentDate) / 36e5) < 1) {
      test = (Math.abs(lastSaved - currentDate) / 36e5).toFixed(2).split(".")[1];
      if (test[0] === "0") test = ` Last updated ${test[1]} minutes ago`;
      else test = `Last updated ${test} minutes ago`
    } else {
      test = `Last updated ${Math.round(Math.abs(lastSaved - currentDate) / 36e5)} hours ago`;
    }

  }

  testingTime();

  const resetUpdate = () => {
    setInterval(() => {
      test = 0;
      test += 1;
    }, 600)
  }







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
    if (notebookId1 < 1) errors.push("Please select a notebook.");

    setErrors(errors);

    if (currtitle.length >= 4 && value.length >= 12 && notebookId1 > 0) {
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
    setTimeout(() => {
      if (currtitle.length >= 4 && value.length >= 12) handleEdit(e);
    }, 2000)
  }



  useEffect(() => {
    // dispatch(sessionActions.getNotesThunk(currentUser?.id))

    // const { title, body } = userNotes?.find(note =>
    //     note?.id === +noteId
    // )

    let title = userNotes1[noteId]?.title;
    let body = userNotes1[noteId]?.body;
    let notebookId = userNotes1[noteId]?.notebookId;
    let updatedAt = userNotes1[noteId]?.updatedAt;


    setcurrTitle(title)
    setValue(body)
    setNotebookId(notebookId)
    setDate(updatedAt)

  }, [dispatch, noteId, updated])

  useEffect(() => {
    let updatedAt = userNotes1[noteId]?.updatedAt;
    setDate(updatedAt)
  }, [dispatch, updated])


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

        <div id="date-container">
          <select
            onChange={(e) => {
              setNotebookId(e.target.value);
            }}
            required
            id="select-notebook">
            <option value="">Select Notebook</option>
            <option value="0">Default</option>
            {notebookArr.map(notebook => (
              <option key={notebook?.id} value={notebook?.id} selected={notebook?.id === notebookId1 ? true : false}>{notebook?.title}</option>
            ))}
          </select>


          <p id="note-date">{test}</p>
        </div>


        <ReactQuill theme="snow" value={value} onChange={setValue}
          onKeyUp={(e) => {
            autosave(e)
          }}
          className='displayNote' />
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
