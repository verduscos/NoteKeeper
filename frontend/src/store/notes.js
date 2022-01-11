import { csrfFetch } from "./csrf"

const GET_NOTES = 'mynotes/getNotes';
const SINGLE_NOTE = 'mynotes/singleNote';
const CREATE_NOTE = 'mynotes/createNote';
const EDIT_NOTE = 'mynotes/editNote';
const REMOVE_NOTE = 'mynotes/deleteNote'

const getNotes = (notes) => ({
    type: GET_NOTES,
    payload: notes
})

const singleNote = (note) => ({
    type: GET_NOTES,
    payload: note
})

const createNote = (note) => ({
    type: CREATE_NOTE,
    payload: note
})

const editNote = (note) => ({
    type: EDIT_NOTE,
    payload: note
})

const removeNote = (noteId) => ({
    type:REMOVE_NOTE,
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

export const getSingleNoteThunk = (userId, noteId) => async (dispatch) => {
    const response = await csrfFetch(`/api/mynotes/${userId}/notes/${noteId}`, {
        method: 'GET',
    })
    const data = await response.json();
    dispatch(singleNote(data));
}

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
        case GET_NOTES: {
            return {...state, notes: action.payload}
        }
        case CREATE_NOTE: {
            const newState = { ...state};
            newState.notes = {
                ...newState.notes,
                [action.payload.id]: action.payload,
            };
            return newState
        }
        case EDIT_NOTE: {
            const newState = {...state};
            newState.notes = {
                ...newState.notes,
                [action.note.id]: action.note
            }
            return {...newState}
        };
        case REMOVE_NOTE: {
            return {...state, note:action.payload}
        }
        default:
            return state;
    }

}

export default notesReducer;
