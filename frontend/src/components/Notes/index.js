import React, { useEffect, useState } from 'react';
import * as sessionActions from '../../store/notes';
import { useDispatch, useSelector } from 'react-redux';
import CurrentNote from './currentNote';
import { Link, Route } from 'react-router-dom';
import ProfileButton from '../Navigation/ProfileButton';
import './CurrentNote.css'
import Create from './Create';

function Notes() {
    const currentUser = useSelector(state => state.session.user);
    const dispatch = useDispatch()
    // const [loaded, setLoaded] = useState();
    // const [notes, setNotes] = useState=([])
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [userId, setUserId] = useState(null);
    const [notebookId, setNotebookId] = useState(null);
    const [displayNote, setDisplayNote] = useState('')



    const userNotes = useSelector(state => state.notes.notes);

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



    useEffect(() => {
        dispatch(sessionActions.getNotesThunk(currentUser.id))

        //adding loaded is not chaning anything atm, fixed loading issue with '?'

    }, [dispatch])
    //rerender when deleting a note


    // if (loaded) {

        return (
        <>
        <ProfileButton user={currentUser}/>
        <div id='mynotes-container'>
        <div id='note-link-column'>
            <h1>My Notes</h1>

            <div id='note-container'>
            {userNotes?.map(note => (
                <div>
                    <Link id='note-link'  to={`/mynotes/notes/${note.id}`}>{note.title}</Link>
                </div>
            ))}
            </div>

        </div>

        <Route exact path='/mynotes/notes/:noteId'>
            <CurrentNote />
        </Route>
        {/* <Route exact path='/mynotes/notes/new'>
            <Create />
        </Route> */}


            <form id='create-form'>
                <div className='title-container'>
                    <h1>Create a new note</h1>

                <input  onChange={(e) => {
                setTitle(e.target.value);
            }}
            required
            id='createNote-title'
            type='text' value={title} placeholder='Title'/>
                </div>

            <input onChange={(e) => {
                setBody(e.target.value);
            }}
            className='displayNote'
            type='text' value={body} placeholder='Start writing...'/>
            <button onClick={(e) => {
                handleCreate(e)
            }}
            className='butts'
            >Create</button>
        </form>
        </div>
        </>
    )
}

export default Notes;
