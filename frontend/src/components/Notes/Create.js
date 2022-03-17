import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from "react-router-dom"
import * as sessionActions from '../../store/notes';
import './Create.css'


function Create() {
  const params = useParams();
  const { notebookId } = params;
  const currentUser = useSelector(state => state.session.user);
  const history = useHistory()
  const dispatch = useDispatch()
  const [notebookId1, setNotebookId] = useState(null);
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

  const handleErrors = (e) => {
    e.preventDefault();

    const payload = {
      title,
      body: value,
      userId: currentUser.id,
      notebookId: notebookId
    }
    setErrors([]);

    if (title.length >= 4 && value.length >= 1) setCreated(true)

    return dispatch(sessionActions.createNoteThunk(payload))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors)
      })
  }

  if (created) {
    setTimeout(() => {
      setCreated(false);
      history.push(`/mynotes/notebook/${notebookId}`)
    }, 2000)
  }



  return (
    <>
      {notifcation}

      <form onSubmit={handleErrors} className='form'>
        <div className='title-container'>

          <ul className='errors'>
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
          </ul>

          <input onChange={(e) => {
            setTitle(e.target.value);
          }}
            required
            className='form-title edit'
            type='text' value={title} placeholder='Add a title...' />
        </div>


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
