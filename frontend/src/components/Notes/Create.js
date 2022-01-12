import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/notes';


function Create() {
    const currentUser = useSelector(state => state.session.user);
    const dispatch = useDispatch()

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    const handleCreate = (e) => {
        e.preventDefault();

        const payload = {
                title,
                body,
                userId: currentUser.id,
              }
         dispatch(sessionActions.createNoteThunk(payload))

        return
    }



    return (
        <>
        <h1>CREATE NOTE</h1>
                {/* <form>
            <input onChange={(e) => {
                setTitle(e.target.value);
            }}
            type='text' value={title} placeholder='Title'/>
            <input onChange={(e) => {
                setBody(e.target.value);
            }}
            type='text' value={body} placeholder='Note'/>
            <button onClick={(e) => {
                handleCreate(e)
            }}>Create</button>
        </form> */}
        </>
    )
}

export default Create;
