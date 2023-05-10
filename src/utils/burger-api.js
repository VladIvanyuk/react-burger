const getData = (url) => {
    return fetch(url).then(checkResponse);
}

// проверка ответа запроса
const checkResponse = (res) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
}

const postData = async (url, data) => {
    // Формируем запрос
    return fetch(url, {
      // Метод, если не указывать, будет использоваться GET
      method: 'POST',
     // Заголовок запроса
      headers: {
        'Content-Type': 'application/json'
      },
      // Данные
      body: JSON.stringify(data)
    }).then(checkResponse);

  }


export { getData, checkResponse, postData };