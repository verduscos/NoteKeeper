import React, {  useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as sessionActions from '../../store/notes';
import { useParams, Redirect, useHistory, Link} from 'react-router-dom';
import './CurrentNote.css';



function CurrentNote() {
    const history = useHistory();
    const params = useParams();
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user);
    const userNotes = useSelector(state => state.notes.notes)

    const  { noteId } = params;



    const [currtitle, setcurrTitle] = useState('');
    const [currentNote, setCurrentNote] = useState('');
    const [errors, setErrors] = useState([]);

// const checkErrors = (title, body) => {
//     const errors = [];
//     if (title.length < 4) errors.push('title errors');
//     if (!body.length) errors.push('body errors');

//     setErrors(errors)

//     return errors;
// }


        // EDIT
        const handleEdit = async (e) => {
            e.preventDefault();

            const payload = {
                id: noteId,
                title: currtitle,
                body: currentNote,
                userId: currentUser.id
            }

            setErrors([]);

            // if (currtitle.length > 4) {
            //     return checkErrors(currtitle, currentNote)
            // } else {


            return dispatch(sessionActions.editNoteThunk(payload, noteId))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            })
        // }
            // return
        }

    // DELETE
    // const handleDelete = async (e, id) => {
    //     e.preventDefault();

    //     dispatch(sessionActions.removeNoteThunk(id))
    //     dispatch(sessionActions.getNotesThunk(currentUser?.id))
    //     return
    // }

    const handleDelete = async (e, id) => {
        e.preventDefault();

        const res = await dispatch(sessionActions.removeNoteThunk(id))
        // await dispatch(sessionActions.getNotesThunk(currentUser?.id))
        if(res.id) history.push('/mynotes/notes')


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
            <form onSubmit={handleEdit} id='edit-form'>
            <div className='title-container'>

            <h1>{currtitle}</h1>
            <input
                   value={currtitle}
                className='butts'
                onChange={(e) => {
                    setcurrTitle(e.target.value)
                }}

                type="text"></input>
                  <ul id='testing'>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
            </div>
                <textarea
                // className='butts'
                className='displayNote'
                onChange={(e) => {
                    setCurrentNote(e.target.value)
                }}
                required
                value={currentNote}
                type="textarea"
                cols='60' rows='8'
                ></textarea>

                <button
                onClick={(e) => {
                    handleEdit(e)
                }}
                className='butts'
               >Update</button>




                                <button
                                className='butts'
                                onClick={(e) => {
                    handleDelete(e, noteId)
                }}>Delete</button>
                <Link to='/mynotes/notes'>Back</Link>
            </form>
        </div>
    )
}

export default CurrentNote;
