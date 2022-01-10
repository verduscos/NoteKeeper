import React, { useEffect, useState } from 'react';
import * as sessionActions from '../../store/notes';
import { useDispatch, useSelector } from 'react-redux';


function Notes() {
    const dispatch = useDispatch()
    const [notes, setNotes] = useState=([])

    const userNotes = useSelector(state => state.notes);

    useEffect(() => {
        dispatch(sessionActions.getNotesThunk())
    }, [dispatch])


    return (
        <h1>Notes</h1>
    )
}

export default Notes;
