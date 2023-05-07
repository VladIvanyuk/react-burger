const getData = (url) => {
    return fetch(url).then(checkResponse);
}

// проверка ответа запроса
const checkResponse = (res) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
}


export { getData, checkResponse };