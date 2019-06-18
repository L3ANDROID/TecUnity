import { createStore, combineReducers } from 'redux';

const initialState = {
    displayName:""
}

function userReducer(state=initialState,action){
    switch (action.type){
        case 'LOGGED_IN':
            return action.user;
        case 'SIGN_OUT':
            return state;
        default:
            return state;
    }
}

let rootReducer = combineReducers({
    user: userReducer
})

export default createStore(rootReducer)