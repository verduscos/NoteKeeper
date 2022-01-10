import React, { useEffect, useState } from 'react';
import * as sessionActions from '../../store/notes';
import { useDispatch, useSelector } from 'react-redux';


function Notes() {
    const dispatch = useDispatch()
    // const [loaded, setLoaded] = useState();
    const [notes, setNotes] = useState=([])

    const userNotes = useSelector(state => state.notes.notes);
    console.log(userNotes)

    useEffect(() => {
        dispatch(sessionActions.getNotesThunk())
        //adding loaded is not chaning anything atm, fixed loading issue with '?'

    }, [dispatch])


    // if (loaded) {

        return (
        <>
        <h1>Notes</h1>
        {userNotes?.map(note => (
            <>
            <div>{note.title}</div>
            <div>{note.body}</div>
            </>
        ))}
        </>
    )
// }
}

export default Notes;
