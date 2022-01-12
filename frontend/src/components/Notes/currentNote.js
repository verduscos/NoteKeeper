import React, {  useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as sessionActions from '../../store/notes';
import { useParams, Redirect } from 'react-router-dom';
import './CurrentNote.css';



function CurrentNote() {
    const params = useParams();
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user);
    const userNotes = useSelector(state => state.notes.notes)

    const  { noteId } = params;



    const [currtitle, setcurrTitle] = useState('');
    const [currentNote, setCurrentNote] = useState('');



        // EDIT
        const handleEdit = async (e) => {
            e.preventDefault();
            console.log('INSIDE HANDLE')
            const payload = {
                id: noteId,
                body: currentNote,
                userId: currentUser.id
            }
            console.log(payload)
            dispatch(sessionActions.editNoteThunk(payload, noteId));
            // <Redirect to='/mynotes/notes' />;
            window.alert('Your note has been saved!')
            return
        }

    // DELETE
    const handleDelete = async (e, id) => {
        e.preventDefault();

        dispatch(sessionActions.removeNoteThunk(id))
        dispatch(sessionActions.getNotesThunk(currentUser?.id))
        return
    }

    useEffect(() => {
        dispatch(sessionActions.getNotesThunk(currentUser?.id))
        // dispatch(sessionActions.removeNoteThunk(noteId))

        const  { title, body } = userNotes?.find(note =>
            note.id === +noteId
            )

            setcurrTitle(title)
setCurrentNote(body)
    }, [dispatch, noteId])


    return (
        <div>
            <form id='edit-form'>
            <div className='title-container'>

            <h1>{currtitle}</h1>
            </div>
                <input
                className='butts'
                className='displayNote'
                onChange={(e) => {
                    setCurrentNote(e.target.value)
                }}
                value={currentNote}
                type="text"></input>

                <button
                className='butts'
                onClick={(e) => {
                    handleEdit(e)
                }}>Update</button>
                                <button
                                className='butts'
                                onClick={(e) => {
                    handleDelete(e, noteId)
                }}>Delete</button>
            </form>
        </div>
    )
}

export default CurrentNote;
