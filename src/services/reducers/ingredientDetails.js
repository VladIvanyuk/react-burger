const initialState = {};

export const ingredientDetails = (state = initialState, action) => {
    switch(action.type) {
        case 'ON_CLICK_INGREDIENT':
            return {
                ...action.ingredient
            }
        default:
            return state;
    }
}