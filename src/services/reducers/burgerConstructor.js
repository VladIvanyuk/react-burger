const initialState = [

]

export const burgerConstructor = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_INGREDIENT':
            return [
                ...state,
                action.payload
            ]
        default:
            return state;
    }
}