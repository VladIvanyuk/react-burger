import { loginRequest } from "../../utils/burger-api";
export const LOGIN_USER = "LOGIN_USER";

export const loginUser = (form) => {
  return function (dispatch) {
    loginRequest(form).then((res) => {
        console.log(res)
        dispatch({
            type: LOGIN_USER,
            payload: res,
        })
    })
  };
};
