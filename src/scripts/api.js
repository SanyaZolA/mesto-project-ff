
import { renderLoading } from "./index";
// Токен: b3b0551e-0f8f-4027-b8be-a71a8ad7328d
// Идентификатор группы: wff-cohort-4

const config = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-4',
  headers: {
    authorization: 'b3b0551e-0f8f-4027-b8be-a71a8ad7328d',
    'Content-Type': 'application/json'
  }
}


export const userInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status} при добавлении лайка`).catch(
      (err) => {
        console.log(err);
      }
    );
  });
};

export const updateUserInfo = (profileName, profileWho, profileAvatar) => {
  fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: profileName,
      about: profileWho,
      avatar: profileAvatar,
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка ${res.status} при добавлении лайка`);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false);
    });
};

export const initialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "GET",
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status} при добавлении лайка`).catch(
      (err) => {
        console.log(err);
      }
    );
  });
};

export const addCard = (inputNameCard, inputUrlFoto) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: inputNameCard,
      link: inputUrlFoto,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status} при добавлении лайка`).catch(
      (err) => {
        console.log(err);
      }
    );
  });
};

export const DelCard = (id) => {
  return fetch(`${config.baseUrl}/cards/${id}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status} при добавлении лайка`).catch(
      (err) => {
        console.log(err);
      }
    );
  });
};

export const removeLike = (id) => {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status} при добавлении лайка`).catch(
      (err) => {
        console.log(err);
      }
    );
  });
};

export const addLike = (id) => {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: "PUT",
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status} при добавлении лайка`).catch(
      (err) => {
        console.log(err);
      }
    );
  });
};

export const changeAvatar = (linkAvatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: linkAvatar.value,
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка ${res.status} при изменении аватара`).catch(
        (err) => {
          console.log(err);
        }
      );
    })
    .finally(() => {
      renderLoading(false);
    });
};
