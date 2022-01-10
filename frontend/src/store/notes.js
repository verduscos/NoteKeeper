import { csrfFetch } from "./csrf"

const GET_NOTES = 'mynotes/getNotes';

const getNotes = (notes) => ({
    type: GET_NOTES,
    payload: notes
})

export const getNotesThunk = () => async (dispatch) => {
    const response = await csrfFetch('/api/mynotes', {
        method: 'GET',
    })
    const data = await response.json();
    dispatch(getNotes(data));
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

export default notesReducer;
