import { csrfFetch } from "./csrf";;

//action
const GET_NOTEBOOKS = 'mynotes/GET_NOTEBOOKS'
// const GET_NOTEBOOK_NOTES = 'mynotes/GET'

//action creator
const getNotebooks = (notebooks) => ({
    type:GET_NOTEBOOKS,
    payload: notebooks
})

// const getNotebookNotes = (notes) => ({
//   type: GET_NOTEBOOK_NOTES,
//   payload: notes
// })

//thunk
export const getNootbooksThunk = (userId) => async (dispatch)=> {

  const response = await csrfFetch(`/api/mynotes/notebooks/${userId}`, {
    method: 'GET'
  })

  const data = await response.json();
  dispatch(getNotebooks(data));
}

// export const getNotebookNotesThunk = (userId, notebookId) => async (dispatch) => {
//   console.log('INSIDE THUNK');
//   const response = await csrfFetch(`/api/mynotes/notebooks/${userId}/${notebookId}`, {
//     method: "GET"
//   })

//   const data = await response.json();
//   dispatch(getNotebookNotes(data));
// }

//reducer
const initialState = { notebooks: null };

const notebooksReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_NOTEBOOKS: {
            return {...state, notebooks: action.payload}
        }
        // case GET_NOTEBOOK_NOTES:
        //   let notes = {};
        //   console.log("INSIDE RECUDER")
        //   console.log(action.payload)
        //   action.payload.forEach(note => {
        //     notes[note.id] = note;
        //   })

          // return notes;
        default:
            return state;
    }
}

export default notebooksReducer
