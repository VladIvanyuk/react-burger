const initialState = {};

export const ingredientDetails = (state = initialState, action) => {
    switch(action.type) {
        case 'ON_CLICK_INGREDIENT':
            return {
                ...action.ingredient
            }
        case 'DELETE_DETAILS':
            return {}
        default:
            return state;
    }
}