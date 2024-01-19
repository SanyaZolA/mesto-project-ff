import '../pages/index.css';
import { placesList, createNewPost } from './card.js'; 
import { openPopup, closePopup } from "./modal.js";
import { enableValidation, clearValidation } from './validation.js';
import { userInfo, updateUserInfo, initialCards, addCard } from './api.js';

const content = document.querySelector('.content');
const popupProfile = document.querySelector('.popup_type_edit');  // присваивание элементов для попап профиля.
const popupAddFoto = document.querySelector('.popup_type_new-card');  // присваивание элементов для попап картинок.
// //----------------------------------НАХОЖДЕНИЕ КНОПОК---------------------------------------------------------------------------
const buttonEditPopupProfile = content.querySelector('.profile__edit-button'); // открытие редактирования профиля.
const buttonOpenPopupAddFoto = content.querySelector('.profile__add-button');  // открытие добавления картинки.
const closeButtons = document.querySelectorAll('.popup__close-button');        // вешаем закрытие крестик на переменную
const formEditProfile = popupProfile.querySelector('.popup__form');  // форма ввода редактирования профиля.
const formAddFoto = popupAddFoto.querySelector('.popup__form');

// //----------------------------------НАХОЖДЕНИЕ ИНПУТОВ ДЛЯ ВВОДА ИНФОРМАЦИИ-----------------------------------------------------
const inputNameProfile = popupProfile.querySelector('.popup__input_type_profile-name');          // ввод имени в попап профиля.
const inputAboutProfile = popupProfile.querySelector('.popup__input_type_profile-about');  // ввод 'о себе' в попап профиля.
const inputNameCard = popupAddFoto.querySelector('.popup__input_type_card-name');        // ввод название в попап картинок.
const inputUrlFoto = popupAddFoto.querySelector('.popup__input_type_url');               // ввод ссылки в попап картинок.

// //----------------------------------НАХОЖДЕНИЕ ПОЛЕЙ ВВОДА ДЛЯ РЕДАКТИРОВАНИЯ---------------------------------------------------
const profileName = content.querySelector('.profile__title');        // ввод имени в попап профиля.
const profileWho = content.querySelector('.profile__description');   // ввод 'о себе' в попап профиля.
// //----------------------------------ОТКРЫТИЕ ПОПАПОВ ПРОФИЛЯ И КАРТИНОК------------------------------------------------
buttonEditPopupProfile.addEventListener('click', () => {
  openPopupProfile();
});

buttonOpenPopupAddFoto.addEventListener('click', () => {
  openPopup(popupAddFoto);
  clearValidation(popupAddFoto, validationConfig);
});
  
userInfo(profileName, profileWho);    // инициализаиция имени и 'о себе' при загрузки страницы                  // инициализация валидации

const validationConfig = ({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}); 


initialCards().then((card) => {       // преобразование массива карт с сервера
  initializeList(card)});
  

function initializeList(list) {                                  // создаётся список картинок для отображения на странице.
  list.forEach(function (item) {
    const onePost = createNewPost(item.name, item.link, item.likes, item._id);    
    placesList.append(onePost);                                     // каждая картинки ставится в начало листа template.
  });
};

closeButtons.forEach((button) => {                                                      // автоматическая обработка кнопок закрытия 'крест '
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

function openPopupProfile () {                                                           // функция открытия заполненого профиля.
  inputNameProfile.value = profileName.textContent;                                       // что в html добавляется в имя
  inputAboutProfile.value = profileWho.textContent;  
  openPopup(popupProfile);
  clearValidation(popupProfile, validationConfig);
}

function handleAddFormSubmit(evt) {                                              // заполненная форма добавления фото, встаёт в список.
  evt.preventDefault();
  debugger;                                                   // сброс стандартной отправки, перезагрузки картинок.
  addCard(inputNameCard.value, inputUrlFoto.value);                         
  const newElement = createNewPost(inputNameCard.value, inputUrlFoto.value, _id);  
  placesList.prepend(newElement);
  inputNameCard.value = '';
  inputUrlFoto.value = '';                                       
  closePopup(popupAddFoto)                                                                                                               // сбрасывает форму.
};

formAddFoto.addEventListener('submit', handleAddFormSubmit);                     // вешаем событие(закрыть) на событие 'sudmit' - отправка фото в список

function saveProfilePopup (evt) {
  evt.preventDefault();
  updateUserInfo(inputNameProfile.value, inputAboutProfile.value);              //загрузка обновления профиля на сервер
  profileName.textContent = inputNameProfile.value;
  profileWho.textContent = inputAboutProfile.value;
  closePopup(popupProfile);
};

formEditProfile.addEventListener('submit', saveProfilePopup);    // на форму вешаем событие(сохранить данные) при 'оптравить'.

enableValidation(validationConfig);