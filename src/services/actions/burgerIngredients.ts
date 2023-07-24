import { Dispatch } from "redux";
import { request } from "../../utils/burger-api";
import { GET_INGREDIENTS, GET_INGREDIENTS_REQUEST_FAILED, GET_INGREDIENTS_REQUEST_SUCCESS } from "../constants/constants";

export const getBurgerIngredients = (): any => {
    return function(dispatch: Dispatch) {
        dispatch({
            type: GET_INGREDIENTS
        })

        request('ingredients', {}).then((res) => {
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