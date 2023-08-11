import {
  getUser,
  loginRequest,
  logout,
  registerRequest,
  updateUserRequest,
} from "../../utils/burger-api";
import { AppDispatch, AppThunkAction, TLoginUser, TRegisterUser, TUpdateUser, TUser } from "../types/types";
import { DELETE_USER, GET_USER, REGISTER_USER, SET_AUTH, SET_USER } from "../constants/constants";

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


export const registerUser: AppThunkAction = (form: TRegisterUser) => {
  return function (dispatch: AppDispatch) {
    registerRequest(form).then((res) => {
      dispatch({
        type: REGISTER_USER,
        payload: res,
      });
    });
  };
};

export const updateUser: AppThunkAction = (form: TUpdateUser) => {
  return function (dispatch: AppDispatch) {
    updateUserRequest(form).then((res) => {
      dispatch({
        type: GET_USER,
        payload: res,
      });
    });
  };
};

export const loginUser: AppThunkAction = (form: TLoginUser) => {
  return function (dispatch: AppDispatch) {
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

export const logoutUser: AppThunkAction = () => {
  return function (dispatch: AppDispatch) {
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

export const initialAuth: AppThunkAction = () => {
  return function (dispatch: AppDispatch) {
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
