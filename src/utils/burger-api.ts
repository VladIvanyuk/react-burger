import {
  IRequestOptions,
  TLoginUser,
  TRegisterUser,
  TResetPasswordRequest,
  TUpdateUser,
} from "../services/types/types";

const DATA_URL: string = "https://norma.nomoreparties.space/api";

// проверка ответа запроса
const checkResponse = (res: Response) => {
  return res.ok
    ? res.json()
    : res.json().then((err: Error) => Promise.reject(err));
};

const refreshToken = () => {
  return fetch(`${DATA_URL}/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  }).then(checkResponse);
};



const requestWithRefresh = async (url: string, options: IRequestOptions) => {
  try {
    const res = await fetch(`${DATA_URL}/${url}`, options);
    return await checkResponse(res);
  } catch (err: any) {
    if (err.message === "jwt expired") {
      const refreshData = await refreshToken(); //обновляем токен
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      localStorage.setItem("accessToken", refreshData.accessToken);
      options.headers.authorization = refreshData.accessToken;
      const res = await fetch(url, options); //повторяем запрос
      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};

const getUser = () => {
  return requestWithRefresh("auth/user", {
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      authorization: localStorage.getItem("accessToken"),
    },
  });
};

const logout = () => {
  return request("auth/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  });
};

const loginRequest = (form: TLoginUser) => {
  return request("auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: form.email,
      password: form.password,
    }),
  });
};

const checkEmailForResetPassword = (email: string) => {
  return request("password-reset", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
    }),
  });
};

const resetPasswordRequest = (data: TResetPasswordRequest) => {
  return request("password-reset/reset", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password: data.password,
      token: data.token,
    }),
  });
};

const updateUserRequest = (form: TUpdateUser) => {
  return requestWithRefresh("auth/user", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      authorization: localStorage.getItem("accessToken"),
    },
    body: JSON.stringify({
      name: form.name,
      email: form.email,
      password: form.password,
    }),
  });
};

const registerRequest = (form: TRegisterUser) => {
  return request("auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  });
};

const request = (endpoint: string, options: RequestInit) => {
  return fetch(`${DATA_URL}/${endpoint}`, options).then(checkResponse);
};

export {
  checkResponse,
  requestWithRefresh,
  request,
  loginRequest,
  registerRequest,
  getUser,
  logout,
  updateUserRequest,
  checkEmailForResetPassword,
  resetPasswordRequest,
  DATA_URL,
};
