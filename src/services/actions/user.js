import {
  getUser,
  loginRequest,
  logout,
  registerRequest,
  updateUserRequest,
} from "../../utils/burger-api";
export const SET_USER = "SET_USER";
export const SET_AUTH = "SET_AUTH";
export const REGISTER_USER = "REGISTAER_USER";
export const GET_USER = "GET_USER";
export const DELETE_USER = "DELETE_USER";
export const UPDATE_USER = "UPDATE_USER";

export const registerUser = (form) => {
  return function (dispatch) {
    registerRequest(form).then((res) => {
      console.log(res);
      dispatch({
        type: REGISTER_USER,
        payload: res,
      });
    });
  };
};

export const updateUser = (form) => {
  return function (dispatch) {
    updateUserRequest(form).then((res) => {
      console.log(res);
      dispatch({
        type: GET_USER,
        payload: res,
      });
    });
  };
};

export const loginUser = (form) => {
  return function (dispatch) {
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

export const logoutUser = () => {
  return function (dispatch) {
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

export const initialAuth = () => {
  return function (dispatch) {
    if (localStorage.getItem("accessToken")) {
      getUser().then((res) => {
        console.log(res);
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

