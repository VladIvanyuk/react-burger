import { combineReducers } from "redux";
import { burgerIngredients } from "./burgerIngredients";
import { burgerConstructor } from "./burgerConstructor";
import { ingredientDetails } from "./ingredientDetails";
import { orderDetails } from "./orderDetails";
import { setUser } from "./user";

export const rootReducer = combineReducers({
    burgerIngredients,
    burgerConstructor,
    ingredientDetails,
    orderDetails,
    setUser
})