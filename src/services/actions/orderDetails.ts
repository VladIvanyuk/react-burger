import { requestWithRefresh } from "../../utils/burger-api";
import {
  AppDispatch,
  AppThunkAction,
  TIngredient,
  TIngredientsIdList,
} from "../types/types";
import {
  DELETE_ORDER_DETAILS,
  GET_ORDER_DETAILS,
  GET_ORDER_DETAILS_FAILED,
  GET_ORDER_DETAILS_SUCCESS,
} from "../constants/constants";

export type TGetOrderDetailsAction = {
  readonly type: typeof GET_ORDER_DETAILS;
};

export type TGetOrderDetailsSuccessAction = {
  readonly type: typeof GET_ORDER_DETAILS_SUCCESS;
  details: unknown;
};

export type TGetOrderDetailsFailedAction = {
  readonly type: typeof GET_ORDER_DETAILS_FAILED;
};

export type TDeleteOrderDetailsAction = {
  readonly type: typeof DELETE_ORDER_DETAILS;
};

export type TOrderDetailsActions =
  | TGetOrderDetailsAction
  | TGetOrderDetailsFailedAction
  | TGetOrderDetailsSuccessAction
  | TDeleteOrderDetailsAction;

export const getOrderDetailsAction = () => {
  return {
    type: GET_ORDER_DETAILS,
  };
};

export const getOrderDetailsSuccesAction = (data: TIngredient) => {
  return {
    type: GET_ORDER_DETAILS_SUCCESS,
    details: data,
  }
}

export const getOrderDetailsFailedAction = () => {
  return {
    type: GET_ORDER_DETAILS_FAILED,
  }
}

export const deleteOrderDetailsAction = () => {
  return {
    type: DELETE_ORDER_DETAILS
  }
}

export const getOrderDetails: AppThunkAction = (idList: TIngredientsIdList) => {
  return function (dispatch: AppDispatch) {
    dispatch(getOrderDetailsAction());

    requestWithRefresh("orders", {
      // Метод, если не указывать, будет использоваться GET
      method: "POST",
      // Заголовок запроса
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("accessToken"),
      },
      // Данные
      body: JSON.stringify(idList),
    })
      .then((data) => {
        dispatch(getOrderDetailsSuccesAction(data))
      }
      )
      .catch((err) => {
        dispatch(getOrderDetailsFailedAction);
      });
  };
};
