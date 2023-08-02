import { combineReducers } from "redux";
import { burgerIngredients } from "./burgerIngredients";
import { burgerConstructor } from "./burgerConstructor";
import { ingredientDetails } from "./ingredientDetails";
import { orderDetails } from "./orderDetails";
import { user } from "./user";
import { feedReducer } from "./wsFeed";

export const rootReducer = combineReducers({
    burgerIngredients,
    burgerConstructor,
    ingredientDetails,
    orderDetails,
    feedReducer,
    user
})