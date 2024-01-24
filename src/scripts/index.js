import "../pages/index.css";
import { placesList, createNewPost } from "./card.js";
import { openPopup, closePopup } from "./modal.js";
import { enableValidation, clearValidation } from "./validation.js";
import {
  receiptUserInfo,
  updateUserInfo,
  loadingListCards,
  addCard,
  changeAvatar,
} from "./api.js";

const content = document.querySelector(".content");
const popupProfile = document.querySelector(".popup_type_edit"); // присваивание элементов для попап профиля.
const popupAddFoto = document.querySelector(".popup_type_new-card"); // присваивание элементов для попап картинок.
const popupAvatar = document.querySelector(".popup_change-avatar"); // присваивание элементов для попап профиля.
const popupZoom = document.querySelector(".popup_type_image"); // присваивание элементов для открытия картинки.

// //----------------------------------НАХОЖДЕНИЕ КНОПОК---------------------------------------------------------------------------
const buttonEditPopupProfile = content.querySelector(".profile__edit-button"); // открытие редактирования профиля.
const buttonOpenPopupAddFoto = content.querySelector(".profile__add-button"); // открытие добавления картинки.
const closeButtons = document.querySelectorAll(".popup__close-button"); // вешаем закрытие крестик на переменную

// //----------------------------------НАХОЖДЕНИЕ ФОРМ-----------------------------------------------------------------------------
const formEditProfile = popupProfile.querySelector(".popup__form"); // форма ввода редактирования профиля.
const formAddFoto = popupAddFoto.querySelector(".popup__form"); // форма ввода информации новой картинки

// //----------------------------------НАХОЖДЕНИЕ ИНПУТОВ ДЛЯ ВВОДА ИНФОРМАЦИИ-----------------------------------------------------
const inputNameProfile = popupProfile.querySelector(
  ".popup__input_type_profile-name"
); // ввод имени в попап профиля.
const inputAboutProfile = popupProfile.querySelector(
  ".popup__input_type_profile-about"
); // ввод 'о себе' в попап профиля.
const inputNameCard = popupAddFoto.querySelector(
  ".popup__input_type_card-name"
); // ввод название в попап картинок.
const inputUrlFoto = popupAddFoto.querySelector(".popup__input_type_url"); // ввод ссылки в попап картинок.

// //----------------------------------НАХОЖДЕНИЕ ПОЛЕЙ ВВОДА ДЛЯ РЕДАКТИРОВАНИЯ---------------------------------------------------
const profileName = content.querySelector(".profile__title"); // ввод имени в попап профиля.
const profileWho = content.querySelector(".profile__description"); // ввод 'о себе' в попап профиля.

// //----------------------------------НАХОЖДЕНИЕ КАРТИНОК/ТЕКСТА ДЛЯ ЗУМА----------------------------------------------------------------
const imageZoom = popupZoom.querySelector(".popup__image"); // для зума ищем элемент картинки
const signatureZoom = popupZoom.querySelector(".popup__caption"); // для зума ищем элемент подписи

// //----------------------------------НАХОЖДЕНИЕ ПОЛЕЙ ВВОДА ДЛЯ СМЕНЫ АВАТАРА---------------------------------------------------
const editAvatar = document.querySelector(".profile__image");
const avatarStyles = editAvatar.style;
const avatarFormElement = document.querySelector("#popupAvatar");
const linkAvatar = avatarFormElement.querySelector("#url__input");
let userID;

// //----------------------------------ОТКРЫТИЕ ПОПАПОВ ПРОФИЛЯ И КАРТИНОК------------------------------------------------

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

Promise.all([receiptUserInfo(), loadingListCards()])
  .then(([profile, card]) => {
    profileName.textContent = profile.name;
    profileWho.textContent = profile.about;
    let linkAvatar = profile.avatar;
    avatarStyles.backgroundImage = `url('${linkAvatar}')`;
    userID = profile._id;
    initializeList(card);
  })
  .catch((err) => {
    console.log(err);
  });

function initializeList(list) {
  // создаётся список картинок для отображения на странице.
  list.forEach(function (item) {
    const onePost = createNewPost(
      item,
      item.name,
      item.link,
      item.likes,
      item._id,
      userID,
      openZoomPopup
    );
    placesList.append(onePost); // каждая картинки ставится в начало листа template.
  });
}

function openPopupProfile() {
  // функция открытия заполненого профиля.
  inputNameProfile.value = profileName.textContent; // что в html добавляется в имя
  inputAboutProfile.value = profileWho.textContent;
  openPopup(popupProfile);
  clearValidation(popupProfile, validationConfig);
}

buttonEditPopupProfile.addEventListener("click", () => {
  openPopupProfile();
});

buttonOpenPopupAddFoto.addEventListener("click", () => {
  openPopup(popupAddFoto), clearValidation(popupAddFoto, validationConfig);
});

function saveProfilePopup(evt) {
  evt.preventDefault();
  const button = popupProfile.querySelector(".popup__button");
  renderLoading(true, button);
  updateUserInfo(inputNameProfile.value, inputAboutProfile.value)
    .then((data) => {
      profileName.textContent = data.name;
      profileWho.textContent = data.about;
      closePopup(popupProfile);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, button);
    });
}

formEditProfile.addEventListener("submit", saveProfilePopup); // на форму вешаем событие(сохранить данные) при 'отправить'.

closeButtons.forEach((button) => {
  // автоматическая обработка кнопок закрытия 'крест '
  const popup = button.closest(".popup");
  button.addEventListener("click", () => {
    closePopup(popup);
  });
});

avatarFormElement.addEventListener("sudmit", () => closePopup(popupAvatar));
editAvatar.addEventListener("click", () => {
  openPopup(popupAvatar), clearValidation(popupAvatar, validationConfig);
});

function handleEditAvatar(evt) {
  evt.preventDefault();
  const button = popupAvatar.querySelector(".popup__button");
  renderLoading(true, button);
  changeAvatar(linkAvatar)
    .then((data) => {
      (avatarStyles.backgroundImage = `url('${data.avatar}')`),
        avatarFormElement.reset(),
        closePopup(popupAvatar);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, button);
    });
}

avatarFormElement.addEventListener("submit", handleEditAvatar);

function handleAddFormSubmit(evt) {
  evt.preventDefault();
  const button = popupAddFoto.querySelector(".popup__button");
  renderLoading(true, button);
  addCard(inputNameCard.value, inputUrlFoto.value)
    .then((data) => {
      placesList.prepend(
        createNewPost(
          data,
          data.name,
          data.link,
          data.likes,
          data._id,
          userID,
          openZoomPopup
        )
      );
      closePopup(popupAddFoto);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, button);
    });
  inputNameCard.value = "";
  inputUrlFoto.value = "";
}

formAddFoto.addEventListener("submit", handleAddFormSubmit); // вешаем событие(закрыть) на событие 'sudmit' - отправка фото в список

export function renderLoading(isLoading, button) {
  if (isLoading) {
    button.textContent = "Сохранить...";
  } else {
    button.textContent = "Сохранить";
  }
}

function openZoomPopup(evt) {
  // функция для открытия зума
  imageZoom.src = evt.target.src; // берет ссылку из определенного поста (кликнутого);
  imageZoom.alt = evt.target.alt; // берет ссылку из определенного поста (кликнутого);
  signatureZoom.textContent = evt.target.alt; // берет текст для зума из определенного поста (кликнутого);
  openPopup(popupZoom); // и собственно открываем.
}
enableValidation(validationConfig);
