import { Dispatch } from "redux";
import { requestWithRefresh } from "../../utils/burger-api";

export const GET_INGREDIENTS = 'GET_INGREDIENTS';
export const GET_INGREDIENTS_REQUEST_SUCCESS = 'GET_INGREDIENTS_REQUEST_SUCCESS';
export const GET_INGREDIENTS_REQUEST_FAILED = 'GET_INGREDIENTS_REQUEST_FAILED';


export const getBurgerIngredients = (): any => {
    return function(dispatch: Dispatch) {
        dispatch({
            type: GET_INGREDIENTS
        })

        requestWithRefresh('ingredients').then((res) => {
            dispatch({
                type: GET_INGREDIENTS_REQUEST_SUCCESS,
                data: res.data
            })
        }).catch((err) => {
            dispatch({
                type: GET_INGREDIENTS_REQUEST_FAILED
            })
        })
    }
}