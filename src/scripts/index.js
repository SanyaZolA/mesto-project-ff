import '../pages/index.css';
import { placesList, createNewPost } from './card.js'; 
import { openPopup, closePopup } from "./modal.js";
import { enableValidation, clearValidation } from './validation.js';
import { userInfo, updateUserInfo, initialCards, addCard, changeAvatar} from './api.js';

const content = document.querySelector('.content');
const popupProfile = document.querySelector('.popup_type_edit');               // присваивание элементов для попап профиля.
const popupAddFoto = document.querySelector('.popup_type_new-card');           // присваивание элементов для попап картинок.
const popupAvatar = document.querySelector('.popup_change-avatar');            // присваивание элементов для попап профиля.

// //----------------------------------НАХОЖДЕНИЕ КНОПОК---------------------------------------------------------------------------
const buttonEditPopupProfile = content.querySelector('.profile__edit-button'); // открытие редактирования профиля.
const buttonOpenPopupAddFoto = content.querySelector('.profile__add-button');  // открытие добавления картинки.
const closeButtons = document.querySelectorAll('.popup__close-button');        // вешаем закрытие крестик на переменную

// //----------------------------------НАХОЖДЕНИЕ ФОРМ-----------------------------------------------------------------------------
const formEditProfile = popupProfile.querySelector('.popup__form');            // форма ввода редактирования профиля.
const formAddFoto = popupAddFoto.querySelector('.popup__form');                // форма ввода информации новой картинки

// //----------------------------------НАХОЖДЕНИЕ ИНПУТОВ ДЛЯ ВВОДА ИНФОРМАЦИИ-----------------------------------------------------
const inputNameProfile = popupProfile.querySelector('.popup__input_type_profile-name');          // ввод имени в попап профиля.
const inputAboutProfile = popupProfile.querySelector('.popup__input_type_profile-about');        // ввод 'о себе' в попап профиля.
const inputNameCard = popupAddFoto.querySelector('.popup__input_type_card-name');                // ввод название в попап картинок.
const inputUrlFoto = popupAddFoto.querySelector('.popup__input_type_url');                       // ввод ссылки в попап картинок.
const inputAvatar = popupAvatar.querySelector('.popup__input_type_avatar');

// //----------------------------------НАХОЖДЕНИЕ ПОЛЕЙ ВВОДА ДЛЯ РЕДАКТИРОВАНИЯ---------------------------------------------------
const profileName = content.querySelector('.profile__title');                            // ввод имени в попап профиля.
const profileWho = content.querySelector('.profile__description');                       // ввод 'о себе' в попап профиля.                  

// //----------------------------------НАХОЖДЕНИЕ ПОЛЕЙ ВВОДА ДЛЯ СМЕНЫ АВАТАРА---------------------------------------------------                 
const editAvatar = document.querySelector('.profile__image');
const avatarStyles = editAvatar.style;
const avatarFormElement = document.querySelector('#popupAvatar');
const linkAvatar = avatarFormElement.querySelector('#url__input');
const buttin = document.querySelectorAll('.popup__button');
// //----------------------------------ОТКРЫТИЕ ПОПАПОВ ПРОФИЛЯ И КАРТИНОК------------------------------------------------

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

userInfo(profileName, profileWho, editAvatar); // инициализаиция имени и 'о себе' при загрузки страницы

initialCards().then((card) => {
  initializeList(card);
});

Promise.all([userInfo(), initialCards()]).then(([profile]) => {
  profileName.textContent = profile.name;
  profileWho.textContent = profile.about;
  let linkAvatar = profile.avatar;

  avatarStyles.backgroundImage = `url('${linkAvatar}')`;
});

function initializeList(list) {
  // создаётся список картинок для отображения на странице.
  list.forEach(function (item) {
    const onePost = createNewPost(
      item,
      item.name,
      item.link,
      item.likes,
      item._id
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
  renderLoading(true);
  updateUserInfo(inputNameProfile.value, inputAboutProfile.value); //загрузка обновления профиля на сервер
  profileName.textContent = inputNameProfile.value;
  profileWho.textContent = inputAboutProfile.value;
  closePopup(popupProfile);
}

formEditProfile.addEventListener("submit", saveProfilePopup); // на форму вешаем событие(сохранить данные) при 'оптравить'.

closeButtons.forEach((button) => {
  // автоматическая обработка кнопок закрытия 'крест '
  const popup = button.closest(".popup");
  button.addEventListener("click", () => {
    closePopup(popup);
  });
});

popupAvatar.addEventListener("sudmit", () => closePopup(popupAvatar));
editAvatar.addEventListener("click", () => {
  openPopup(popupAvatar), clearValidation(popupAvatar, validationConfig);
});

function handleEditAvatar(evt) {
  renderLoading(true);
  evt.preventDefault();
  changeAvatar(linkAvatar);
  avatarFormElement.reset();
  closePopup(popupAvatar);
}

avatarFormElement.addEventListener("submit", handleEditAvatar);

function handleAddFormSubmit(evt) {
  renderLoading(true);
  evt.preventDefault(); // сброс стандартной отправки, перезагрузки картинок.
  addCard(inputNameCard.value, inputUrlFoto.value)
    .then((res) => res.json())
    .then((data) => {
      placesList.prepend(
        createNewPost(data, data.name, data.link, data.likes.length, data._id)
      );
    })
    .finally(() => {
      renderLoading(false);
    });
  inputNameCard.value = "";
  inputUrlFoto.value = "";
  closePopup(popupAddFoto); // сбрасывает форму.
};

formAddFoto.addEventListener("submit", handleAddFormSubmit); // вешаем событие(закрыть) на событие 'sudmit' - отправка фото в список

export function renderLoading(isLoading) {
  const buttin = document.querySelectorAll(".popup__button");
  buttin.forEach((data) => {
    if (isLoading) {
      data.textContent = "Сохранить...";
    } else {
      data.textContent = "Сохранить";
    }
  });
}

enableValidation(validationConfig);  
