import { request } from "../../utils/burger-api";
export const REGISTER_USER = "REGISTER_USER";
export const LOGIN_USER = "LOGIN_USER";

export const registerUser = (form) => {
  return function (dispatch) {
    request("auth/register", {
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
        console.log(res)
        dispatch({
            type: REGISTER_USER,
            payload: res,
        })
    })
  };
};

export const loginUser = (form) => {
  return function (dispatch) {
    request("auth/login", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify({
        "email": form.email, 
        "password": form.password 
      } ),
    }).then((res) => {
        console.log(res)
        dispatch({
            type: LOGIN_USER,
            payload: res,
        })
    })
  };
};
