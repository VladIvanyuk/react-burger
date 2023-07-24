import { Dispatch } from "redux";
import {
  getUser,
  loginRequest,
  logout,
  registerRequest,
  updateUserRequest,
} from "../../utils/burger-api";
import { TLoginUser, TRegisterUser, TUpdateUser } from "../types/types";
import { DELETE_USER, GET_USER, REGISTER_USER, SET_AUTH, SET_USER } from "../constants/constants";

export const registerUser = (form: TRegisterUser): any => {
  return function (dispatch: Dispatch) {
    registerRequest(form).then((res) => {
      dispatch({
        type: REGISTER_USER,
        payload: res,
      });
    });
  };
};

export const updateUser = (form: TUpdateUser): any => {
  return function (dispatch: Dispatch) {
    updateUserRequest(form).then((res) => {
      console.log(res);
      dispatch({
        type: GET_USER,
        payload: res,
      });
    });
  };
};

export const loginUser = (form: TLoginUser): any => {
  return function (dispatch: Dispatch) {
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

export const logoutUser = (): any => {
  return function (dispatch: Dispatch) {
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

export const initialAuth = (): any => {
  return function (dispatch: Dispatch) {
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
