import { Action, ActionCreator, Dispatch } from "redux";
import {
  getUser,
  loginRequest,
  logout,
  registerRequest,
  updateUserRequest,
} from "../../utils/burger-api";
import { RootState, TLoginUser, TRegisterUser, TUpdateUser, TUser } from "../types/types";
import { DELETE_USER, GET_USER, REGISTER_USER, SET_AUTH, SET_USER } from "../constants/constants";
import { ThunkAction } from "redux-thunk";

type TSetUserAction = {
  readonly type: typeof SET_USER,
  payload: {
    user: TUser,
    accessToken: string,
    refreshToken: string
  }
}

type TSetAuthAction = {
  readonly type: typeof SET_AUTH,
  payload: boolean
}

type TRegisterUserAction = {
  readonly type: typeof REGISTER_USER,
  payload: {
    user: TUser,
    accessToken: string,
    refreshToken: string
  }
}

type TGetUserAction = {
  readonly type: typeof GET_USER,
  payload: {
    user: TUser
  }
}

type TDeleteUserAction = {
  readonly type: typeof DELETE_USER,
}

export type TUserActions = TSetUserAction
| TSetAuthAction
| TRegisterUserAction
| TGetUserAction
| TDeleteUserAction

export type UserThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TUserActions>
>;

export type UserDispatch = Dispatch<TUserActions>; 

export const registerUser: UserThunk = (form: TRegisterUser) => {
  return function (dispatch: UserDispatch) {
    registerRequest(form).then((res) => {
      dispatch({
        type: REGISTER_USER,
        payload: res,
      });
    });
  };
};

export const updateUser: UserThunk = (form: TUpdateUser) => {
  return function (dispatch: UserDispatch) {
    updateUserRequest(form).then((res) => {
      dispatch({
        type: GET_USER,
        payload: res,
      });
    });
  };
};

export const loginUser: UserThunk = (form: TLoginUser) => {
  return function (dispatch: UserDispatch) {
    loginRequest(form).then((res) => {
      if (res.success) {
        dispatch({
          type: SET_USER,
          payload: res,
        });

        dispatch({
          type: SET_AUTH,
          payload: true,
        });
      }
    });
  };
};

export const logoutUser: UserThunk = () => {
  return function (dispatch: UserDispatch) {
    logout().then(() => {
      if (
        localStorage.getItem("accessToken") &&
        localStorage.getItem("refreshToken")
      ) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      }

      dispatch({
        type: DELETE_USER,
      });
    });
  };
};

export const initialAuth: UserThunk = () => {
  return function (dispatch: UserDispatch) {
    if (localStorage.getItem("accessToken")) {
      getUser().then((res) => {
        dispatch({
          type: GET_USER,
          payload: res,
        });
        dispatch({
          type: SET_AUTH,
          payload: true,
        });
      });
    } else {
      dispatch({
        type: SET_AUTH,
        payload: true,
      });
    }
  };
};
