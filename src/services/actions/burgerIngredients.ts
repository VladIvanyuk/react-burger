import { Dispatch } from "redux";
import { request } from "../../utils/burger-api";
import { GET_INGREDIENTS, GET_INGREDIENTS_REQUEST_FAILED, GET_INGREDIENTS_REQUEST_SUCCESS } from "../constants/constants";
import { TIngredient } from "../types/types";

type TGetIngredientsAction = {
    readonly type: typeof GET_INGREDIENTS
}

type TGetIngredientsRequestSuccessAction = {
    readonly type: typeof GET_INGREDIENTS_REQUEST_SUCCESS,
    readonly data: TIngredient[]
}

type TGetIngredientsRequestFailedAction = {
    readonly type: typeof GET_INGREDIENTS_REQUEST_FAILED,
}

export type TIngredientListActions = TGetIngredientsAction
| TGetIngredientsRequestFailedAction
| TGetIngredientsRequestSuccessAction

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