import { GET_ORDER_DETAILS, GET_ORDER_DETAILS_FAILED, GET_ORDER_DETAILS_SUCCESS } from '../actions/orderDetails';
const initialState = {
    details: {},
    isOrderError: false,
    isOrderLoaded: false
}

export const orderDetails = (state = initialState, action) => {
    switch(action.type) {
        case GET_ORDER_DETAILS:
            return {
                ...state,
                isOrderLoaded: false,
                isOrderError: false
            }
        case GET_ORDER_DETAILS_SUCCESS:
            return {
                ...state,
                details: action.details,
                isOrderLoaded: true
            }

        case GET_ORDER_DETAILS_FAILED:
            return {
                ...state,
                isOrderError: true
            }
        default: 
            return state;
    }
}