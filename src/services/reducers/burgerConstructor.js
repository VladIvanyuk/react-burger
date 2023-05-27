import { DELETE_INGREDIENT, ADD_INGREDIENT, SORT_INGREDIENT, ADD_BUN, CALCULATE_ORDER_SUM } from "../actions/burgerConstructor"

export const burgerConstructor = (state = [], action) => {
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
                    ...state.ingredients.filter((el) => {
                        if(el._delete_id) {
                            return el._delete_id !== action.payload
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
            
        default:
            return state;
    }
}