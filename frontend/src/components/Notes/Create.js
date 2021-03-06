import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from "react-router-dom"
import * as sessionActions from '../../store/notes';
import './Create.css'


function Create() {
  const params = useParams();
  const { notebookId } = params;
  const currentUser = useSelector(state => state.session.user);
  const notebooks = useSelector(state => state.notebooks);
  let notebookArr = Object.values(notebooks);

  const history = useHistory()
  const dispatch = useDispatch()
  const [notebookId1, setNotebookId] = useState("");
  const [errors, setErrors] = useState([]);
  const [created, setCreated] = useState(false);
  const [value, setValue] = useState("")
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

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

  const reactQuillRef = React.useRef();
  const unprivilegedEditor = reactQuillRef;
  console.log(ReactQuill.innerText)

  const handleErrors = async (e) => {
    e.preventDefault();

    const payload = {
      title,
      body: value,
      userId: currentUser.id,
      notebookId: notebookId1
    }

    setErrors([]);
    let errors = [];

    if (title.length <= 3) errors.push("Title must be at least 4 characters.");
    if (value.length <= 12) errors.push("Note must be at least 4 charcters.");
    if (notebookId1 === "") errors.push("Please select a notebook.");
    setErrors(errors);


    if (title.length >= 4 && value.length >= 4) setCreated(true)

    let note = await dispatch(sessionActions.createNoteThunk(payload))

    // .catch(async (res) => {
    //   const data = await res.json();
    // console.log(note)
    // console.log("NOTE ABOVE")
    // if (data && data.errors) setErrors(data.errors)
    // })


    if (note.notebookId) {
      history.push(`/mynotes/notebook/${note.notebookId}/notes/${note.id}`);
    } else {
      history.push(`/mynotes/notebook/default/notes/${note.id}`);
    }


  }


  if (created) {
    setTimeout(() => {
      setCreated(false);
      // history.push(`/mynotes/notebook/${notebookId}`)
    }, 2000)
  }

  // const autosave = (e) => {
  //   if (title.length >= 4 && value.length >= 4)
  //     handleErrors(e);
  // }


  return (
    <>
      {notifcation}

      <form onSubmit={handleErrors} className='form'>
        <div className='title-container'>

          <ul className='errors'>
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
          </ul>

          <input
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            required
            className='form-title edit'
            type='text' value={title} placeholder='Add a title...' />
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


        <ReactQuill placeholder="Start writing..." theme="snow" value={value} onChange={setValue} className='displayNote' />

        {/* <textarea onChange={(e) => {
                setBody(e.target.value);
            }}
            className='displayNote'
            type='texarea' value={body} placeholder='Start writing...'/> */}
        <button

          className='create-delete create'
        >Create</button>
      </form>
    </>
  )
}

export default Create;
