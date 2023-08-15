import { request } from "../../utils/burger-api";
import { GET_INGREDIENTS, GET_INGREDIENTS_REQUEST_FAILED, GET_INGREDIENTS_REQUEST_SUCCESS } from "../constants/constants";
import { AppDispatch, AppThunkAction, TIngredient, TIngredientsResponse } from "../types/types";

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

export const getIngredientsAction = () => {
    return {
        type: GET_INGREDIENTS
    }
}

export const getIngredientsRequestSuccessAction = (res: TIngredientsResponse) => {
    return {
        type: GET_INGREDIENTS_REQUEST_SUCCESS,
        data: res.data
    }
}

export const getIngredientsRequestFailedAction = () => {
    return {
        type: GET_INGREDIENTS_REQUEST_FAILED
    }
}

export const getBurgerIngredients: AppThunkAction = () => {
    return function(dispatch: AppDispatch) {
        dispatch(getIngredientsAction())

        request('ingredients', {}).then((res) => {
            dispatch(getIngredientsRequestSuccessAction(res))
        }).catch((err) => {
            dispatch(getIngredientsRequestFailedAction())
        })
    }
}