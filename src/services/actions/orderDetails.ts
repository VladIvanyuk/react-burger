import { requestWithRefresh } from "../../utils/burger-api";
import { AppDispatch, AppThunkAction, TIngredientsIdList } from "../types/types";
import { DELETE_ORDER_DETAILS, GET_ORDER_DETAILS, GET_ORDER_DETAILS_FAILED, GET_ORDER_DETAILS_SUCCESS } from "../constants/constants";

export type TGetOrderDetailsAction = {
  readonly type: typeof GET_ORDER_DETAILS
}

export type TGetOrderDetailsSuccessAction = {
  readonly type: typeof GET_ORDER_DETAILS_SUCCESS,
  details: unknown
}

export type TGetOrderDetailsFailedAction = {
  readonly type: typeof GET_ORDER_DETAILS_FAILED,
}

export type TDeleteOrderDetailsAction = {
  readonly type: typeof DELETE_ORDER_DETAILS,
}

export type TOrderDetailsActions = TGetOrderDetailsAction 
| TGetOrderDetailsFailedAction 
| TGetOrderDetailsSuccessAction 
| TDeleteOrderDetailsAction


export const getOrderDetails: AppThunkAction = (idList: TIngredientsIdList) => {
  return function (dispatch: AppDispatch) {
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
