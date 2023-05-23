const initialState = [

]

export const burgerConstructor = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_INGREDIENT':
            return [
                ...state,
                action.payload
            ]
        case 'DELETE_INGREDIENT':
            return [
                ...state.filter((el) => el._id !== action.payload._id)
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