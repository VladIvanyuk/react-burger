import { GET_ORDER_DETAILS } from '../actions/orderDetails';

export const orderDetails = (state = {}, action) => {
    switch(action.type) {
        case GET_ORDER_DETAILS:
            return {
                ...action.details
            }
        default: 
            return state;
    }
}