import { React, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as sessionActions from '../../store/notes';
import { useParams } from 'react-router-dom';



function CurrentNote() {
    const params = useParams();
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user);

    const  { noteId } = params;

    const userNotes = useSelector(state => state.notes.notes)
    const [body, setBody] = useState('')
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
        return
    }


    return (
        <div>
            <h1>current selected note</h1>
            <p>{currentNote?.body}</p>
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
