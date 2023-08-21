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

export const registerUserAction = (res: any) => {
  return {
    type: REGISTER_USER,
    payload: res,
  }
}

export const setUserAction = (res: any) => {
  return {
    type: SET_USER,
    payload: res,
  }
}

export const getUserAction = (res: any) => {
  return {
    type: GET_USER,
    payload: res,
  }
}

export const setAuthAction = () => {
  return {
    type: SET_AUTH,
    payload: true,
  }
}

export const deleteUserAction = () => {
  return {
    type: DELETE_USER,
  }
}

export const registerUser: AppThunkAction = (form: TRegisterUser) => {
  return function (dispatch: AppDispatch) {
    registerRequest(form).then((res) => {
      dispatch(registerUserAction(res));
    });
  };
};

export const updateUser: AppThunkAction = (form: TUpdateUser) => {
  return function (dispatch: AppDispatch) {
    updateUserRequest(form).then((res) => {
      dispatch(getUserAction(res));
    });
  };
};

export const loginUser: AppThunkAction = (form: TLoginUser) => {
  return function (dispatch: AppDispatch) {
    loginRequest(form).then((res) => {
      if (res.success) {
        dispatch(setUserAction(res));

        dispatch(setAuthAction());
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

      dispatch(deleteUserAction());
    });
  };
};

export const initialAuth: AppThunkAction = () => {
  return function (dispatch: AppDispatch) {
    if (localStorage.getItem("accessToken")) {
      getUser().then((res) => {
        dispatch(getUserAction(res));
        dispatch(setAuthAction());
      });
    } else {
      dispatch(setAuthAction());
    }
  };
};
