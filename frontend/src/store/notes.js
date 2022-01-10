import { csrfFetch } from "./csrf"

const GET_NOTES = 'mynotes/getNotes';

export const getNotes = () => async (dispatch) => {
    const response = await csrfFetch('/api/mynotes', {
        method: 'GET',
    })
    dispatch
}

const initialState = { notes: null };

const notesReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_NOTES: {
            return {...state, notes: action.payload}
        }
        default:
            return state;
    }

}
