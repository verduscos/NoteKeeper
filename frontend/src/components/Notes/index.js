import React, { useEffect, useState } from 'react';
import * as sessionActions from '../../store/notes';
import { useDispatch, useSelector } from 'react-redux';


function Notes() {
    const dispatch = useDispatch()
    const [notes, setNotes] = useState=([])

    useEffect(() => {

    }, [sessionActions.getNotes])

    return (
        <h1>Notes</h1>
    )
}

export default Notes;
