const DATA_URL = "https://norma.nomoreparties.space/api";

// проверка ответа запроса
const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
}

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

const requestWithRefresh = async (url, options) => {
  try {
    const res = await fetch(`${DATA_URL}/${url}`, options);
    return await checkResponse(res);
  } catch (err) {
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
}

const getUser = () => {
  return requestWithRefresh('auth/user', {
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      authorization: localStorage.getItem('accessToken')
    }
  })
}

const logout = () => {
  return request('auth/logout', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    })
  })
}

const loginRequest = (form) => {
  return request("auth/login", {
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
  })
}

const registerRequest = (form) => {
  return request("auth/register", {
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
  })
}

const request = (endpoint, options) => {
  const DATA_URL = "https://norma.nomoreparties.space/api";
  return fetch(`${DATA_URL}/${endpoint}`, options).then(checkResponse);
}

export { checkResponse, requestWithRefresh, request, loginRequest, registerRequest, getUser, logout, DATA_URL };