import { Dispatch } from "redux";
import { requestWithRefresh } from "../../utils/burger-api";
import { TIngredientsIdList } from "../../types/types";
export const GET_ORDER_DETAILS = "GET_ORDER_DETAILS";
export const GET_ORDER_DETAILS_SUCCESS = "GET_ORDER_DETAILS_SUCCESS";
export const GET_ORDER_DETAILS_FAILED = "GET_ORDER_DETAILS_FAILED";
export const DELETE_ORDER_DETAILS = "DELETE_ORDER_DETAILS";

export const getOrderDetails = (idList: TIngredientsIdList): any => {
  return function (dispatch: Dispatch) {
    dispatch({
        type: GET_ORDER_DETAILS
    })

    requestWithRefresh("orders", {
      // Метод, если не указывать, будет использоваться GET
      method: "POST",
      // Заголовок запроса
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem('accessToken')
      },
      // Данные
      body: JSON.stringify(idList),
    }).then((data) =>
      dispatch({
        type: GET_ORDER_DETAILS_SUCCESS,
        details: data,
      })
    ).catch((err) => {
        dispatch({
            type: GET_ORDER_DETAILS_FAILED
        })
    })
  };
};
