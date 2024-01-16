import { initialCards } from './cards.js';
import '../pages/index.css';
import { cardTemplate, placesList, popupZoom, openZoomPopup, createNewPost, initializeList, imageZoom, signatureZoom } from './card.js'; 
import { openPopup, closePopup, closePopupEsc, closePopupOverlay } from "./modal.js";
import {toggleButtonState, isValid, enableValidation, setEventListeners} from './validation.js';

const content = document.querySelector('.content');
const popupProfile = document.querySelector('.popup_type_edit');  // присваивание элементов для попап профиля.
const popupAddFoto = document.querySelector('.popup_type_new-card');  // присваивание элементов для попап картинок.
// //----------------------------------НАХОЖДЕНИЕ КНОПОК---------------------------------------------------------------------------
const buttonEditPopupProfile = content.querySelector('.profile__edit-button'); // открытие редактирования профиля.
const buttonOpenPopupAddFoto = content.querySelector('.profile__add-button');  // открытие добавления картинки.
const closeButtons = document.querySelectorAll('.popup__close-button');        // вешаем закрытие крестик на переменную
const button = content.querySelectorAll('button');
const formEditProfile = popupProfile.querySelector('.popup__form');  // форма ввода редактирования профиля.
export const formAddFoto = popupAddFoto.querySelector('.popup__form');

// //----------------------------------НАХОЖДЕНИЕ ИНПУТОВ ДЛЯ ВВОДА ИНФОРМАЦИИ-----------------------------------------------------
const inputNameProfile = popupProfile.querySelector('.popup__input_type_profile-name');          // ввод имени в попап профиля.
const inputAboutProfile = popupProfile.querySelector('.popup__input_type_profile-about');  // ввод 'о себе' в попап профиля.
const inputNameCard = popupAddFoto.querySelector('.popup__input_type_card-name');        // ввод название в попап картинок.
const inputUrlFoto = popupAddFoto.querySelector('.popup__input_type_url');               // ввод ссылки в попап картинок.

// //----------------------------------НАХОЖДЕНИЕ ПОЛЕЙ ВВОДА ДЛЯ РЕДАКТИРОВАНИЯ---------------------------------------------------
const profileName = content.querySelector('.profile__title');        // ввод имени в попап профиля.
const profileWho = content.querySelector('.profile__description');   // ввод 'о себе' в попап профиля.

// //----------------------------------НАХОЖДЕНИЕ ФОРМ ВВОДА-----------------------------------------------------------------------
const inputProfile = formEditProfile.querySelector('.popup__input');
const inputAddFoto = formAddFoto.querySelector('.popup__input');
const editButtonProfile = popupProfile.querySelector('.popup__button');
const editButtonFoto = popupAddFoto.querySelector('.popup__button');
// //----------------------------------ОТКРЫТИЕ ПОПАПОВ ПРОФИЛЯ И КАРТИНОК------------------------------------------------
buttonEditPopupProfile.addEventListener('click', openPopupProfile);                       // вешаем событие(открыть) редактирование профиля на клик мыши.
buttonOpenPopupAddFoto.addEventListener('click', () => openPopup(popupAddFoto));          // вешаем событие(открыть) добавление картинок на клик мыши.


initializeList(initialCards);    // сама инициализация предустановленных картинок. Начинается формироваться список при загрузке страницы      

closeButtons.forEach((button) => {
  formEditProfile.reset();                                                        // автоматическая обработка кнопок закрытия 'крест '
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

function openPopupProfile () { 
  formEditProfile.reset();                                                     // функция открытия заполненого профиля.
  inputNameProfile.value = profileName.textContent;                                       // что в html добавляется в имя
  inputAboutProfile.value = profileWho.textContent;                                       // что в html добавляется в профессия
  openPopup(popupProfile);
}


formAddFoto.addEventListener('submit', handleAddFormSubmit);                     // вешаем событие(закрыть) на событие 'sudmit' - отправка фото в список

function handleAddFormSubmit(evt) {                                              // заполненная форма добавления фото, встаёт в список.
  evt.preventDefault();                                                          // сброс стандартной отправки, перезагрузки картинок.
  const newElement = createNewPost(inputNameCard.value, inputUrlFoto.value);     // берём то что заполнили в форме и добавляем в переменную.
  placesList.prepend(newElement);                                                // новый пост идёт в начало листа.
  closePopup(popupAddFoto)                                                       // делает функцию для закрытия.
  evt.target.reset()                                                           // сбрасывает форму.
};

// //----------------------------------СОХРАНЕНИЕ ИНФОРМАЦИИ ПРИ РЕДАКТИРОВАНИИ ПРОФИЛЯ--------------------------------------------
function saveProfilePopup (evt) {
  evt.preventDefault();                                          // отмена стандартной формы отправки.
  profileName.textContent = inputNameProfile.value;              // сохранение введенной информации ФИО и замена в профиле.
  profileWho.textContent = inputAboutProfile.value;              // сохранение введенной информации О СЕБЕ и замена в профиле.
  closePopup(popupProfile);
};
formEditProfile.addEventListener('submit', saveProfilePopup);    // на форму вешаем событие(сохранить данные) при 'оптравить'.



enableValidation();
