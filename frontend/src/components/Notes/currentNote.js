import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import { useSelector, useDispatch } from 'react-redux';
import * as sessionActions from '../../store/notes';
import { useParams, useHistory, Link } from 'react-router-dom';
import './CurrentNote.css';



function CurrentNote() {
    const history = useHistory();
    const params = useParams();
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user);
    const userNotes1 = useSelector(state => state.notes)
    let userNotes = Object.values(userNotes1)
    const { noteId } = params;
    const [currtitle, setcurrTitle] = useState('');
    const [currentNote, setCurrentNote] = useState('');
    const [errors, setErrors] = useState([]);
    const [updated, setUpdated] = useState(false);
    // const [deleted, setDeleted] = useState(false);
    const [value, setValue] = useState('');

    let notifcation;
    if (updated) {
        notifcation = (
            <div className='notification'>
                <p>Note Updated! </p> <i id='notification-check' className="fas fa-check-square"></i>
            </div>
        )
    } else {
        notifcation = (
            null
        )
    }

    // let deletion;
    // if (deleted) {
    //     deletion = (
    //         <div className='notification'>
    //             <p>Note Deleted! </p> <i id='notification-check' class="fas fa-check-square"></i>
    //         </div>
    //     )
    // } else {
    //     deletion = (
    //         null
    //     )
    // }

    if (updated) {
        setTimeout(() => {
            setUpdated(false);
            history.push('/mynotes/notes')
        }, 2000)
    }


    // EDIT
    const handleEdit = async (e) => {
        e.preventDefault();

        const payload = {
            id: noteId,
            title: currtitle,
            body: value,
            userId: currentUser.id
        }

        setErrors([]);
        if (currtitle.length >= 4 && value.length >= 1) setUpdated(true)

        return dispatch(sessionActions.editNoteThunk(payload, noteId))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            })
    }

    // DELETE
    const handleDelete = async (e, id) => {
        e.preventDefault();
        // setDeleted(true);

        const res = await dispatch(sessionActions.removeNoteThunk(id))
        // if (deleted) {
        //     await setTimeout(() => {
        //         setDeleted(false);
        //     }, 10000)
        // }
        if (res.id) history.push('/mynotes/notes')
        return
    }


    useEffect(() => {
        // dispatch(sessionActions.getNotesThunk(currentUser?.id))

        // const { title, body } = userNotes?.find(note =>
        //     note?.id === +noteId
        // )

        let title = userNotes1[noteId].title;
        let body = userNotes1[noteId].body;
        // const { title, body } = userNotes1[noteId];

        setcurrTitle(title)
        setValue(body)
    }, [dispatch, noteId])


    return (
        <div>
            <form onSubmit={handleEdit} className='form'>
                <div className='title-container'>
                <Link id='create-link' to='/mynotes/notes'>New note</Link>

                    {/* <h1>{currtitle}</h1> */}
                    {/* {deletion} */}
                    {notifcation}
                    <ul className='errors'>
                        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                    </ul>
                    <input
                    className='form-title edit'
                        value={currtitle}
                        onChange={(e) => {
                            setcurrTitle(e.target.value)
                        }}

                        type="text"></input>

                </div>

                <ReactQuill theme="snow" value={value} onChange={setValue} className='displayNote' />
                {/* <textarea
                    // className='butts'
                    className='displayNote'
                    onChange={(e) => {
                        setCurrentNote(e.target.value)
                    }}
                    required
                    value={currentNote}
                    type="textarea"
                    cols='60' rows='8'
                ></textarea> */}

                <button
                    onClick={(e) => {
                        handleEdit(e)
                    }}
                    className='create-delete create'
                >Update</button>




                <button
                    id='delete'
                    className='create-delete'
                    onClick={(e) => {
                        handleDelete(e, noteId)
                    }}>Delete</button>
            </form>
        </div>
    )
}

export default CurrentNote;
