import { GET_ORDER_DETAILS, GET_ORDER_DETAILS_FAILED, GET_ORDER_DETAILS_SUCCESS, DELETE_ORDER_DETAILS } from '../actions/orderDetails';

const initialState = {
    details: {
      order: {
        number: '',
      }
    },
    isOrderError: false,
    isOrderLoaded: false,
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