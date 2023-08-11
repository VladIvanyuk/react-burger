import { DELETE_DETAILS, ON_CLICK_INGREDIENT } from "../constants/constants";
import { TIngredient } from "../types/types";

export type TOnClickIngredientAction = {
    readonly type: typeof ON_CLICK_INGREDIENT,
    ingredient: TIngredient
}

export type TDeleteDetailsAction = {
    readonly type: typeof DELETE_DETAILS
}

export type TIngredientDetailsActions = TOnClickIngredientAction | TDeleteDetailsAction;

const initialState = {};

export const ingredientDetails = (state = initialState, action: TIngredientDetailsActions) => {
    switch(action.type) {
        case ON_CLICK_INGREDIENT:
            return {
                ...action.ingredient
            }
        case DELETE_DETAILS:
            return {}
        default:
            return state;
    }
}