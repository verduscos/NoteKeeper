import { csrfFetch } from "./csrf";;

//action
const GET_NOTEBOOKS = 'mynotes/GET_NOTEBOOKS'
const CREATE_NOTEBOOK = 'mynotes/CREATE_NOTEOOK'
const UPDATE_NOTEBOOK = 'mynotes/UPDATE_NOTEBOOK'
const DELETE_NOTEBOOK = 'mynotes/DELETE_NOTEBOOK'
const GET_NOTEBOOK_NOTES = 'mynotes/GET'

//action creator
const getNotebooks = (notebooks) => ({
    type:GET_NOTEBOOKS,
    payload: notebooks
})

const postNotebook = (notebook) => ({
  type: CREATE_NOTEBOOK,
  payload: notebook
})

const deleteNotebook = (notebook) => ({
  type: DELETE_NOTEBOOK,
  payload: notebook
})

const updateNotebook = (notebook) => ({
  type: UPDATE_NOTEBOOK,
  payload: notebook
})


//thunk
export const getNootbooksThunk = (userId) => async (dispatch)=> {
  const response = await csrfFetch(`/api/mynotes/notebooks/${userId}`, {
    method: 'GET'
  })

  const data = await response.json();
  dispatch(getNotebooks(data));
}


export const postNotebookThunk = (payload) => async (dispatch) => {
  const response = await csrfFetch(`/api/mynotes/notebooks/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  })
  if (response.ok) {
    const note = await response.json();
    dispatch(postNotebook(note));
    return note;
  }
}


export const deleteNotebookThunk = (payload) => async(dispatch) => {
  const response = await csrfFetch(`/api/mynotes/notebooks/`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  })

  if (response.ok) {
    const note = await response.json();
    dispatch(deleteNotebook(note));
    return note;
  }
}

export const updateNotebookThunk = (payload) => async(dispatch) => {
  const response = await csrfFetch(`/api/mynotes/notebooks/`, {
    method: "PUT",
    headers: {
      "Content-Type" : "application/json"
    },
    body: JSON.stringify(payload)
  })

  if (response.ok) {
    const note = await response.json();
    dispatch(updateNotebook(note));
    return note;
  }
}


//reducer
const initialState = { notebooks: null };

const notebooksReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_NOTEBOOKS:
          let notes = {};

          action.payload.forEach(note => {
            notes[note.id] = note;
          })

          return notes;
        case CREATE_NOTEBOOK:
          let newNotebook = { ...state }

          newNotebook[action.payload.id] = action.payload;

          return newNotebook;
        case UPDATE_NOTEBOOK:
          let updateNotebook = { ...state }

          updateNotebook[action.payload.id] = action.payload

          return updateNotebook;
        case DELETE_NOTEBOOK:
          let updatedNotebook = { ...state }

          delete updatedNotebook[action.payload.id]

          return updatedNotebook
        default:
            return state;
    }
}

export default notebooksReducer
