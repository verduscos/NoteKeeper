
import React, { useEffect, useState } from 'react';
import CreateNotebook from './CreateNotebook';
import * as notebookActions from '../../store/notebooks';
import { getNotebookNotesThunk } from '../../store/notes';
import ProfileButton from '../Navigation/ProfileButton';
import { deleteNotebookThunk, updateNotebookThunk } from '../../store/notebooks';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import * as sessionActions from '../../store/notes';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { RiSave3Fill, RiDeleteBin5Fill } from 'react-icons/ri'
import { AiFillCloseSquare, AiOutlineMenu, AiOutlinePlus } from 'react-icons/ai';
import './Notebooks.css';

function Notebooks() {
  const params = useParams();
  const history = useHistory();
  const { notebookId } = params;
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.session.user);
  const notebooksObj = useSelector(state => state.notebooks);
  const notes1 = useSelector(state => state.notes);
  let notes = Object.values(notes1);
  let notebooks = Object.values(notebooksObj);
  const [notebookName, setNotebookName] = useState("");
  const [highlight, setHighlight] = useState("highlight-notebook")
  const [errors, setErrors] = useState("");
  const [showEditNotebook, setShowEditNotebook] = useState(false)
  const [displayDisabled, setDisplayDisabled] = useState(false)
  const [dashboard, setDashboard] = useState("notebooks");
  const [notebooksInner, setNotebooksInner] = useState("");


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

    if (notebookName.length >= 4) {
      dispatch(updateNotebookThunk(payload));
      setShowEditNotebook(false);
      setErrors("");
      setNotebookName("");
    } else {
      setErrors("Title must be at least 4 characters.")
    }

  }

  const filterByNotebook = (e, id) => {
    e.preventDefault();
    history.push(`/mynotes/notebook/${id}`);
    dispatch(getNotebookNotesThunk(currentUser.id, id));

  }


  useEffect(() => {
    dispatch(sessionActions.getNotesThunk(currentUser?.id))
    dispatch(notebookActions.getNootbooksThunk(currentUser?.id))
    //adding loaded is not chaning anything atm, fixed loading issue with '?'

  }, [dispatch])

  useEffect(() => {
    // dispatch(getNotebookNotesThunk(currentUser.id, notebookId));
    setShowEditNotebook(false);
    setErrors("")
    setNotebookName("");
  }, [dispatch, notebookId])

  return (
    <div id="notebooks" className={dashboard}>
      <div id="dash-off" onClick={() => {
        setDashboard("");
        setNotebooksInner("");
      }}></div>
      <div id={notebooksInner}>
        <div id="mobile-btn">
          <AiOutlineMenu onClick={() => {
            setDashboard("display-dash")
            setNotebooksInner("notebooks-inner");
          }} />

          <div id="nav-create">
            <AiOutlinePlus id="nav-create-btn" />
            New
          </div>
        </div>

        <div id='user'>
          <ProfileButton user={currentUser} />
        </div>

        <CreateNotebook user={currentUser} />

        <div>
          {notebooks?.map(notebook => (
            <div
              onClick={(e) => {
                filterByNotebook(e, notebook?.id);
                // close nav
                setDashboard("");
                setNotebooksInner("");
              }}
              id="notebook-container" className={notebookId == notebook?.id ? highlight : ""} >
              <Link
                // to={`/mynotes/notebook/${notebook?.id}`}
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
                <div id="notebook-edit-container"
                  onClick={(e) => {
                    e.preventDefault();
                  }}>

                  <div id="close-delete-btns">
                    <div onClick={(e) => setShowEditNotebook(false)} id="delete-notebook-btn" className="close-edit-form" ><AiFillCloseSquare /></div>
                  </div>

                  {errors.length ?
                    <p className="errors-modal">*{errors}</p>
                    : null}
                  <form onSubmit={(e) => {
                    updateNotebook(e, notebook.id)
                  }} id="notebook-edit-form">

                    {/* <p>Update notebook title</p> */}
                    <input value={notebookName} onChange={(e) => {
                      e.preventDefault()
                      setNotebookName(e.target.value)
                    }} type="text" placeholder="Edit notebook title..." id="edit-notebook-input" />

                    <div id="edit-notebook-btn" onClick={(e) => {
                      e.preventDefault();
                      updateNotebook(e, notebook.id)
                    }}><RiSave3Fill /></div>



                    {notes?.length ?
                      <>
                        {displayDisabled ? <p id="disabled-msg">Unable to delete a non-empty notebooks.</p> : null}
                        <div
                          onMouseOver={() => {
                            setDisplayDisabled(true);
                          }}
                          onMouseLeave={() => setDisplayDisabled(false)}
                          onClick={(e) => {
                            e.preventDefault()
                            deleteNotebook(e, notebook.id)
                          }} id="delete-notebook-btn-disabled"  ><RiDeleteBin5Fill /></div>
                      </>
                      :
                      <div onClick={(e) => {
                        e.preventDefault()
                        deleteNotebook(e, notebook.id)
                      }} id="delete-notebook-btn" ><RiDeleteBin5Fill /></div>
                    }


                  </form>

                </div>

                : null}

            </div>
          ))}

        </div>

      </div>
    </div>
  )

}

export default Notebooks;
