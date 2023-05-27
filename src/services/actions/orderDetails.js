import { postData } from "../../utils/burger-api";
export const GET_ORDER_DETAILS = 'GET_ORDER_DETAILS';

export const getOrderDetails = (idList) => {
    return function(dispatch) {
        postData(idList).then((data) => dispatch({
            type: GET_ORDER_DETAILS,
            details: data
        }))
    }
}