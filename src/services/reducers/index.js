import { combineReducers } from "redux";
import { burgerIngredients } from "./burgerIngredients";
import { burgerConstructor } from "./burgerConstructor";
import { ingredientDetails } from "./ingredientDetails";
import { orderDetails } from "./orderDetails";
import { userInfo } from "./user";

export const rootReducer = combineReducers({
    burgerIngredients,
    burgerConstructor,
    ingredientDetails,
    orderDetails,
    userInfo
})