import React, { useEffect, useState } from 'react';
import * as notebookActions from '../../store/notebooks';
import { useDispatch, useSelector } from 'react-redux';
import './Notebooks.css';

function Notebooks() {
    const dispatch = useDispatch()

    const currentUser = useSelector(state => state.session.user);
    const notebooks = useSelector(state => state.notebooks.notebooks);

    console.log(notebooks);

    return (
        <div id='notebooks'>
            <h1>notebooks</h1>
            <ul>
            {notebooks?.map(notebook => (
                <li>{notebook.title}</li>
                // <li>{notebook.updatedAt}</li>
            ))}

            </ul>
        </div>
    )

}

export default Notebooks;
