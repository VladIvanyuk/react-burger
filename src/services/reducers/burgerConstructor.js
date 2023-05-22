const initialState = [

]

export const burgerConstructor = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_INGREDIENT':
            return [
                ...state,
                action.payload
            ]
        case 'ADD_BUN':
            console.log(action.payload)
            return [
                ...state.filter((el) => el.type !== 'bun'),
                action.payload
            ]
        default:
            return state;
    }
}