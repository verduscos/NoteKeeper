
import React, { useEffect, useState } from 'react';
import CreateNotebook from './CreateNotebook';
import * as notebookActions from '../../store/notebooks';
import { getNotebookNotesThunk } from '../../store/notes';
import ProfileButton from '../Navigation/ProfileButton';
import { postNotebookThunk, deleteNotebookThunk, updateNotebookThunk } from '../../store/notebooks';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { IoIosArrowDown } from 'react-icons/io';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import './Notebooks.css';

function Notebooks() {
  const params = useParams();
  const { notebookId } = params;
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.session.user);
  const notebooksObj = useSelector(state => state.notebooks);
  let notebooks = Object.values(notebooksObj);
  const [notebookName, setNotebookName] = useState("");
  const [highlight, setHighlight] = useState("highlight-notebook")
  const [errors, setErrors] = useState("");
  const [showEditNotebook, setShowEditNotebook] = useState(false)

  const getNotebookNotes = (e, notebookId) => {
    e.preventDefault();
    dispatch(getNotebookNotesThunk(currentUser.id, notebookId));
  }


  const deleteNotebook = (e, id) => {
    e.preventDefault();
    const payload = {
      notebookId: id
    }

    dispatch(deleteNotebookThunk(payload))
  }

  const updateNotebook = (e, id) => {
    e.preventDefault();
    const payload = {
      notebookId: id,
      title: notebookName
    }

    dispatch(updateNotebookThunk(payload))
  }

  useEffect(() => {
    dispatch(getNotebookNotesThunk(currentUser.id, notebookId));
  }, [dispatch, notebookId])

  return (
    <div id='notebooks'>
      <div id='user'>
        <ProfileButton user={currentUser} />
      </div>

      <CreateNotebook user={currentUser} />

      <div>
        {notebooks?.map(notebook => (
          <div id="notebook-container" className={notebookId == notebook?.id ? highlight : ""} >
            <Link
              to={`/mynotes/notebook/${notebook?.id}`}
              // onClick={(e) => {
              //   getNotebookNotes(e, notebook.id)
              // }}
              id='notebook-links'>{notebook?.title}</Link>


            {notebookId == notebook?.id ? <BiDotsVerticalRounded
            onClick={(e) => {
              e.preventDefault();
              setShowEditNotebook(!showEditNotebook);
            }} id="notebook-edit-btn" /> : null}


            {showEditNotebook && notebookId == notebook?.id ?
              <div id="notebook-edit-container">
                <form onSubmit={(e) => {
                  updateNotebook(e, notebook.id)
                }}>
                  <input value={notebookName} onChange={(e) => {
                    e.preventDefault()
                    setNotebookName(e.target.value)
                  }} type="text" placeholder="Edit notebook title..." id="edit-notebook-input" />

                  {/* <button className="delete">Edit</button> */}
                </form>

                <span onClick={(e) => {
                  deleteNotebook(e, notebook.id)
                }} className="delete">Delete notebook</span>
              </div>



              : null}

          </div>
        ))}

      </div>

    </div>
  )

}

export default Notebooks;
