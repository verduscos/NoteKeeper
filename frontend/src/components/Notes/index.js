import React, { useEffect, useState } from 'react';
import * as sessionActions from '../../store/notes';
import { useDispatch, useSelector } from 'react-redux';


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

    // CREATE
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


    // DELETE
    const handleDelete = async (e, noteId) => {
        e.preventDefault();

        dispatch(sessionActions.removeNoteThunk(noteId))
        return
    }

    // EDIT
    const handleEdit = async (e, noteId) => {
        e.preventDefault();
        console.log('INSIDE HANDLE')
        const payload = {
            id: noteId,
            body: 'TESTING EDIT'
        }
        console.log(payload)
        dispatch(sessionActions.editNoteThunk(payload, noteId))
        return
    }

    //GET A NOTE
    // const handleSingleNote = (e, noteId) => {
    //     e.preventDefault();
    //     dispatch(sessionActions.getSingleNoteThunk(currentUser.id, noteId))
    // }



    useEffect(() => {
        dispatch(sessionActions.getNotesThunk(currentUser.id))

        //adding loaded is not chaning anything atm, fixed loading issue with '?'

    }, [dispatch])
    //rerender when deleting a note


    // if (loaded) {

        return (
        <>
        <h1>Notes</h1>
        {userNotes?.map(note => (
            <>
            <div onClick={(e) => {
                setDisplayNote(note.body)
            }}
            value={note.id}>TITLE: {note.title}</div>
            <button onClick={(e) => (
                handleDelete(e, note.id)
            )}>Delete</button>
                        <button onClick={(e) => (
                handleEdit(e, note.id)
            )}>Edit</button>
            </>
        ))}
        <h2>Current note:</h2>
        <p>{displayNote}</p>
        <h2>Create note:</h2>
        <form>
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
        </form>
        </>
    )
// }
}

export default Notes;
