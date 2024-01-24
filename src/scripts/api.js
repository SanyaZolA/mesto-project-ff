// Токен: b3b0551e-0f8f-4027-b8be-a71a8ad7328d
// Идентификатор группы: wff-cohort-4

const config = {
  baseUrl: "https://mesto.nomoreparties.co/v1/wff-cohort-4",
  headers: {
    authorization: "b3b0551e-0f8f-4027-b8be-a71a8ad7328d",
    "Content-Type": "application/json",
  },
};

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
};

export const receiptUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then((res) => checkResponse(res));
};

export const updateUserInfo = (profileNames, profileWhos, profileAvatar) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: profileNames,
      about: profileWhos,
      avatar: profileAvatar,
    }),
  }).then((res) => checkResponse(res));
};

export const loadingListCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "GET",
    headers: config.headers,
  }).then((res) => checkResponse(res));
};

export const addCard = (inputNameCard, inputUrlFoto) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: inputNameCard,
      link: inputUrlFoto,
    }),
  }).then((res) => checkResponse(res));
};

export const delCard = (id) => {
  return fetch(`${config.baseUrl}/cards/${id}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => checkResponse(res));
};

export const removeLike = (id) => {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => checkResponse(res));
};

export const addLike = (id) => {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: "PUT",
    headers: config.headers,
  }).then((res) => checkResponse(res));
};

export const changeAvatar = (linkAvatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: linkAvatar.value,
    }),
  }).then((res) => checkResponse(res));
};
