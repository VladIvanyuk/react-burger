import { v4 as uuidv4 } from 'uuid';
import { ADD_BUN, ADD_INGREDIENT, CLEAR_CONSTRUCTOR, DELETE_INGREDIENT, SORT_INGREDIENT } from '../constants/constants';
import { TIngredient } from '../types/types';

type TAddIngredientAction = {
    readonly type: typeof ADD_INGREDIENT,
    readonly payload: TIngredient
}

type TAddBunAction = {
    readonly type: typeof ADD_BUN,
    readonly payload: TIngredient
}

type TDeleteIngredientAction = {
    payload: string;
    readonly type: typeof DELETE_INGREDIENT,
}

type TSortIngredientAction = {
    readonly type: typeof SORT_INGREDIENT,
    readonly payload: ReadonlyArray<TIngredient>
}

type TClearConstructorAction = {
    readonly type: typeof CLEAR_CONSTRUCTOR
}
  
export type TBurgerConstructorActions = TAddIngredientAction
  | TAddBunAction
  | TDeleteIngredientAction
  | TSortIngredientAction
  | TClearConstructorAction
  

export const addIngridientAction = (item: TIngredient): TBurgerConstructorActions => {
    return {
        type: ADD_INGREDIENT,
        payload: {
            ...item, // используем `spread`, чтобы поменять ссылку на объект. Таким образом `redux` обновит его в хранилище
           uniqueId: uuidv4()  // и добавляем в объект новое поле, которое потом будет использовано в `key`
        }
    }
}
export const addBunAction = (bun: TIngredient): TBurgerConstructorActions => {
    return {
        type: ADD_BUN,
        payload: bun,
    }
}

export const deleteIngredientAction = (uniqueId: string) => {
    return {
        type: DELETE_INGREDIENT,
        payload: uniqueId
    }
}

export const sortIngredientsAction = (sortedArray: TIngredient[]) => {
    return {
        type: SORT_INGREDIENT,
        payload: sortedArray
    }
}

export const clearConstructorAction = () => {
    return {
        type: CLEAR_CONSTRUCTOR
    }
}