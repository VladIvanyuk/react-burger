import { TOrderDetailsActions } from "../actions/orderDetails";
import {
  GET_ORDER_DETAILS,
  GET_ORDER_DETAILS_FAILED,
  GET_ORDER_DETAILS_SUCCESS,
  DELETE_ORDER_DETAILS,
} from "../constants/constants";
import { TIngredient, TOrderOwner } from "../types/types";

export type TOrderDetailsState = {
  details: {
    success: boolean;
    name: string;
    order: {
      owner: TOrderOwner;
      ingredients: TIngredient[];
      number: string;
      _id: string;
      status: string;
      name: string;
      createdAt: string;
      updatedAt: string;
      price: number;
    };
  };
  isOrderError: boolean;
  isOrderLoaded: boolean;
};

export const orderDetailsIState = {
  details: {
    success: false,
    name: "",
    order: {
      owner: {
        name: "",
        email: "",
        createdAt: "",
        updatedAt: "",
      },
      ingredients: [],
      number: '',
      _id: '',
      status: '',
      name: '',
      createdAt: '',
      updatedAt: '',
      price: 0
    },
  },
  isOrderError: false,
  isOrderLoaded: false,
};

export const orderDetails = (
  state: TOrderDetailsState = orderDetailsIState,
  action: TOrderDetailsActions
) => {
  switch (action.type) {
    case GET_ORDER_DETAILS:
      return {
        ...state,
        isOrderLoaded: false,
        isOrderError: false,
      };
    case GET_ORDER_DETAILS_SUCCESS:
      return {
        ...state,
        details: action.details,
        isOrderLoaded: true,
      };

    case GET_ORDER_DETAILS_FAILED:
      return {
        ...state,
        isOrderError: true,
      };
    case DELETE_ORDER_DETAILS:
      return orderDetailsIState;
    default:
      return state;
  }
};
