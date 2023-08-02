import { Identifier } from "dnd-core";
import { store } from "../store";
import { Action, ActionCreator, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { TIngredientListActions } from "../actions/burgerIngredients";
import { TOrderDetailsActions } from "../actions/orderDetails";
import { TUserActions } from "../actions/user";
import { TFeedActions } from "../actions/wsFeed";

export type RootState = ReturnType<typeof store.getState>;

// THUNK
export type TAppActions = TIngredientListActions | TOrderDetailsActions | TUserActions | TFeedActions;
export type AppThunkAction<TReturn = void> = ActionCreator<ThunkAction<TReturn, Action, RootState, TAppActions>>;
export type TDispatchActions = TAppActions | AppThunkAction | TFeedActions;
export type AppDispatch = Dispatch<TAppActions>;
// THUNK

export enum WebsocketStatus {
  CONNECTING = 'CONNECTING...',
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE'
}

export type TModal = {
  onShowModal: (value: boolean) => void;
  modalHeaderText: string;
};

export type TRegisterUser = {
  email: string;
  name: string;
  password: string;
};

export type TResetPasswordRequest = {
  password: string,
  token: string
}

export type TUser = {
  email: string,
  name: string
}

export type TUpdateUser = TRegisterUser;

export type TIngredient = {
  readonly _id: string;
  uniqueId?: string | undefined;
  readonly name: string;
  readonly type: string;
  readonly proteins: number;
  readonly fat: number;
  readonly carbohydrates: number;
  readonly calories: number;
  readonly price: number;
  readonly image: string;
  readonly image_mobile: string;
  readonly image_large: string;
  readonly __v?: number;
};

export type TBorders = {
  buns: boolean;
  mains: boolean;
};

export type TLocation = {
  hash: string;
  key: string;
  pathname: string;
  search: string;
  state: any;
};

export type TRequestOptions = {
  method?: string;
  headers: {
    "Content-Type": string;
    authorization: string | null;
  };
  body?: string;
};

export type TConstructorList<T> = {
  buns: T;
  ingredients: T[];
};

export type TOrderDetails = {
  orderNumber: string;
};

export type TSmallIngredient = {
  readonly name: string;
  readonly type: string;
  readonly price: number;
  readonly image: string;
  readonly id: string;
  readonly onFindCurrentIngredient: (id: string) => void;
};

export type TConstructorIngredient = {
  readonly name: string;
  readonly type: string;
  readonly price: number;
  readonly image: string;
  uniqueId: string | undefined;
  readonly moveCard: (dragIndex: number, hoverIndex: number) => void;
  index: number;
};

export type TDragObj = {
  index: number;
  action?: string;
  type?: string;
  id?: string;
  setIngredientCounter: (prev: any) => number;
};

export type TProtectedRouteElement = {
  component: JSX.Element;
  onlyUnAuth: boolean;
};

export type TDragObjWithoutCounter = Omit<TDragObj, "setIngredientCounter">;

export type TDragCollectedProps = {
  isDragging: boolean;
};

export type TTabs = {
  text: string;
  code: string;
};

export type TIngredientsIdList = {
  ingredients: string[];
};

export type TIngredientsList<T> = {
  ingredientsInfo: T[];
  name: string;
  id: string;
};

export type TDropCollectedProps = {
  handlerId: Identifier | null;
};

export interface IRequestOptions extends RequestInit {
  headers: {
    "Content-Type": string,
    authorization: any,
  },
}

export type TLoginUser = Omit<TRegisterUser, "name">;
