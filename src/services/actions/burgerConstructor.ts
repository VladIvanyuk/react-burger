import { v4 as uuidv4 } from 'uuid';
import { TIngredient } from '../types/types';
import { ADD_BUN, ADD_INGREDIENT } from '../constants/constants';

export const addIngridient = (item: TIngredient) => {
    return {
        type: ADD_INGREDIENT,
        payload: {
            ...item, // используем `spread`, чтобы поменять ссылку на объект. Таким образом `redux` обновит его в хранилище
           uniqueId: uuidv4()  // и добавляем в объект новое поле, которое потом будет использовано в `key`
        }
    }
}
export const addBun = (bun: TIngredient) => {
    return {
        type: ADD_BUN,
        payload: bun,
    }
}