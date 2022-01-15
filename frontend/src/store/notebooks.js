import { csrfFetch } from "./csrf";;

//action
const GET_NOTEBOOKS = 'mynotes/'

//action creator
const getNotebooks = (notebooks) => ({
    type:GET_NOTEBOOKS,
    payload: notebooks
})

//thunk
export const getNootbooksThunk = (userId) => async (dispatch)=> {
 console.log('INSIDE THUNK');

 const response = await csrfFetch(`/api/mynotes/notebooks/${userId}`, {
     method: 'GET'
 })

 const data = await response.json();
 dispatch(getNotebooks(data));
}


//reducer
const initialState = { notebooks: null };

const notebooksReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_NOTEBOOKS: {
            return {...state, notebooks: action.payload}
        }
        default:
            return state;
    }
}

export default notebooksReducer
