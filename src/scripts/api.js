import { cardTemplate } from "./card";

// Токен: b3b0551e-0f8f-4027-b8be-a71a8ad7328d
// Идентификатор группы: wff-cohort-4


export const userInfo = (profileName, profileWho) => {
  fetch('https://mesto.nomoreparties.co/v1/wff-cohort-4/users/me', {
    headers: {
      authorization: 'b3b0551e-0f8f-4027-b8be-a71a8ad7328d'
    }
  })
    .then(res => res.json())
    .then((result) => {
      profileName.textContent = result.name,
      profileWho.textContent = result.about;  
    });
  }

export const updateUserInfo = (profileName, profileWho) => {
  fetch('https://mesto.nomoreparties.co/v1/wff-cohort-4/users/me', {
  method: 'PATCH',  
  headers: {
      authorization: 'b3b0551e-0f8f-4027-b8be-a71a8ad7328d',
      'Content-Type': 'application/json'
    },
  body: JSON.stringify({
    name: profileName,
    about: profileWho
  })
})
    .then(res => res.json())
}

export const initialCards = () => {
  return fetch('https://mesto.nomoreparties.co/v1/wff-cohort-4/cards', {
    method: 'GET',
    headers: {
      authorization: 'b3b0551e-0f8f-4027-b8be-a71a8ad7328d',
      'Content-Type': 'application/json'
    }
  })
.then(res => res.json())
};


export const addCard = (inputNameCard, inputUrlFoto) => {
  fetch('https://mesto.nomoreparties.co/v1/wff-cohort-4/cards', {
  method: 'POST',  
  headers: {
      authorization: 'b3b0551e-0f8f-4027-b8be-a71a8ad7328d',
      'Content-Type': 'application/json'
    },
  body: JSON.stringify({
    name: inputNameCard,
    link: inputUrlFoto,
  })
}) 
}

// fetch('https://nomoreparties.co/v1/wff-cohort-4/cards/likes/65a9acae836f42661f8cf7ec', {
//   method: 'PUT',
//   headers: {
//           authorization: 'b3b0551e-0f8f-4027-b8be-a71a8ad7328d',
//           'Content-Type': 'application/json'
//         }
//     }) 


export const DelCard = (id) => {
  fetch(`https://mesto.nomoreparties.co/v1/wff-cohort-4/cards/${id}`, {
    method: 'DELETE',  
    headers: {
        authorization: 'b3b0551e-0f8f-4027-b8be-a71a8ad7328d',
        'Content-Type': 'application/json'
      }
  }) 
}
