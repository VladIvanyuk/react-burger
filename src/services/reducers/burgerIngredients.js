const initialState = {
    data: [],
    isLoaded: false,
    isError: false
  }

export const burgerIngredients = (state = initialState, action) => {
    switch(action.type) {
        case 'GET_INGREDIENTS':
            return {
                ...state,
                data: action.data,
                isLoaded: true,
            }

        case 'GET_INGREDIENTS_REQUEST_FAILED':
            return {
                ...state,
                isError: true,
            }
        default: 
        return state;
    }
}