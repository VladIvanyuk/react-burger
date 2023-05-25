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
                ...state.filter((el) => {
                    if(el._delete_id) {
                        return el._delete_id !== action.payload
                    } else {
                        return true
                    }
                })
            ]
        case 'ADD_BUN':
            return [
                ...state.filter((el) => el.type !== 'bun'),
                action.payload
            ]
        default:
            return state;
    }
}