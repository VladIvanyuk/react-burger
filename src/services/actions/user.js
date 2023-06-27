import { loginRequest, registerRequest } from "../../utils/burger-api";
export const SET_USER = "SET_USER";
export const SET_AUTH = "SET_AUTH";
export const REGISTER_USER = "REGISTAER_USER";

export const registerUser = (form) => {
  return function (dispatch) {
    registerRequest("auth/register", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(form),
    }).then((res) => {
      console.log(res);
      dispatch({
        type: REGISTER_USER,
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
