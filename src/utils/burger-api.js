const DATA_URL = "https://norma.nomoreparties.space/api";

const request = (endpoint, options) => {
  const DATA_URL = "https://norma.nomoreparties.space/api";
  return fetch(`${DATA_URL}/${endpoint}`, options).then(checkResponse);
}

// проверка ответа запроса
const checkResponse = (res) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
}

export { checkResponse, request, DATA_URL };