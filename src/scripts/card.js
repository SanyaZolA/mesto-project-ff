import { openPopup } from "./modal";
// //----------------------------------НАХОЖДЕНИЕ МЕСТА РАСПОЛОЖЕНИЕ ЛИСТА В HTML И ЭЛЕМЕНТ КАРТОЧКИ-------------------------------
export const cardTemplate = document.querySelector('#card-template').content; // переменная получает данные из блока HTML template
export const placesList = document.querySelector('.places__list');            // вешаем элемент списка на переменную.
export const popupZoom = document.querySelector('.popup_type_image');        // присваивание элементов для открытия картинки.

// //----------------------------------НАХОЖДЕНИЕ КАРТИНОК/ТЕКСТА ДЛЯ ЗУМА----------------------------------------------------------------
export const imageZoom = popupZoom.querySelector('.popup__image');          // для зума ищем элемент картинки
export const signatureZoom = popupZoom.querySelector('.popup__caption');    // для зума ищем элемент подписи

export function createNewPost(name, link, likes, _id) {
  const onePost = cardTemplate.cloneNode(true);                         
  const postImage = onePost.querySelector('.card__image');
  const likecounter = onePost.querySelector('.card__like-counter');           
  postImage.src = link;                                            
  postImage.alt = name;
  likecounter.textContent = likes.length;                                   
  onePost.querySelector('.card__title').textContent = name;                       
  onePost.querySelector('.card__like-button').addEventListener('click', (evt) => {evt.target.classList.toggle('card__like-button_is-active')});                   
  onePost.querySelector('.card__delete-button').addEventListener('click', (evt) => {evt.target.closest('.places__item').remove()});   // ищем класс и вышаем кнопку удаления
  postImage.addEventListener('click', openZoomPopup); 
  return onePost;
};

export function openZoomPopup(evt) {                                 // функция для открытия зума
  imageZoom.src = evt.target.src;                             // берет ссылку из определенного поста (кликнутого);
  imageZoom.alt = evt.target.alt;                             // берет ссылку из определенного поста (кликнутого);
  signatureZoom.textContent = evt.target.alt;                 // берет текст для зума из определенного поста (кликнутого);
  openPopup(popupZoom);                                       // и собственно открываем.
};