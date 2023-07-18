import { AnyAction } from "redux";
import {REGISTER_USER, SET_AUTH, SET_USER, GET_USER, DELETE_USER } from "../actions/user"

const initialState = {
    user: {},
    isAuthChecked: false,
}

export const user = (state = initialState, action: AnyAction) => {
    switch(action.type) {
        case SET_USER:
            localStorage.setItem('accessToken', action.payload.accessToken);
            localStorage.setItem('refreshToken', action.payload.refreshToken);
            return {
                ...state,
                user: {
                    ...state.user,
                    email: action.payload.user.email,
                    name: action.payload.user.name,
                }
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
                user: {
                    ...state.user,
                    email: action.payload.user.email,
                    name: action.payload.user.name,
                }
            }
        case GET_USER: 
            return {
                ...state,
                user: {
                    ...state.user,
                    email: action.payload.user.email,
                    name: action.payload.user.name,
                }
            }
        case DELETE_USER: {
            return {
                ...state,
                user: null
            }
        }
        default:
            return state;
    }
}