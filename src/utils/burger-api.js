const DATA_URL = "https://norma.nomoreparties.space/api";

const getData = () => {
    return fetch(`${DATA_URL}/ingredients`).then(checkResponse);
}

// проверка ответа запроса
const checkResponse = (res) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
}

const postData = async (data) => {
    // Формируем запрос
    return fetch(`${DATA_URL}/orders`, {
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