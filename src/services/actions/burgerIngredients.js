import { getData } from "../../utils/burger-api";

export const getBurgerIngredients = () => {
    return function(dispatch) {
        getData().then((res) => {
            // добавляем IDшники для удаления
            const dataWithDeleteId = res.data.map((el) => {
                return {
                    ...el,
                    _delete_id: Math.random()
                }
            })
            dispatch({
                type: 'GET_INGREDIENTS',
                data: dataWithDeleteId
            })
        }).catch((err) => {
            dispatch({
                type: 'GET_INGREDIENTS_REQUEST_FAILED'
            })
        })
    }
}