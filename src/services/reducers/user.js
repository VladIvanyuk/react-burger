import {LOGIN_USER } from "../actions/user"

const initialState = {
    email: '',
    password: '',
    name: '',
    accessToken: '',
    refreshToken: ''
}

export const userInfo = (state = initialState, action) => {
    switch(action.type) {
        case LOGIN_USER:
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