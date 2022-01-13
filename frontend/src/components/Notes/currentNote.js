import React, {  useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as sessionActions from '../../store/notes';
import { useParams, useHistory, Link} from 'react-router-dom';
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
    const [updated, setUpdated] = useState(false);
    const [deleted, setDeleted] = useState(false);

    let notifcation;
    if (updated) {
        notifcation = (
            <div className='notification'>
                <p>Note Updated! </p> <i id='notification-check' class="fas fa-check-square"></i>
            </div>
        )
    } else {
        notifcation = (
            null
        )
    }

    let deletion;
    if (deleted) {
        deletion = (
            <div className='notification'>
                <p>Note Deleted! </p> <i id='notification-check' class="fas fa-check-square"></i>
            </div>
        )
    } else {
        deletion = (
            null
            )
    }

    if (updated) {
        setTimeout(() => {
            setUpdated(false);
        }, 2000)
    }


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
        if (currtitle.length >= 4 && currentNote.length >= 1) setUpdated(true)

        return dispatch(sessionActions.editNoteThunk(payload, noteId))
        .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors);
        })
    }

    // DELETE
    const handleDelete = async (e, id) => {
        e.preventDefault();
        setDeleted(true);

        const res = await dispatch(sessionActions.removeNoteThunk(id))
        if (deleted) {
           await setTimeout(() => {
                setDeleted(false);
            }, 5000)
        }
        if (res.id) history.push('/mynotes/notes')
        return
    }


    useEffect(() => {
        dispatch(sessionActions.getNotesThunk(currentUser?.id))

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
            {deletion}
            {notifcation}
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
