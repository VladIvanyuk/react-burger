import { Action, ActionCreator, Dispatch } from "redux";
import { request } from "../../utils/burger-api";
import { GET_INGREDIENTS, GET_INGREDIENTS_REQUEST_FAILED, GET_INGREDIENTS_REQUEST_SUCCESS } from "../constants/constants";
import { RootState, TIngredient } from "../types/types";
import { ThunkAction } from "redux-thunk";

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

export type BurgerIngredientsThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TIngredientListActions>
>;

export type OrderDetailsDispatch = Dispatch<TIngredientListActions>; 

export const getBurgerIngredients: BurgerIngredientsThunk = () => {
    return function(dispatch: OrderDetailsDispatch) {
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