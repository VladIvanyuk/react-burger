import { TIngredientListActions } from '../actions/burgerIngredients';
import { GET_INGREDIENTS, GET_INGREDIENTS_REQUEST_SUCCESS, GET_INGREDIENTS_REQUEST_FAILED } from '../constants/constants';
import { TIngredient } from '../types/types';

export type TIngredientsListState = {
    data: [] | TIngredient[],
    isLoaded: boolean,
    isError: boolean
  }
  
const initialState: TIngredientsListState = {
    data: [],
    isLoaded: false,
    isError: false
  }

export const burgerIngredients = (state = initialState, action: TIngredientListActions): TIngredientsListState => {
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