import { combineReducers } from "redux";
import { burgerIngredients } from "./burgerIngredients";
import { burgerConstructor } from "./burgerConstructor";
import { ingredientDetails } from "./ingredientDetails";
import { orderDetails } from "./orderDetails";
import { user } from "./user";
import { publicOrdersFeed } from "./wsPublicFeed";
import { profileOrdersFeed } from "./wsProfileFeed";

export const rootReducer = combineReducers({
    burgerIngredients,
    burgerConstructor,
    ingredientDetails,
    orderDetails,
    publicOrdersFeed,
    profileOrdersFeed,
    user
})