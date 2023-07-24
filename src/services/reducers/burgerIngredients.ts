import { AnyAction } from 'redux';
import { GET_INGREDIENTS, GET_INGREDIENTS_REQUEST_SUCCESS, GET_INGREDIENTS_REQUEST_FAILED } from '../constants/constants';

const initialState = {
    data: [],
    isLoaded: false,
    isError: false
  }

export const burgerIngredients = (state = initialState, action: AnyAction) => {
    switch(action.type) {
        case GET_INGREDIENTS:
            return {
                ...state,
                isLoaded: false,
                isError: false,
            }
        case GET_INGREDIENTS_REQUEST_SUCCESS:
            return {
                ...state,
                data: action.data,
                isLoaded: true,
            }

        case GET_INGREDIENTS_REQUEST_FAILED:
            return {
                ...state,
                isError: true,
            }
        default: 
        return state;
    }
}