import { request } from "../../utils/burger-api";
export const GET_ORDER_DETAILS = "GET_ORDER_DETAILS";
export const GET_ORDER_DETAILS_SUCCESS = "GET_ORDER_DETAILS_SUCCESS";
export const GET_ORDER_DETAILS_FAILED = "GET_ORDER_DETAILS_FAILED";
export const DELETE_ORDER_DETAILS = "DELETE_ORDER_DETAILS";

export const getOrderDetails = (idList) => {
  return function (dispatch) {
    dispatch({
        type: GET_ORDER_DETAILS
    })

    request("orders", {
      // Метод, если не указывать, будет использоваться GET
      method: "POST",
      // Заголовок запроса
      headers: {
        "Content-Type": "application/json",
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
