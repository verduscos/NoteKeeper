import { csrfFetch } from "./csrf"

const SINGLE_NOTE = 'mynotes/singleNote';

const singleNote = (note) => ({
  type: SINGLE_NOTE,
  payload: note
})

export const getSingleNoteThunk = (userId, noteId) => async (dispatch) => {
  const response = await csrfFetch(`/api/mynotes/${userId}/notes/${noteId}`, {
      method: 'GET',
  })
  const data = await response.json();
  dispatch(singleNote(data));
}

const singleNoteReducer = (state = {}, action) => {
  switch (action.type) {
    case SINGLE_NOTE:
      let note = { ...action.payload }

      return note;
    default:
      return state;
  }
}


export default singleNoteReducer;
