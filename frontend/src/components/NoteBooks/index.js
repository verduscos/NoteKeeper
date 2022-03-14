import React, { useEffect, useState } from 'react';
import * as notebookActions from '../../store/notebooks';
import { getNotebookNotesThunk } from '../../store/notes';
import { useDispatch, useSelector } from 'react-redux';
import './Notebooks.css';

function Notebooks() {
    const dispatch = useDispatch()

    const currentUser = useSelector(state => state.session.user);
    const notebooks = useSelector(state => state.notebooks.notebooks);

    const getNotebookNotes = (e, notebookId) => {
      e.preventDefault();

      dispatch(getNotebookNotesThunk(currentUser.id, notebookId));
    }

    return (
        <div id='notebooks'>
            <h1>notebooks</h1>
            <div id='note-container'>
            {notebooks?.map(notebook => (
                <div
                onClick={(e) => {
                  getNotebookNotes(e, notebook.id)
                }}
                id='note-links'>{notebook.title}</div>
            ))}

            </div>
        </div>
    )

}

export default Notebooks;
