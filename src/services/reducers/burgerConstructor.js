const initialState = [

]

export const burgerConstructor = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_INGREDIENT':
            return {
                ...state,
                ingredients: [ 
                    ...state.ingredients,
                    action.payload
                ]
                }
            
        case 'DELETE_INGREDIENT':
            console.log(state.ingredients)
            return {
                ...state,
                ingredients: [
                    ...state.ingredients.filter((el) => {
                        console.log(el._delete_id, action.payload)
                        if(el._delete_id) {
                            return el._delete_id !== action.payload
                        } else {
                            return true
                        }
                    })
                ]
    }
        case 'SORT_INGREDIENT':
           return {
            ...state,
            ingredients: [
                ...action.payload
            ]
           }
        case 'ADD_BUN':
            return {
                ...state,
                buns: action.payload
            }
                
            
        default:
            return state;
    }
}