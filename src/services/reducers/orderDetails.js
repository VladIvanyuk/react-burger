export const orderDetails = (state = {}, action) => {
    switch(action.type) {
        case 'GET_ORDER_DETAILS':
            console.log('GEEEEt')
            return {
                ...action.details
            }
        default: 
            return state;
    }
}