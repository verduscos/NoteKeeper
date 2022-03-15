import { csrfFetch } from "./csrf"

const GET_NOTES = 'mynotes/getNotes';
// const SINGLE_NOTE = 'mynotes/singleNote';
const GET_NOTEBOOK_NOTES = 'mynotes/GET'
const CREATE_NOTE = 'mynotes/createNote';
const EDIT_NOTE = 'mynotes/editNote';
const REMOVE_NOTE = 'mynotes/deleteNote'

const getNotes = (notes) => ({
  type: GET_NOTES,
  payload: notes
})

const getNotebookNotes = (notes) => ({
  type: GET_NOTEBOOK_NOTES,
  payload: notes
})

// const singleNote = (note) => ({
//     type: GET_NOTES,
//     payload: note
// })

const createNote = (note) => ({
  type: CREATE_NOTE,
  payload: note
})

const editNote = (note) => ({
  type: EDIT_NOTE,
  payload: note
})

const removeNote = (noteId) => ({
  type: REMOVE_NOTE,
  payload: noteId
})

export const removeNoteThunk = (noteId) => async (dispatch) => {
  console.log('IN REMOVE THUNK')
  const response = await csrfFetch(`/api/mynotes/notes/${noteId}`, {
    method: 'DELETE'
  })
  if (response.ok) {
    const data = await response.json();
    dispatch(removeNote(noteId));
    return data;
  }
}


export const getNotesThunk = (userId) => async (dispatch) => {
  const response = await csrfFetch(`/api/mynotes/${userId}`, {
    method: 'GET',
  })
  const data = await response.json();
  dispatch(getNotes(data));
}

export const getNotebookNotesThunk = (userId, notebookId) => async (dispatch) => {
  const response = await csrfFetch(`/api/mynotes/notebooks/${userId}/${notebookId}`, {
    method: "GET"
  })

  const data = await response.json();
  dispatch(getNotebookNotes(data));
}

// export const getSingleNoteThunk = (userId, noteId) => async (dispatch) => {
//     console.log("IN SIDE THE THUNK")
//     const response = await csrfFetch(`/api/mynotes/${userId}/notes/${noteId}`, {
//         method: 'GET',
//     })
//     const data = await response.json();
//     console.log("DATATATATTA", data)
//     dispatch(singleNote(data));
// }

export const createNoteThunk = (payload) => async (dispatch) => {
  const response = await csrfFetch(`/api/mynotes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })

  if (response.ok) {
    const note = await response.json();
    dispatch(createNote(note));
    return note;
  }
}

export const editNoteThunk = (payload, noteId) => async (dispatch) => {
  console.log('IN THUNK')
  const response = await csrfFetch(`/api/mynotes/notes/${noteId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })

  if (response.ok) {
    const editedNote = await response.json();
    dispatch(editNote(editedNote));
    return editedNote;
  }
}

const initialState = { notes: null };

const notesReducer = (state = initialState, action) => {
  switch (action.type) {
    // WORKING
    case GET_NOTES: {
      let notes = {};

      action.payload.forEach(note => {
        notes[note.id] = note
      })

      return notes
    }

    case GET_NOTEBOOK_NOTES:
      let notes = {};
      console.log("INSIDE RECUDER")
      console.log(action.payload)
      action.payload.forEach(note => {
        notes[note.id] = note;
      })

      return notes;
    // case SINGLE_NOTE:
    //   let newNote = {}

    //   console.log("INSIDE REDUCER")
    //   console.log(action.payload)
    // WORKING
    case CREATE_NOTE: {
      const newState = { ...state };


      newState[action.payload.id] = action.payload
      console.log(newState)

      return newState
    }
    // // WORKING
    // case EDIT_NOTE: {
    //     const newState = { ...state};
    //     newState.notes.forEach((note, i ,arr) => {
    //         if (note.id === action.payload.id) {
    //             arr[i] = action.payload
    //         }
    //     })
    //     return newState;
    //   }
    // // NOT WORKING
    // // case REMOVE_NOTE: {
    // //     const newState = {...state};
    //     // newState.notes.forEach((note, i, arr) => {
    //     //     if (note.id === action.noteId) {
    //     //        newState.notes.splice(i, 1, 0);
    //     //     }
    //     // })
    //     // for (let i = 0; i < newState.notes; i++) {
    //     //     if (newState.notes.id[i] === action.payload.id) {
    //     //          newState.notes.splice(i, 1, 0);
    //     //     }
    //     // }
    //     // return newState
    // // }
    // case REMOVE_NOTE: {
    //     const newState = {...state}
    //     // console.log(action)
    //     const newNotes = newState.notes.filter(note => note.id !== +action.payload)
    //     // console.log(newNotes)
    //     newState.notes = newNotes;
    //     return newState;
    // }

    default:
      return state;
  }

}

export default notesReducer;
