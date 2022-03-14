import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom"
import * as sessionActions from '../../store/notes';
import './Create.css'


function Create() {
    const currentUser = useSelector(state => state.session.user);
    const history = useHistory()
    const dispatch = useDispatch()
    const [notebookId, setNotebookId] = useState(null);
    const [errors, setErrors] = useState([]);
    const [created, setCreated] = useState(false);


    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    let notifcation;
    if (created) {
        notifcation = (
            <div className='notification'>
                <p>Note Created! </p> <i id='notification-check' class="fas fa-check-square"></i>
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


    useEffect(() => {
        dispatch(sessionActions.getNotesThunk(currentUser.id))

    }, [dispatch])


    return (
        <>
        {notifcation}

        <form onSubmit={handleErrors} className='form'>
                <div className='title-container'>
                    {/* <h2>Create a new note</h2> */}

                    <ul className='errors'>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>

                <input  onChange={(e) => {
                setTitle(e.target.value);
            }}
            required
            className='form-title edit'
            type='text' value={title} placeholder='Title'/>
                </div>



            <textarea onChange={(e) => {
                setBody(e.target.value);
            }}
            className='displayNote'
            type='texarea' value={body} placeholder='Start writing...'/>
            <button

            className='create-delete create'
            >Create</button>
        </form>
        </>
    )
}

export default Create;
