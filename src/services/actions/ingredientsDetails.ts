import { DELETE_DETAILS, ON_CLICK_INGREDIENT } from "../constants/constants"
import { TIngredient } from "../types/types"

export const onClickIngredientDetailsAction = (clickedIngredient: TIngredient) => {
    return {
        type: ON_CLICK_INGREDIENT,
        ingredient: clickedIngredient,
      }
}

export const deleteIngredientDetailsAction = () => {
    return {
        type: DELETE_DETAILS
    }
}