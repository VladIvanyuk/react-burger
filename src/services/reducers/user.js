import {REGISTER_USER, SET_AUTH, SET_USER } from "../actions/user"

const initialState = {
    email: '',
    name: '',
    isAuthChecked: false,
}

export const setUser = (state = initialState, action) => {
    switch(action.type) {
        case SET_USER:
            localStorage.setItem('accessToken', action.payload.accessToken);
            localStorage.setItem('refreshToken', action.payload.refreshToken);
            return {
                ...state,
                email: action.payload.user.email,
                name: action.payload.user.name,
            }
        case SET_AUTH:
            return {
                ...state,
                isAuthChecked: action.payload
            }
        case REGISTER_USER:
            localStorage.setItem('accessToken', action.payload.accessToken);
            localStorage.setItem('refreshToken', action.payload.refreshToken); 
            return {
                ...state,
                email: action.payload.user.email,
                name: action.payload.user.name,
            }
        default:
            return state;
    }
}