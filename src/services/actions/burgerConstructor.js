import { v4 as uuidv4 } from 'uuid';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const ADD_BUN = 'ADD_BUN';
export const SORT_INGREDIENT = 'SORT_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';

export const addIngridient = (item) => {
    return {
        type: ADD_INGREDIENT,
        payload: {
            ...item, // используем `spread`, чтобы поменять ссылку на объект. Таким образом `redux` обновит его в хранилище
           _delete_id: uuidv4()  // и добавляем в объект новое поле, которое потом будет использовано в `key`
        }
    }
}
export const addBun = (bun) => {
    return {
        type: ADD_BUN,
        payload: bun,
    }
}