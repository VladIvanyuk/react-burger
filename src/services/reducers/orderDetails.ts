import { TOrderDetailsActions } from '../actions/orderDetails';
import { GET_ORDER_DETAILS, GET_ORDER_DETAILS_FAILED, GET_ORDER_DETAILS_SUCCESS, DELETE_ORDER_DETAILS } from '../constants/constants';

export type TOrderDetailsState = {
    details: {
    order: {
        number: string
    }
    },
    isOrderError: boolean,
    isOrderLoaded: boolean
}

const initialState: TOrderDetailsState = {
    details: {
        order: {
            number: '',
        }
    },
    isOrderError: false,
    isOrderLoaded: false,
}

export const orderDetails = (state = initialState, action: TOrderDetailsActions) => {
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
        case DELETE_ORDER_DETAILS:
            return {
                ...state,
                details: {
                    order: {
                        number: ''
                    }
                }
            }
        default: 
            return state;
    }
}