import React, {  useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as sessionActions from '../../store/notes';
import { useParams, Redirect } from 'react-router-dom';



function CurrentNote() {
    const params = useParams();
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user);
    const userNotes = useSelector(state => state.notes.notes)

    const  { noteId } = params;
    const  { title, body } = userNotes?.find(note =>
        note.id === +noteId
        )


    const [currtitle, setcurrTitle] = useState(title);
    const [currentNote, setCurrentNote] = useState(body);



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
    }, [dispatch])


    return (
        <div>
            <h1>{currtitle}</h1>
            <form>
                <input id='displayNote'
                onChange={(e) => {
                    setCurrentNote(e.target.value)
                }}
                value={currentNote}
                type="text"></input>

                <button onClick={(e) => {
                    handleEdit(e)
                }}>Update</button>
                                <button onClick={(e) => {
                    handleDelete(e, noteId)
                }}>Delete</button>
            </form>
        </div>
    )
}

export default CurrentNote;
