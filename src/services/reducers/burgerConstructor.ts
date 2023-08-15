import { TBurgerConstructorActions } from "../actions/burgerConstructor";
import { DELETE_INGREDIENT, ADD_INGREDIENT, SORT_INGREDIENT, ADD_BUN, CLEAR_CONSTRUCTOR } from "../constants/constants";
import { TIngredient } from "../types/types";

type TConstructorState = {
    buns: {
        _id?: string
    } | TIngredient,
    ingredients: TIngredient[]
}

export const burgerConstructorIState: TConstructorState = {
    buns: {},
    ingredients: [],
};

export const burgerConstructor = (state = burgerConstructorIState, action: TBurgerConstructorActions): TConstructorState => {
    switch (action.type) {
        case ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [ 
                    ...state.ingredients,
                    action.payload
                ]
                }
            
        case DELETE_INGREDIENT:
            return {
                ...state,
                ingredients: [
                    ...state.ingredients.filter((el: TIngredient) => {
                        if(el.uniqueId) {
                            return el.uniqueId !== action.payload
                        } else {
                            return true
                        }
                    })
                ]
    }
        case SORT_INGREDIENT:
           return {
            ...state,
            ingredients: [
                ...action.payload
            ]
           }
        case ADD_BUN:
            return {
                ...state,
                buns: action.payload
            }
        
        case CLEAR_CONSTRUCTOR:
            return {
                ingredients: [],
                buns: {},
            }
        default:
            return state;
    }
}