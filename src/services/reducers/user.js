import { REGISTER_USER, LOGIN_USER } from "../actions/user"

const initialState = {
    email: '',
    password: '',
    name: '',
    accessToken: '',
    refreshToken: ''
}

export const userInfo = (state = initialState, action) => {
    switch(action.type) {
        case REGISTER_USER:
            
            break;
            
        case LOGIN_USER:
            console.log(action);
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