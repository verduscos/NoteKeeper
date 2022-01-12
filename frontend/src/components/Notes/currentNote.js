import React, {  useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as sessionActions from '../../store/notes';
import { useParams, Redirect } from 'react-router-dom';



function CurrentNote() {
    const params = useParams();
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user);

    const  { noteId } = params;

    const userNotes = useSelector(state => state.notes.notes)
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    console.log(body)


    let currentNote = userNotes?.find(note =>
        note.id === +noteId
    )
        // EDIT
        const handleEdit = async (e) => {
            e.preventDefault();
            console.log('INSIDE HANDLE')
            const payload = {
                id: currentNote.id,
                body: body,
                userId: currentUser.id
            }
            console.log(payload)
            dispatch(sessionActions.editNoteThunk(payload, currentNote.id))
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
        // dispatch(sessionActions.removeNoteThunk(currentNote?.id))

        //adding loaded is not chaning anything atm, fixed loading issue with '?'

    }, [dispatch])


    return (
        <div>
            <h1>{currentNote?.title}</h1>
            <p id='displayNote'>{currentNote?.body}</p>
            <form>
                <input onChange={(e) => {
                    setBody(e.target.value)
                }}
                value={body}
                type="textarea"></input>
                <button onClick={(e) => {
                    handleEdit(e)
                }}>Update</button>
                                <button onClick={(e) => {
                    handleDelete(e, currentNote.id)
                }}>Delete</button>
            </form>
        </div>
    )
}

export default CurrentNote;
