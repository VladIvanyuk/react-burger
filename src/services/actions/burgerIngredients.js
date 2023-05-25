import { getData } from "../../utils/burger-api";

export const getBurgerIngredients = () => {
    return function(dispatch) {
        getData().then((res) => {
            dispatch({
                type: 'GET_INGREDIENTS',
                data: res.data
            })
        }).catch((err) => {
            dispatch({
                type: 'GET_INGREDIENTS_REQUEST_FAILED'
            })
        })
    }
}